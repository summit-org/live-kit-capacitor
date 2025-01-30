import { WebPlugin } from '@capacitor/core';
import type { LiveKitPlugin } from './definitions';
import { Room } from 'livekit-client';
export declare class LiveKitWeb extends WebPlugin implements LiveKitPlugin {
    _room: Room | undefined;
    connect(options: {
        url: string;
        token: string;
    }): Promise<void>;
    disconnect(): Promise<void>;
    setMuted(_options: {
        muted: boolean;
    }): Promise<void>;
}
