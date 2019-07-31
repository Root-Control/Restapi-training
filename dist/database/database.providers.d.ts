/// <reference types="mongoose" />
export declare const databaseProviders: {
    provide: string;
    useFactory: () => Promise<import("mongoose").Connection>;
}[];
