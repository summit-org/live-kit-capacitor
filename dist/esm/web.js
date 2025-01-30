import { WebPlugin } from '@capacitor/core';
import { Room, RoomEvent } from 'livekit-client';
export class LiveKitWeb extends WebPlugin {
    async connect(options) {
        const room = new Room();
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
        room.on(RoomEvent.SignalConnected, onSignalConnected);
    }
    async disconnect() {
        if (this._room) {
            this._room.disconnect();
        }
    }
    async setMuted(_options) { }
}
//# sourceMappingURL=web.js.map