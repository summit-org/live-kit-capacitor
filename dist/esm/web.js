import { WebPlugin } from '@capacitor/core';
export class LiveKitWeb extends WebPlugin {
    async connect(options) {
        console.log('ECHO', options);
    }
    async disconnect() {
        console.log('ECHO');
    }
    async configure(_options) { }
    async setMuted(_options) { }
}
//# sourceMappingURL=web.js.map