import { authentication, random } from '../helper';
import { createUser, getUserByEmail } from '../db/users';
import  {type Request, type Response} from 'express';

export const login = async(req : Request, res : Response) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) return res.sendStatus(400);

        const user = await getUserByEmail(email).select("+authentication.password +authentication.salt");

        console.log(user);

        if(!user) return res.sendStatus(400);

        const expectedHash = authentication(user.authentication.salt, password);
         
        if(expectedHash !== user.authentication.password){
           return res.sendStatus(403);
        }

        const salt = random();

         user.authentication.sessionToken = authentication(salt, user._id.toString());
         
         await user.save();

         res.cookie('manish-cookie', user.authentication.sessionToken, {domain : 'localhost', path : '/'});

         return res.status(200).json(user).end();

    } catch (error) { 
        console.error(error);
        return res.sendStatus(500);
    }
}

//? ********************************************************************************************************************

export const register = async(req : Request, res : Response) => {
    try{
        const {username, email, password} = req.body;
        
        if(!username || !email || !password){
            return res.sendStatus(400);
        }
        
        const existingUser = await getUserByEmail(email);
        
        if(existingUser){
            return res.sendStatus(400);
        }
        const salt = random();
        
        const newUser = await createUser({
        username,
        email,
        authentication : {
            password : authentication(salt, password),
            salt
        }
    });

    return res.status(201).json(newUser);
 }catch(error){
    console.error(error);
    return res.sendStatus(500);
 }
}