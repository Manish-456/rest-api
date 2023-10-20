import {type Request, type Response} from 'express';
import { deleteUserById, getUsers, updateUserById } from '../db/users';

export const getAllUsers = async(req : Request, res : Response) => {
    try {
        const users = await getUsers();
         return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}
export const deleteUser = async(req : Request, res : Response) => {
    try {
        const {id} = req.params;
        await deleteUserById(id);
         return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}

export const updateUser = async(req : Request, res : Response) => {
    try {
        const {id} = req.params;
        const {username} = req.body;

        if(!id) return res.sendStatus(400);

        const updatedUser = await updateUserById(id, {username});

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
}