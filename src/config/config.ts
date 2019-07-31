import { EnvironmentService } from '../environment.variables';
import { extractKey } from '../utilities/keys';

const environmentService = new EnvironmentService('.env');
/**
 *  Creamos la interface IEnvironmentConfig la cual obtendrá todas
 *  las propiedades de nuestro entorno de trabajo.
 */
interface IEnvironmentConfig {
    rootPath: string;
    db_uri: string;
    httpPort: number;
    wsPort: number;
    jwtSecret: string;
    domain: string;
    httpProtocol: string;
    wsProtocol: string;
    awsKey: string;
    awsSecret: string;
}

/**
 *  Creamos una interface "IConfig", la cual contendrá a IEnvironmentConfig
 *  Estos objetos tipados implementan la interfaz IEnvironmentConfig con los
 *  Entornos de desarrollo y produccion (según se implemente);
 */
interface IConfig {
    [key: string]: IEnvironmentConfig;
    development: IEnvironmentConfig;
    production: IEnvironmentConfig;
}

/**
 *  Seteamos la variable rootPath, para saber la ruta en la cual se encuentra el servidor.
 */
const rootPath = process.cwd();

/**
 *  En la constante jwtSecret asignamos la llave creada en /keys/jwt.private.key
 */
const jwtSecret = extractKey(`${rootPath}/keys/jwt.private.key`);

const db = `${environmentService.get('MONGODB_CONNECTION')}:${environmentService.get('MONGODB_PORT')}/${environmentService.get('MONGODB_DATABASE')}`;
/**
 *  Definimos los valores para local y produccion
 */
const Config: IConfig = {
    development: {
        rootPath,
        db_uri: db || 'mongodb://localhost:27017/thelinkstore-dev',
        httpPort: 1337,
        wsPort: 1338,
        jwtSecret,
        domain: 'localhost',
        httpProtocol: 'http',
        wsProtocol: 'ws',
        awsKey: environmentService.get('AWS_KEY'),
        awsSecret: environmentService.get('AWS_SECRET')
    },
    production: {
        rootPath,
        db_uri: db || 'mongodb://localhost:27017/thelinkstore-prod',
        httpPort: + environmentService.get('HTTP_SERVER_PORT'),
        wsPort: + environmentService.get('WS_PORT'),
        jwtSecret,
        domain: environmentService.get('DOMAIN'),
        httpProtocol: environmentService.get('HTTP_PROTOCOL'),
        wsProtocol: environmentService.get('WS_PROTOCOL'),
        awsKey: environmentService.get('AWS_KEY'),
        awsSecret: environmentService.get('AWS_SECRET')
    }
};

export {
    IEnvironmentConfig,
    IConfig,
    Config
};
