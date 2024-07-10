interface Token {
    accessToken: string;
}
export declare class GoogleToken {
    private accessToken;
    setGoogleToken({ accessToken }: Token): void;
    getGoogleToken(): {
        accessToken: string;
    };
}
export {};
