import INeverRepository from '../db/repositories/iNever-repository';
import UserRepository from '../db/repositories/user-repository';
import { DocumentNotFoundError } from '../exceptions';

class INeverService {

    private iNeverRepository;
    private userRepository;

    constructor() {
        this.iNeverRepository = INeverRepository
        this.userRepository = UserRepository
    }

    async createMany(alias: string, arrINever: Array<any>) {

        const user = await this.userRepository.getOneByPropertys({alias});
        const socialProfileFormatted = (user.socialRed.isVisible) && `${user.socialRed.url}/${user.socialRed.username}`;
        const buff = [];

        for await (const iNever of arrINever) {
            buff.push({
                level: iNever.level,
                body: iNever.body,
                isSpicy: iNever.is_spicy,
                isSynonymous: false,
                isApproved: false,
                isActive: false,
                user: {
                    alias: user.alias,
                    socialProfile: socialProfileFormatted
                },
                createdAt: new Date(
                    new Date().toLocaleString("es-AR", {
                        timeZone: "America/Argentina/Buenos_Aires"
                    })
                )
            })
        }

        return await this.iNeverRepository.createMany(buff);
    }

    async readManyByUser(alias: string) {
        return await this.iNeverRepository.getByUserAlias(alias)
    }

    async readMany(level: string, isSpicy: boolean) {
        return await this.iNeverRepository.getManyByPropertys({level, isSpicy, isActive: true, isApproved: true })
    }

    async disabled(alias: string, iNeverID: string) : Promise<boolean> {
        const result = await this.iNeverRepository.disabled(iNeverID, alias)
        if (!result) {
            throw new DocumentNotFoundError(iNeverID)
        }
        return true;
    }
}

export { INeverService }
