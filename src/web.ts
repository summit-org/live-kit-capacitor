import { WebPlugin } from '@capacitor/core';

import type { LiveKitPlugin } from './definitions';
import { Room, RoomEvent } from 'livekit-client';


// Probably want to use the react-components instead of this for web
// since web requires having certain UI components on the page for audio/microphone to work
export class LiveKitWeb extends WebPlugin implements LiveKitPlugin {
  _room: Room | undefined;

  async connect(options: { url: string, token: string }): Promise<void> {
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
    room.on(RoomEvent.SignalConnected, onSignalConnected)
  }
  async disconnect(): Promise<void> {
    if (this._room) {
      this._room.disconnect();
    }
  }
  async setMuted(_options: { muted: boolean }): Promise<void> { }
}
