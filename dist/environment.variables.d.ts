export declare class EnvironmentService {
    private readonly envConfig;
    constructor(filePath: string);
    get(key: string): string;
}
