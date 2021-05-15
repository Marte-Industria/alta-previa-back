import {Router} from 'express';
import {UserController} from '../controllers/user-controller';

export const userRoute = Router()
const userController = new UserController();

/**
 * @openapi
 *  /users:
 *   get:
 *    tags:
 *     - User
 *    security:
 *     - bearerAuthorization: []
 *    summary: Obtiene usuario logeado
 *    description: Obtiene usuario logeado.
 *    responses:
 *     200:
 *      description: successful operation.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Response'
 *        examples:
 *         health-ok:
 *          $ref: '#/components/mocks/health-ok'
 */
 userRoute.get('/', userController.readUser)

/**
 * @openapi
 *  /users:
 *   put:
 *    tags:
 *     - User
 *    security:
 *     - bearerAuthorization: []
 *    summary: Actualiza usuario logeado
 *    description:  Actualiza usuario logeado.
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
 *         health-ok:
 *          $ref: '#/components/mocks/health-ok'
 */
   userRoute.put('/', userController.updateUser)

 /**
 * @openapi
 *  /users:
 *   delete:
 *    tags:
 *     - User
 *    security:
 *     - bearerAuthorization: []
 *    summary: Elimina usuario logeado
 *    description:  Elimina usuario logeado.
 *    responses:
 *     200:
 *      description: successful operation.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Response'
 *        examples:
 *         health-ok:
 *          $ref: '#/components/mocks/health-ok'
 */
  userRoute.delete('/', userController.disabledUser)