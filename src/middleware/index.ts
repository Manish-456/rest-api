import {type Request, type Response, type NextFunction} from 'express';
import {get, merge} from 'lodash';
import { getUserBySessionToken } from '../db/users';

export const isOwner = async(req : Request, res : Response, next : NextFunction) => {
    try{
    const {id} = req.params;
      
    const userId = get(req, "identity._id") as string;
    console.log(userId)
      
    if(!id || !userId) return res.sendStatus(403);

    if(id !== userId.toString()){
        return res.sendStatus(403);
    }

    next();
    

    }catch(error){
        console.error(error);
        return res.sendStatus(500);
    }
}

export const isAuthenticated = async(req: Request, res: Response, next : NextFunction) => {
    try {
        const sessionToken = req.cookies["manish-cookie"];

        if(!sessionToken) return res.sendStatus(403);
         console.log(sessionToken);

        const existingUser = await getUserBySessionToken(sessionToken);

        if(!existingUser) return res.sendStatus(403)
       
        merge(req, {identity : existingUser});
        next();

    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}