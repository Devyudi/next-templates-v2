import withJoi from "next-joi";
import Joi from 'joi';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/

export const JoiEmail = Joi.string().email();

export const JoiObjId = Joi.string().regex(/^[0-9a-fA-F]{24}$/, "Id");

export const JoiBase = Joi.object({
    updatedBy: JoiObjId.optional(),
    createdBy: JoiObjId.optional(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()

})


export const JoiPassword = Joi.string()
    .pattern(passwordPattern)
    .message("Password is not valid. Use Upper case, numeric letter, and alphabets a-z")

export const JoiMatch = (ref)=> Joi.string().equal(Joi.ref(ref))
    .messages({ 'any.only': '{{#label}} does not match' })
export const JoiNewPassword = Joi.string()
    .pattern(passwordPattern)
    .label("password")
    .min(6)
    .max(15)
    .required()


export const JoiPhone = Joi.string().regex(/^\d+$/).message("Invalid phone number").min(8).max(15);

export default withJoi({
    onValidationError: (_, res,error) => {
        return res.status(400).send(error);
    },
});