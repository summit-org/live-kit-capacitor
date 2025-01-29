import { registerPlugin } from '@capacitor/core';

import type { LiveKitPlugin } from './definitions';

const LiveKit = registerPlugin<LiveKitPlugin>('LiveKit', {
  web: () => import('./web').then(m => new m.LiveKitWeb()),
});

export * from './definitions';
export { LiveKit };
