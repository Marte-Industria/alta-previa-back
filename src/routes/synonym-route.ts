import {Router} from 'express';
import {SynonymController} from '../controllers/synonym-controller';

export const synonymRoute = Router()
const synonymController = new SynonymController();

 /**
 * @openapi
 *  /synonyms/by-user:
 *   get:
 *    tags:
 *     - Synonym
 *    security:
 *     - bearerAuthorization: []
 *    summary: Obtiene los sinonimos creado por el usuario
 *    description: Obtiene sinonimos creado por el usuario.
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
  synonymRoute.get('/by-user', synonymController.getManyByUser)

/**
 * @openapi
 *  /synonyms:
 *   post:
 *    tags:
 *     - Synonym
 *    security:
 *     - bearerAuthorization: []
 *    summary: Crea un sinonimo
 *    description:  Crea un sinonimo para sustituir en el juego.
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties: 
 *         synonym:
 *           type: array
 *           items:
 *            $ref: '#/components/schemas/Synonym'
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
    synonymRoute.post('/', synonymController.createMany)

 /**
 * @openapi
 *  /synonyms:
 *   delete:
 *    tags:
 *     - Synonym
 *    security:
 *     - bearerAuthorization: []
 *    summary: Deshabilitada un sinonimo
 *    description:  Deshabilitado un sinonimo creado por el usuario. No sera utilizado en los juegos
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
  synonymRoute.delete('/', synonymController.disabled)