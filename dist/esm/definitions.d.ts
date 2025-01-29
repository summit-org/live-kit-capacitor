export interface LiveKitPlugin {
    connect(options: {
        assistantId: string;
    }): Promise<void>;
    disconnect(): Promise<void>;
    configure(options: {
        publicKey: string;
    }): Promise<void>;
    setMuted(options: {
        muted: boolean;
    }): Promise<void>;
}
