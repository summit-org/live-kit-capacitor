package com.livekit.capacitor.plugin

import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import io.livekit.android.LiveKit.create
import io.livekit.android.LiveKitOverrides
import io.livekit.android.RoomOptions
import io.livekit.android.room.Room
import io.livekit.android.room.track.RemoteTrackPublication
import kotlinx.coroutines.runBlocking

@CapacitorPlugin(name = "LiveKit")
class LiveKitPlugin : Plugin() {
    private var room: Room? = null;

    @PluginMethod
    fun connect(call: PluginCall) {
        if (room == null) {
            room = create(activity.applicationContext)
        }
        val url = call.getString("url")
        val token = call.getString("token")

        runBlocking {
            room!!.connect(url!!, token!!)
            room!!.localParticipant.setCameraEnabled(false)
            room!!.localParticipant.setMicrophoneEnabled(true)
            room!!.localParticipant.setScreenShareEnabled(false)
        }
        call.resolve()
    }

    @PluginMethod
    fun disconnect(call: PluginCall) {
        if (room != null) {
            room!!.disconnect()
        }
        call.resolve()
    }

    @PluginMethod
    fun setMuted(call: PluginCall) {
        val muted = call.getBoolean("muted") ?: false;
        if (room != null) {
            runBlocking {
                room!!.localParticipant.setMicrophoneEnabled(muted)
                for (participant in room!!.remoteParticipants.values) {
                    for (publication in participant.audioTrackPublications) {
                        (publication.first as RemoteTrackPublication).setSubscribed(!muted)
                    }
                }
            }
        }
        call.resolve()
    }
}
