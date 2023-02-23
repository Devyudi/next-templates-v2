import { first } from 'lodash'
import {PrismaClient} from "@prisma/client";
import Controller from "./default.controller";

export default class UserController extends Controller {
    constructor(props = {}){
        super(props);
    }


    /**
     *
     * @returns {Promise<*[]>}
     */
    async verifyUniqueEmail(){
        try{
            const user = await this.prisma.User.findFirst({
                where: {
                    [this.key ?? 'id']: this.value
                }
            })
            return [ null , user ]
        }catch(err){
            return [ err, null ]
        }
    }

    /**
     *
     * @returns {Promise<*>}
     */
    async findOne(){
        return await this.prisma.User.findFirst({
            where: {
                ...this.where
            }
        })
    }

    /**
     * @returns {Promise<*[]|Error[]>}
     */
    async create(){
        try{
            if(!this.fields) return [ new Error('Request body is required'),null]
            let username
            if(typeof(this.fields?.username) ==='undefined'){
                username = `${first(this.fields.email.split("@"))}`
                this.where = {username}
                let increment = 1

                let exists = await this.findOne();

                while(exists){
                    increment++;
                    username = `${first(this.fields.email.split("@"))}_${increment}`;
                    this.where = {username}
                    exists = await this.findOne();
                }
            }else{
                username = this.fields.username ?? null
            }

            Reflect.set(this.fields,'username',username)

            const data = await this.prisma.User.create({
                data: this.fields
            })
            return [ null, data ]
        }catch(err){
            return [ err, null ]
        }
    }

    /**
     * @returns {Promise<(Error|*)[]|*[]|Error[]>}
     */
    async _checkDeleted(){
        try {
            const data = await this.prisma.User.findFirst({
                "where": {
                    [this.key]: this.value
                }
            })

            if (!data) return [new Error("User Not found"), null]
            if (data?.deletedAt !== null) {
                return [new Error(`failed : the account with this ${this.key} ${this.value} has been suspended`), data]
            }
            return [null, data ]
        } catch (err) {
            return [err, null]
        }
    }
}