import { MyError } from '../interfaces'

class DocumentNotFoundError extends MyError {
    constructor(id: string) {
        super(`Document '${id}' not found`, 'DocumentError')
    }
}

export {
    DocumentNotFoundError
}