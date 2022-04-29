import Event from "../../models/Event.js";
import checkAuth from "../../util/check-auth.js";


export default {
  Mutation: {
    async addEvent(_, { eventInput: { title, allDay, start, end,type,description } }, context) {
        console.log(start);
        const user = checkAuth(context);
        const newEvent = new Event({
            title,
            allDay,
            start: new Date(start),
            end: new Date(end),
            type,
            description,
            user: user.id,
          });
          const event = await newEvent.save();

        return event
    }
  },
  Query: {},
};
