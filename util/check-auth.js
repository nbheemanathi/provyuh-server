
import jwt from "jsonwebtoken";
import config from '../config.js';
import {AuthenticationError} from "apollo-server";
export default (context) => {
    const authHeader = context.req.headers.authorization;
    if(authHeader){
        //Bearer
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try {
                const user = jwt.verify(token, config.SECRET_KEY);
                return user;
            } catch (error) {
                throw new AuthenticationError('Invalid/Expired Token')
            }
        }
        throw new Error('Authentication token must be \' Bearer [token]' )
    }
    throw new Error('Authorization Header must be provided' )

}