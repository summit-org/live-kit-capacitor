import Foundation
import Capacitor
import Combine
import LiveKitClient

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(LiveKitPlugin)
public class LiveKitPlugin: CAPPlugin {
    public enum Event {
        case callDidStart
        case callDidEnd
        case hang
        case error(Swift.Error)
    }
    private let room = Room()

    private var cancellables = Set<AnyCancellable>()
    
    /// A Combine publisher that clients can subscribe to for API events.
    @objc func connect(_ call: CAPPluginCall) {
        let url = call.getString("url") ?? ""
        let token = call.getString("token") ?? ""
        Task {
            do {
                try await room.connect(url: url, token: token)
                try await room.localParticipant.setCamera(enabled: false);
                try await room.localParticipant.setScreenShare(enabled: false)
                try await room.localParticipant.setMicrophone(enabled: true)
            } catch {
                call.reject(error.localizedDescription )
            }
            call.resolve()
        }
    }
    
    @objc func disconnect(_ call: CAPPluginCall) {
        Task {
            await room.disconnect()
        }
        call.resolve()
    }
    
    @objc func setMuted(_ call: CAPPluginCall) {
        let muted = call.getBool("muted") ?? false
        Task {
            do {
                try await room.localParticipant.setMicrophone(enabled: muted);
                for participant in room.remoteParticipants.values {
                    for publication in participant.audioTracks {
                        if let track = publication.track as? RemoteAudioTrack {
                            track.volume = muted ? 0 : 100
                        }
                    }
                }
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
}

