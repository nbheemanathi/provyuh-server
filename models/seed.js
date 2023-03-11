import Role from "./role.js";
import User from "./user.js";
import bcrypt from "bcryptjs";

const rolesList = [
  {
    name: "super_admin",
  },
  {
    name: "admin",
  },
];

const defaultSuperAdmin = {
  email: "superadmin@system.com",
  username: "superadmin",
  password: "password",
  role: "super_admin",
  firstName: "super",
  lastName: "admin",
  phone: "4129564117",
};
const seedDb = async () => {

    await User.deleteMany()

  const roles = await Role.find();
  if (roles.length === 0) {
    try {
      await Role.insertMany(rolesList);
    } catch (e) {
      console.log("Error while seeding roles: ", e);
    }
  }

  const user = await User.find();
  if (user.length === 0) {
    try {
      const password = await bcrypt.hash(defaultSuperAdmin.password, 12);
      const role = await Role.findOne({ name: defaultSuperAdmin.role });
      const superAdminUser = new User({
        email: defaultSuperAdmin.email,
        username: defaultSuperAdmin.username,
        firstName: defaultSuperAdmin.firstName,
        lastName: defaultSuperAdmin.lastName,
        phone: defaultSuperAdmin.phone,
        password,
        role,
        createdAt: new Date().toISOString(),
      });
      await superAdminUser.save();
    } catch (error) {
      console.log("Error while seeding admin user: ", error);
    }
  }  
};
export default seedDb;
