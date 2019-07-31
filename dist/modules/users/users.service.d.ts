import { Connection } from 'mongoose';
import { IUser } from './interfaces/user.interface';
import { Request } from 'express';
export declare class UserService {
    private readonly connection;
    private readonly request;
    private params;
    constructor(connection: Connection, request: Request);
    me(userModel: IUser): Promise<IUser>;
    getUsers(query?: any): Promise<IUser[]>;
    updateProfileImage(user: any, file: any): Promise<IUser>;
    getUserById(userId: any): Promise<IUser>;
    deleteUser(user: any): Promise<any>;
    updateUser(user: any, body: any): Promise<any>;
}
