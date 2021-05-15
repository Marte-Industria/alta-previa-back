import {MyError} from '../interfaces'

class TokenError extends MyError {
    public code : number
    public message: string
    constructor(code : number,message: string){
        super('','')
        this.code = code
        this.message = message
    }
}

export {
    TokenError
}