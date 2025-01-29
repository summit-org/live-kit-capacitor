import { WebPlugin } from '@capacitor/core';
import type { LiveKitPlugin } from './definitions';
export declare class LiveKitWeb extends WebPlugin implements LiveKitPlugin {
    connect(options: {
        assistantId: string;
    }): Promise<void>;
    disconnect(): Promise<void>;
    configure(_options: {
        publicKey: string;
    }): Promise<void>;
    setMuted(_options: {
        muted: boolean;
    }): Promise<void>;
}
