import { Router } from 'express';
import { swaggerUiServe, swaggerUiSetup } from '../utils';

export const swaggerRoute = Router()

swaggerRoute.use('/', swaggerUiServe);
swaggerRoute.get('/', swaggerUiSetup);