import { MyError } from '../interfaces'

class DefaultAPError extends MyError {
    constructor(msg: string) {
        super(msg)
    }
}

export {
    DefaultAPError
}