/**
 * 
 */

import { Get, Query, Route, Tags } from 'tsoa';
import { IUserController } from "./interfaces";
import { LogError, LogSuccess } from '../utils/logger';
import { getUsers } from "../domain/orm/user.orm";
import { IUser } from "../domain/interfaces/IUser.interface";

@Route('/api/users')
@Tags('userController')
export class userController implements IUserController {
    /**
     * 
     * @param id 
     * @returns 
     */
    @Get('/')
    public async getUsers(@Query()id?:string): Promise<IUser[]> {

        if(id){
            LogSuccess(`[/api/users] Peticion de los datos del usuario id ${id}`);
            return await getUsers(id);
        } else {
            LogSuccess(`[/api/users] Peticion de los datos de todos los usuarios`);
            return await getUsers();
        }
        
    }
    
}