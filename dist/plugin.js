var capacitorVapi = (function (exports, core, livekitClient) {
    'use strict';

    const LiveKit = core.registerPlugin('LiveKit', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.LiveKitWeb()),
    });

    class LiveKitWeb extends core.WebPlugin {
        async connect(options) {
            const room = new livekitClient.Room();
            this._room = room;
            room.connect(options.url, options.token);
            const onSignalConnected = () => {
                const localP = room.localParticipant;
                Promise.all([
                    localP.setMicrophoneEnabled(true),
                    localP.setCameraEnabled(false),
                    localP.setScreenShareEnabled(false),
                ]).catch((e) => {
                    console.error(e);
                });
            };
            room.on(livekitClient.RoomEvent.SignalConnected, onSignalConnected);
        }
        async disconnect() {
            if (this._room) {
                this._room.disconnect();
            }
        }
        async setMuted(_options) { }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        LiveKitWeb: LiveKitWeb
    });

    exports.LiveKit = LiveKit;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports, livekitClient);
//# sourceMappingURL=plugin.js.map
