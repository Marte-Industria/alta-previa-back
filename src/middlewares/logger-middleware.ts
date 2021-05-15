import Debug from 'debug';
import LogLevel from '../enums/logLevel-emun';
import Enviroment from '../enums/enviroment-enum';


/**
 * This is equivalent to:
 * type LogLevelStrings = 'DEV' | 'QA' | 'PROD';
 */
type EnviromentLevelStrings = keyof typeof Enviroment;

/**
 * This is equivalent to:
 * type LogLevelStrings = 'ERROR' | 'LOG' | 'DEBUG';
 */
type LogLevelStrings = keyof typeof LogLevel;

/* 
export const overrideLogger = () => {
    let enviromentLevelStrings : EnviromentLevelStrings;
    let logLevelStrings : LogLevelStrings;
    const {LOG_LEVEL} = process.env
    enviroment = process.env.NODE_ENV
    if (!asd || !LOG_LEVEL) {
        return false;
    }
    const numLog = LogLevel[LOG_LEVEL];
    const numEnviroment = Enviroment[enviromentLevelStrings];
    const myLog = Debug('app:log')
    const myDebug = Debug('app:debug')
    const myError = Debug('app:error')

    const resultLog = (numEnviroment === Enviroment.PROD) ? 0 : numLog

    switch (resultLog) {
        case 0: {
            console.log = function () { };
            console.debug = function () { };
            console.error = function () { };
            break;
        }
        case 1: {
            console.log = function () { };
            console.debug = function () { };
            console.error = (...args) => { myError(...args) };
            break;
        }

        case 2: {
            console.log = (...args) => { myLog(...args) };
            console.debug = function () { };
            console.error = (...args) => { myError(...args) };
            break;
        }

        case 3: {
            console.log = (...args) => { myLog(...args) };
            console.debug = (...args) => { myDebug(...args) };
            console.error = (...args) => { myError(...args) };
            break;
        }

        default:
            break;
    }
}; */