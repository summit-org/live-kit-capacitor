import { WebPlugin } from '@capacitor/core';

import type { LiveKitPlugin } from './definitions';

export class LiveKitWeb extends WebPlugin implements LiveKitPlugin {
  async connect(options: { assistantId: string }): Promise<void> {
    console.log('ECHO', options);
  }
  async disconnect(): Promise<void> {
    console.log('ECHO');
  }
  async configure(_options: { publicKey: string }): Promise<void> { }
  async setMuted(_options: { muted: boolean }): Promise<void> { }
}
