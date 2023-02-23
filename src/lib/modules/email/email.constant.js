import {join , resolve } from 'path';

const assetsPath = resolve(__dirname,"assets");
const EMAIL_TEMPLATE_PATH = join(assetsPath,"templates");
const STYLE_PATH = join(assetsPath,"styles");

/**
 * Type definition of Email Constants
 *
 */

const EmailConstants = {
    STYLE_PATH,
    EMAIL_TEMPLATE_PATH
}

Object.freeze(EmailConstants)

const EmailTemplate = {
    resetPassword: "reset-password",
    verifyEmail: "verify-email",
    authentication:{
        login:"login-email",
        changePassword: "change-password-email"
    }
}

export { EmailTemplate , EmailConstants}
