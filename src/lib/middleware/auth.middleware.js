export default class AuthMiddleware {
    constructor(props = {}) {
        this.req = props?.req ?? undefined
        this.res = props?.res ?? undefined
        this.method = props?.method ?? 'GET'
    }
    async register(){
        try{

            if(this.method === 'POST') return await this._register()
            return [ null, null]
        }catch(err){
            return [ err, null ]
        }
    }

    /**
     * @private
     * @returns {Promise<void>}
     */
    async _register(){
        try{
            return [null,this.req]
        }catch(err){
            return [err, null]

        }
    }
}