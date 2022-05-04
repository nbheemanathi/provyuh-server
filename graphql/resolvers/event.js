import Event from "../../models/Event.js";
import checkAuth from "../../util/check-auth.js";
import Post from "../../models/Post.js";


export default {
  Query: {    
    async getUserEvents(_,{},context) {
      const user = checkAuth(context);      
      try {
        const events = await Event.find({
          user: user.id
        });
        return events;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async addEvent(_, { eventInput: { title, allDay, start, end,type,notes, links } }, context) {
        const user = checkAuth(context);
        const newEvent = new Event({
            title,
            allDay,
            start: new Date(start),
            end: new Date(end),
            type,
            notes,
            user: user.id,
            links
          });
          const event = await newEvent.save();

        return event
    }
  },
};
