

import { Router } from 'express';
import { HealthController } from '../controllers';

export const healthRoute = Router()
const healthController = new HealthController();

/**
 * @openapi
 *  /health:
 *   get:
 *    tags:
 *     - Health
 *    summary: Obtiene el estado de la APP
 *    description: Retorna un mensaje de bienvenida.
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
healthRoute.get('/health', healthController.dependencies)