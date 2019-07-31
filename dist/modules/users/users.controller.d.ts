import { UserService } from './users.service';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UserService);
    me(req: any): Promise<import("./interfaces/user.interface").IUser>;
    uploadFile(file: any, req: any): Promise<import("./interfaces/user.interface").IUser>;
    getUserById(req: any): Promise<any>;
    updateUserById(req: any): Promise<any>;
    getUsers(req: any): Promise<import("./interfaces/user.interface").IUser[]>;
    deleteUser(req: any): Promise<any>;
}
