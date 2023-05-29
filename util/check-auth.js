
import jwt from "jsonwebtoken";
// import {AuthenticationError} from "apollo-server";
import { GraphQLError } from 'graphql';
export default (context) => {
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        //Bearer
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try {
                const user = jwt.verify(token, process.env.SECRET_KEY);
                return user;
            } catch (error) {
                throw new GraphQLError('Invalid/Expired Token')
            }
        }
        throw new Error('Authentication token must be \' Bearer [token]' )
    }
    throw new Error('Authorization Header must be provided' )

}