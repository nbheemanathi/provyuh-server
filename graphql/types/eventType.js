import gql from 'graphql-tag';
export const event = gql`
input EventInput {
    title: String
    allDay: Boolean
    start:String
    end: String
    type: String
    notes: String
    user: String
    links:[LinkInfo]
  }
  input LinkInfo {
    linkId: Int
    title: String
    imageUrl: String
  }
  type Event {
    id: ID!
    title:String!
    allDay:Boolean!
    start:DateTime!
    end:DateTime!
    notes:String
    links:[Link]
    user:String!
  }
  type Link {
    linkId: Int!
    title: String
    imageUrl: String
  }
`