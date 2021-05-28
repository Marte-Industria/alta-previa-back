import SynonymRepository from '../db/repositories/synonym-repository';
import UserRepository from '../db/repositories/user-repository';

class SynonymService {

  private synonymRepository;
  private userRepository;

  constructor() {
    this.synonymRepository = SynonymRepository
    this.userRepository = UserRepository
  }

  async createMany(alias: string, arrSynonym: Array<any>) {

    const user = await this.userRepository.getOneByPropertys({ alias });
    const buff = [];

    for await (const synonym of arrSynonym) {
      buff.push({
        type: synonym.type,
        key: synonym.key,
        value: synonym.value,
        country: synonym.country,
        isApproved: false,
        isActive: false,
        user: {
          alias: user.alias
        },
        createdAt: new Date(
          new Date().toLocaleString("es-AR", {
            timeZone: "America/Argentina/Buenos_Aires"
          })
        )
      })
    }

    return await this.synonymRepository.createMany(buff);
  }

  async getManyByUser(alias: string) {
    return await this.synonymRepository.getByUserAlias(alias)
  }

  async disabled(alias: string, synonymID: string) {
    return await this.synonymRepository.disabled(alias, synonymID)
  }

  static async replaceVariable(country: string, games: Array<any>) {
    const allSynonyms = await SynonymRepository.getManyByPropertys({ country, isApproved : true, isActive : true});
    const allKeys = allSynonyms.map((oneSynonym) => oneSynonym.key);

    return games.map((oneGame: any) => {
      if (!oneGame.isSynonymous) {
        return oneGame
      }
      for (const oneKey of allKeys) {
        if (oneGame.body.indexOf(oneKey)) {
          const synonym = allSynonyms.find(oneSynonym => oneSynonym.key === oneKey)
          const regexp =new RegExp(oneKey, 'g')
          oneGame.body = oneGame.body.replace(regexp, synonym.value);
        }
      }
      if (oneGame.body.includes('{{')) {
        console.warn('ERR_IN_REMPLACE_SYNOMYN', { oneGame, country })
        return null;
      }
      return oneGame;
    });
  }
}

export { SynonymService }
