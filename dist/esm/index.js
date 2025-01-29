import { registerPlugin } from '@capacitor/core';
const LiveKit = registerPlugin('LiveKit', {
    web: () => import('./web').then(m => new m.LiveKitWeb()),
});
export * from './definitions';
export { LiveKit };
//# sourceMappingURL=index.js.map