import UserRepository from '../db/repositories/user-repository';

export default class UserService {

    private userRepository;

    constructor() {
        this.userRepository = UserRepository
    }

    async updateUser(alias: string, payloadUser: any) {

        const user = {
            firstName : payloadUser.firstName,
            updatedAt: new Date(new Date().toLocaleString('es-AR', {timeZone: 'America/Argentina/Buenos_Aires'}))
        }
        return await this.userRepository.update(alias, user)
    }

    async readUser(alias: string) {
        return await this.userRepository.getByAlias(alias);
    }

    async disabledUser(alias: string) {
        return await this.userRepository.disabled(alias);
    }

    private async seguridadDeClave(password: string) {
        return password.length > 8;
    }

}
