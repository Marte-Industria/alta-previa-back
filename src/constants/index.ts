import dotenv from 'dotenv'
import { getEnvironmentVariable } from '../utils'
dotenv.config({ path: '.env' })

export const PORT = getEnvironmentVariable('PORT')
export const NODE_ENV = getEnvironmentVariable('NODE_ENV')
export const CONNECTION_STRING = getEnvironmentVariable('CONNECTION_STRING')
export const SECRET_KEY_TOKEN = getEnvironmentVariable('SECRET_KEY_TOKEN')
export const SECRET_KEY_REFRESH_TOKEN = getEnvironmentVariable('SECRET_KEY_REFRESH_TOKEN')
export const VERSION_API = getEnvironmentVariable('VERSION_API')
