/*******************************************************************************
 * @author Mochamad Yudi Sobari
 * @github https://github.com/mochamadyudi
 * @email yuyuid.id12@gmail.com
 * @contact +6285718851007
 ******************************************************************************/
import bcrypt from 'bcryptjs'

export default class Helpers{
    static getNameInitial(text){
        let initials = text.match(/\b\w/g) || [];
        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
    }

    static numberFormat(number, replaceTo = ','){
        return parseFloat(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g,replaceTo)
    }

    static getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }


    static getToken(type = 'get') {
        try {
            if(localStorage){
                switch (type) {
                    case "get":
                        if (localStorage.getItem("token")) {
                            return localStorage.getItem("token")
                        }
                        return null
                    case "remove":
                        if (localStorage.getItem("token")) {
                            localStorage.removeItem('token')
                            return true
                        }
                        return true
                    default:
                        if (localStorage.getItem("token")) {
                            return localStorage.getItem("token")
                        }
                        return null
                }
            }
            return null
        } catch (err) {
            return null
        }

    }

    static Pagination(query){
        let initialData = {
            pagination: {
                page:0,
                limit:10,
            },
            prisma: {
                skip:0,
                take:10
            }
        }
        try{

            if('page' in query && query?.page !== null && query?.page !== ""){
                Reflect.set(initialData.pagination,'page',Number(query.page))
            }
            if('limit' in query && query?.limit !== null && query?.limit !== ""){
                Reflect.set(initialData.pagination,'limit',Number(query.limit))
                Reflect.set(initialData.prisma,'take',Number(query.limit))
            }

            let { page, limit  } = initialData.pagination
            Reflect.set(initialData.prisma,'skip', limit * ( page > 1 ? page - 1:  0))

            return {...initialData}
        }catch(err){
            return {...initialData}
        }
    }


    static async encryptPassword(password){
        let salt = bcrypt.genSaltSync(10);
        let hashPassword = bcrypt.hashSync(password,salt);
        return {salt, hashPassword}
    }

    static async DeleteObjKey(data,key = []){
        try {
            if(typeof(data) !== "undefined" && typeof(data) === "object"){
                for(let i = 0; i < key.length;i++){
                    if(typeof(key[i]) !== "undefined"){
                        if('deleteProperty' in Reflect){
                            Reflect.deleteProperty(data,key[i])
                        }
                    }
                }
                return data
            }
            return null
        }catch(err){
            return null
        }
    }

    static async isValidPassword(plainPas,hasPass){
        return bcrypt.compareSync(plainPas, hasPass)
    }
}