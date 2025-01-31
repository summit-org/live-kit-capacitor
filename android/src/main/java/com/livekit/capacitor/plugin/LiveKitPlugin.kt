package com.livekit.capacitor.plugin

import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import io.livekit.android.LiveKit.create
import io.livekit.android.LiveKitOverrides
import io.livekit.android.RoomOptions
import io.livekit.android.room.track.RemoteTrackPublication
import kotlinx.coroutines.runBlocking

@CapacitorPlugin(name = "LiveKit")
class LiveKitPlugin : Plugin() {
    private val room = create(activity.applicationContext, RoomOptions(), LiveKitOverrides())
    @PluginMethod
    fun connect(call: PluginCall) {
        val url = call.getString("url")
        val token = call.getString("token")

        runBlocking {
            room.connect(url!!, token!!)
            room.localParticipant.setCameraEnabled(false)
            room.localParticipant.setMicrophoneEnabled(true)
        }
        call.resolve()
    }

    @PluginMethod
    fun disconnect(call: PluginCall) {
        room.disconnect()
        call.resolve()
    }

    @PluginMethod
    fun setMuted(call: PluginCall) {
        val muted = call.getBoolean("muted") ?: false;
        runBlocking {
                room.localParticipant.setMicrophoneEnabled(muted)
                    for (participant in room.remoteParticipants.values) {
                        for (publication in participant.audioTrackPublications) {
                            (publication.first as RemoteTrackPublication).setSubscribed(!muted)
                        }
                    }
            }
        call.resolve()
    }
}
