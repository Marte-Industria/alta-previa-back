import * as jwt from 'jsonwebtoken'
import * as bcrypt from "bcryptjs";
import { SECRET_KEY_REFRESH_TOKEN, SECRET_KEY_TOKEN } from '../constants'
import userRepository from '../db/repositories/user-repository'
import { DefaultAPError } from '../exceptions'
const SALT = bcrypt.genSaltSync(10)

class SecurityService {

  async registerUser(payload: any) {
    payload.password = await bcrypt.hashSync(payload.password, SALT)
    payload.isEnabled = true
    payload.createdAt = new Date(new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }))
    return await userRepository.create(payload)
  }

  async login(email: string, password: string) {

    const user = await userRepository.getByEmail(email);

    await this._validUserAndPassword(user, password)

    const token = await this._tokenCreation(SECRET_KEY_TOKEN, '15min', user)
    const refreshToken = await this._tokenCreation(SECRET_KEY_REFRESH_TOKEN, '30d', user)
    return { token, refreshToken }
  }

  async refreshToken(alias: string) {
    const user = await userRepository.getByEmail(alias);
    return await this._tokenCreation(SECRET_KEY_TOKEN, '15min', user)
  }

  /**
   * @todo Implementar blacklist o alternativa.
   */
  async logout() {
    return true;
  }

  private async _tokenCreation(secretKey: string, expiresIn: string, user: any) {
    return await jwt.sign(
      {
        iat : Date.now()
      },
      secretKey,
      { 
        audience : 'mobile',
        issuer : 'ap',
        subject : user.alias,
        expiresIn
       }
    )
  }

  private async _validUserAndPassword(user: any, password : string) : Promise<void> {
    if (!user) {
      throw new DefaultAPError('Email or password invalid')  
    }

    if (!user.password) {
      throw new DefaultAPError('Email or password invalid')  
    }

    const isValidPassword = await bcrypt.compare(password,user.password);

    if (!isValidPassword) {
      throw new DefaultAPError('Email or password invalid')  
    }
  }
}

export { SecurityService }
