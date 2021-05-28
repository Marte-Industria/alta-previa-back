import { Router } from 'express';
import { INeverController } from '../controllers/iNever-controller';


export const iNeverRoute = Router()
const iNeverController = new INeverController();

/**
 * @openapi
 *  /i-nevers:
 *   get:
 *    tags:
 *     - INever
 *    security:
 *     - bearerAuthorization: []
 *    summary: Obtiene los juegos iNever
 *    description: Obtiene los juegos de tipo iNever.
 *    parameters:
 *     - $ref: '#/components/parameters/isSpacy'
 *     - $ref: '#/components/parameters/level'
 *    responses:
 *     200:
 *      description: successful operation.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Response'
 *        examples:
 *         health-ok:
 *          $ref: '#/components/examples/health-ok'
 */
iNeverRoute.get('/', iNeverController.getMany)

/**
 * @openapi
 *  /i-nevers/by-user:
 *   get:
 *    tags:
 *     - INever
 *    security:
 *     - bearerAuthorization: []
 *    summary: Obtiene los juegos iNever del usuario
 *    description: Obtiene los juegos de tipo iNever creados por el usuario.
 *    responses:
 *     200:
 *      description: successful operation.
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Response'
 *        examples:
 *         health-ok:
 *          $ref: '#/components/examples/health-ok'
 */
iNeverRoute.get('/by-user', iNeverController.getManyByUser)

/**
* @openapi
*  /i-nevers:
*   post:
*    tags:
*     - INever
*    security:
*     - bearerAuthorization: []
*    summary: Crea un INever
*    description:  Crea un juego de tipo INever.
*    requestBody:
*     content:
*      application/json:
*       schema:
*        type: object
*        properties: 
*         i_never:
*           type: array
*           items:
*            $ref: '#/components/schemas/INever'
*    responses:
*     200:
*      description: successful operation.
*      content:
*       application/json:
*        schema:
*         $ref: '#/components/schemas/Response'
*        examples:
*         health-ok:
*          $ref: '#/components/examples/health-ok'
*/
iNeverRoute.post('/', iNeverController.createMany)

/**
* @openapi
*  '/i-nevers/{id}':
*   delete:
*    tags:
*     - INever
*    security:
*     - bearerAuthorization: []
*    summary: Deshabilitada un juego de iNever
*    description:  Deshabilita un juego del usuario logeado. Juego de tipo iNever.
*    parameters:
*     - $ref: '#/components/parameters/id'
*    responses:
*     200:
*      description: successful operation.
*      content:
*       application/json:
*        schema:
*         $ref: '#/components/schemas/Response'
*        examples:
*         health-ok:
*          $ref: '#/components/examples/health-ok'
*/
iNeverRoute.delete('/:id', iNeverController.disabled)