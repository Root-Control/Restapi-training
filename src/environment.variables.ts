import { parse } from 'dotenv';
import { readFileSync } from 'fs';

export class EnvironmentService {
    private readonly envConfig: { [prop: string]: string };

    constructor(filePath: string) {
        this.envConfig = parse(readFileSync(filePath));
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}
