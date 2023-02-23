import nc from "next-connect";
import { ErrorHandler }  from '@moonlay/handlers'
import {AuthValidator} from "@moonlay/src/lib/validator";
import Helpers from "@moonlay/helpers";
import {UserController} from "@moonlay/controllers";

export const config = {
    api: {
        bodyParser: true,
    },
};


const handler = nc(ErrorHandler);

handler
    .post(
        AuthValidator.create,
        async (req, res)=> {
            let userInputDTO = req.body

            /**
             * @description check email
             */
            const [_, user] = await new UserController({
                key: 'email',
                value: req.body.email
            }).verifyUniqueEmail()
            if(_) return res.status(400).end()
            if(user) return res.status(400).json({
                error:'Error: Has been registered'
            })

            /**
             * @description generate password with bcryptJS
             */
            const { hashPassword, salt } = await Helpers.encryptPassword(userInputDTO.password)
            Reflect.set(userInputDTO,'password',hashPassword)
            Reflect.set(userInputDTO,'salt',salt)

            /**
             * @description save new user to database
             */
            const [errSave, dataSave] = await new UserController({
                fields:userInputDTO
            }).create()
            if(errSave) return res.status(400).json({
                message: errSave?.message ?? 'Error: some error'
            })

            /**
             * @module Activation-email
             */



            await Helpers.DeleteObjKey(dataSave,['password','salt'])

            return res.status(200).json({
                message: 'OK!',
                data: dataSave
            })
        })


export default handler