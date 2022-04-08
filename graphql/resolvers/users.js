
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config.js";
import { UserInputError } from "apollo-server";
import { validateRegisterInput, validateLoginInput } from "../../util/validators.js";
import UserRecipes from "../../models/UserRecipes.js";
import recipes from "./recipes.js";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    config.SECRET_KEY,
    { expiresIn: "1h" }
  );
}

export default {
  Mutation: {
    async login(_, { username, password }) {
      const { valid, errors } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      if (!user) {
        throw new UserInputError("User not found", {
          errors: {
            general: "User not found",
          },
        });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        // error.general = "Wrong credentials";
        throw new UserInputError("Wrong Credentials", {
          errors: {
            general: "Wrong credentials",
          },
        });
      }
      const token = generateToken(user);
      const userRecipes = await UserRecipes.findOne({user}, 'recipes -_id');
      const userSavedRecipes = userRecipes?.recipes;
      return {
        ...user._doc,
        id: user._id,
        token,
        userSavedRecipes
      };
    },

    async register(_, { registerInput: { username, email, password, confirmPassword } }) {
      const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }
      password = await bcrypt.hash(password, 12);

      const user = await User.findOne({ username: username });
      if (user) {
        throw new UserInputError("Username already taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },
  },
  Query: {
    async getUser(_, { username }) {
      try {
        const user = await User.findOne({ username }).lean();
        const userSavedRecipes = await UserRecipes.findOne({user})
        user.id = String(user._id);
        // if(userSavedRecipes){
        //   Object.assign(user, {savedRecipes: userSavedRecipes.recipes});
        // }
        if (user) {
          return user;
        } else {
          throw new Error("user not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
