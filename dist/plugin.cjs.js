'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

const LiveKit = core.registerPlugin('LiveKit', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.LiveKitWeb()),
});

class LiveKitWeb extends core.WebPlugin {
    async connect(options) {
        console.log('ECHO', options);
    }
    async disconnect() {
        console.log('ECHO');
    }
    async configure(_options) { }
    async setMuted(_options) { }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    LiveKitWeb: LiveKitWeb
});

exports.LiveKit = LiveKit;
//# sourceMappingURL=plugin.cjs.js.map
