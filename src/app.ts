import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from 'morgan';
import cookieParser  from 'cookie-parser';
import {
  swaggerRoute,
  securityRoute,
  healthRoute,
  userRoute
} from './routes'
import { CONNECTION_STRING } from './constants'

import { tokenVerification } from './middlewares';
//overrideLogger();

const app = express()

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(() => {

    // app.use('/uploads', express.static(`${__dirname}\\uploads`))
    app.use('/uploads', express.static(__dirname + '/uploads'))

    app.use(logger('prod'))
    app.use(express.urlencoded({ limit: '10mb', extended: false }))
    app.use(express.json({ limit: '10mb' }))

    app.use(helmet())
    app.use(cors({ origin: true, credentials: true }))
    app.use(cookieParser())

    app.use('/', healthRoute)
    app.use('/', securityRoute)
    app.use('/apidoc', swaggerRoute)
    app.use('/users', tokenVerification,userRoute)

    //app.use(errorHandlers)
  }).catch((err: any) =>{
    console.error('APP.MONGOOSE.ERR :>> ', {err, URL_DB : CONNECTION_STRING})
  })

export default app;