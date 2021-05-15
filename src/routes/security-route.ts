import express from 'express'
import { SecurityController } from '../controllers'
import { credentialVerification,refreshTokenVerification } from '../middlewares'

const securityRoute = express.Router()
const securityController = new SecurityController()

/**
 * @openapi
 *  /register:
 *   post:
 *    tags:
 *     - Security
 *    summary: Registrarse en la APP
 *    description: Registrarse en la APP.
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties: 
 *         user:
 *          $ref: '#/components/schemas/User'
 *    responses:
 *     200:
 *      description: successful operation.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Response'
 *        examples:
 *         user-ok:
 *          $ref: '#/components/mocks/user-ok'
 */
 securityRoute.post('/register', securityController.register)

/**
 * @openapi
 *  /login:
 *   post:
 *    tags:
 *     - Security
 *    security:
 *     - basicAuthentication: []
 *    summary: Login APP
 *    description: valid user and password.
 *    responses:
 *     200:
 *      description: successful operation.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Response'
 *        examples:
 *         health-ok:
 *          $ref: '#/components/mocks/rostro-ok'
 */
securityRoute.post('/login', credentialVerification, securityController.login)

/**
 * @openapi
 *  /refreshToken:
 *   post:
 *    tags:
 *     - Security
 *    security:
 *     - bearerAuthorization: []
 *    summary: Refresh JWT
 *    description: valid refresh token.
 *    responses:
 *     200:
 *      description: successful operation.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Response'
 *        examples:
 *         health-ok:
 *          $ref: '#/components/mocks/rostro-ok'
 */
securityRoute.post('/refreshToken', refreshTokenVerification, securityController.refreshToken)

export {
  securityRoute
}
