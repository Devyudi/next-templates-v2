import {join, resolve} from 'path'
import Email from "email-templates";
import {createTransport} from "nodemailer";
import {EmailConstants} from "./email.constant";

export class EmailService {

    static getInstanceMailTrap() {

        this.transport = createTransport({
            host: process.env.SMTP_HOST ?? "smtp.mailtrap.io",
            port: process.env.SMTP_PORT ?? 2525,
            auth: {
                user: process.env.SMTP_USERNAME ??  "47e2e07d376452",
                pass: process.env.SMTP_PASSWORD ?? "bf56572b35f567"
            }
        });

        this.email = new Email({
            message: {from:process.env.SMTP_EMAIL_FROM},
            send: true,
            preview: process.env.NODE_ENV !== "production", // TODO change preview = false when deploy to production server
            transport: this.transport,
            juice: true,
            juiceResources: {
                preserveImportant: true,
                webResources: {
                    relativeTo: EmailConstants.STYLE_PATH,
                },
            },
            views: {
                options: {
                    extension: "pug"
                }
            }
        })

        return {
            email: this.email,
            transporter: this.transporter
        }
    }

    static getInstance() {
        if (!this.transporter || !this.email) {
            const option = {
                // pool:true,
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: process.env.SMTP_SECURE,
                auth: {
                    user: process.env.SMTP_USERNAME,
                    pass: process.env.SMTP_PASSWORD
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false,
                },
            }

            this.transporter = createTransport(option)
            this.email = new Email({
                message: {
                    from: {
                        name: "core@2023",
                        address: process.env.SMTP_EMAIL_FROM
                    }
                },
                send: true,
                preview: process.env.NODE_ENV !== "production", // TODO change preview = false when deploy to production server
                transport: this.transporter,
                juice: true,
                juiceResources: {
                    preserveImportant: true,
                    webResources: {
                        relativeTo: EmailConstants.STYLE_PATH,
                    },
                },
                views: {
                    options: {
                        extension: "pug"
                    }
                }
            })
        }

        return {email: this.email, transporter: this.transporter}
    }

    static async SendEmail(templateName, options, data) {
        const {email} = EmailService.getInstanceMailTrap()
        await email
            .send({
                template: join(EmailConstants.EMAIL_TEMPLATE_PATH, templateName),
                message: options,
                locals: {...data}
            })
            .then(() => {
                console.log("Email has been sent")
            })
            .catch((err) => {
                console.error(err)
            })
    }

    static async SendTextEmail(options) {
        const {email} = EmailService.getInstance();

        await email
            .send({message: options})
            .then(() => console.log("Email has been sent"))
            .catch((err) => console.error(err));

        return true;
    }
}
