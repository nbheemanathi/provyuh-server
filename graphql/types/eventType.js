import { gql } from "apollo-server";
export const event = gql`
input EventInput {
    title: String
    allDay: Boolean
    start:String
    end: String
    type: String
    description: String
    user: String
  }

  type Event {
    id: ID!
  }
`