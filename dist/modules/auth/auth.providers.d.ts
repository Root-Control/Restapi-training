export declare const authProviders: ({
    provide: string;
    useValue: import("./interfaces/facebook-config.interface").IFacebookConfig;
} | {
    provide: string;
    useValue: import("./interfaces/twitter-config.interface").ITwitterConfig;
} | {
    provide: string;
    useValue: import("./interfaces/google-config.interface").IGoogleConfig;
})[];
