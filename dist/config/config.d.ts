interface IEnvironmentConfig {
    rootPath: string;
    dbs: any;
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
interface IConfig {
    [key: string]: IEnvironmentConfig;
    development: IEnvironmentConfig;
    production: IEnvironmentConfig;
}
declare const Config: IConfig;
export { IEnvironmentConfig, IConfig, Config };
