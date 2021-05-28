import UserRepository from '../db/repositories/user-repository';
import { DocumentNotFoundError } from '../exceptions';

class UserService {

    private userRepository;

    constructor() {
        this.userRepository = UserRepository
    }

    async updateUser(alias: string, payloadUser: any) {

        const user = {
            firstName: payloadUser.firstName,
            lastName: payloadUser.lastName,
            email: payloadUser.email,
            updatedAt: new Date(new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }))
        }
        return await this.userRepository.update(alias, user)
    }

    async readUser(alias: string) {
        return await this.userRepository.getOneByPropertys({alias});
    }

    async disabled(alias: string) : Promise<boolean> {
        const result = await this.userRepository.disabled(alias)
        if (!result) {
            throw new DocumentNotFoundError(alias)
        }
        return true;
    }
}

export { UserService }