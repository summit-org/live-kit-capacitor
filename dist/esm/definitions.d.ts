export interface LiveKitPlugin {
    connect(options: {
        token: string;
        url: string;
    }): Promise<void>;
    disconnect(): Promise<void>;
    setMuted(options: {
        muted: boolean;
    }): Promise<void>;
}
