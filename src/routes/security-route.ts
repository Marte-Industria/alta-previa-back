import express from 'express'
import { SecurityController } from '../controllers'
import { credentialVerification,refreshTokenVerification,tokenVerification } from '../middlewares'

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
 *          $ref: '#/components/examples/user-ok'
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
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *    responses:
 *     200:
 *      description: successful operation.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Response'
 *        examples:
 *         health-ok:
 *          $ref: '#/components/examples/rostro-ok'
 */
securityRoute.post('/login', credentialVerification, securityController.login)

/**
 * @openapi
 *  /refresh-token:
 *   post:
 *    tags:
 *     - Security
 *    security:
 *     - bearerAuthorization: []
 *    summary: Refresh JWT
 *    description: valid refresh token.
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *    responses:
 *     200:
 *      description: successful operation.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Response'
 *        examples:
 *         health-ok:
 *          $ref: '#/components/examples/rostro-ok'
 */
securityRoute.post('/refresh-token', refreshTokenVerification, securityController.refreshToken)

/**
 * @openapi
 *  /restore-password:
 *   put:
 *    tags:
 *     - Security
 *    summary: Restaurar contraseña
 *    description: restaurar la contraseña, se enviara la nueva contraseña al email.
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties: 
 *         user:
 *          $ref: '#/components/schemas/RestorePassword'
 *    responses:
 *     200:
 *      description: successful operation.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Response'
 *        examples:
 *         health-ok:
 *          $ref: '#/components/examples/rostro-ok'
 */
 securityRoute.put('/restore-password', securityController.restorePassword)

 /**
 * @openapi
 *  /change-password:
 *   put:
 *    tags:
 *     - Security
 *    security:
 *     - bearerAuthorization: []
 *    summary: Cambiar contraseña
 *    description: cambiar contraseña.
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties: 
 *         user:
 *          $ref: '#/components/schemas/ChangePassword'
 *    responses:
 *     200:
 *      description: successful operation.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Response'
 *        examples:
 *         health-ok:
 *          $ref: '#/components/examples/rostro-ok'
 */
  securityRoute.put('/change-password', tokenVerification, securityController.changePassword)

export {
  securityRoute
}
