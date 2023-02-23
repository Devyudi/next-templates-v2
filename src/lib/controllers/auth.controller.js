import Controller from "./default.controller";
import jwt from 'jsonwebtoken'
import {UserController} from "@moonlay/controllers";
import Helpers from "@moonlay/helpers";
import {generateToken} from "@moonlay/src/lib/utils/jwt-token";

export default class AuthController extends Controller{
    constructor(props){
        super(props)
    }

    async _signIn(){
        try{
            const [_, user] = await new UserController({
                key: 'email',
                value: this.fields?.email
            }).verifyUniqueEmail()
            if(_) return [ _, null]
            if(!user) return [ new Error(`Error: User by ${this.fields?.email} not found`),null]

            /**
             * @description compare password
             */
            const validate = await Helpers.isValidPassword(this.fields?.password,user?.password)
            if(!validate) return [ new Error('Error: Password not match'), null]

            await Helpers.DeleteObjKey(user,['password','salt','deletedAt','updatedAt'])
            const token = await generateToken(user);
            Reflect.set(user, "token", token);

            return [ null , user ]
        }catch(err){
            return [ err, null ]
        }
    }
}