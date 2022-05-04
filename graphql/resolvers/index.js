import postsResolvers from './posts.js';
import usersResolvers from './users.js';
import commentsResolvers from './comments.js';
import recipesResolvers from './recipes.js';
import eventResolvers from './event.js'
import { DateTimeResolver } from 'graphql-scalars';

export default{
    DateTime: DateTimeResolver,

    Post:{
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postsResolvers.Query,
        ...usersResolvers.Query,
        ...recipesResolvers.Query,
        ...eventResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...recipesResolvers.Mutation,
        ...eventResolvers.Mutation
    }
}
