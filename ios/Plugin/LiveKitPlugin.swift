import Foundation
import Capacitor
import Combine

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(LiveKitPlugin)
public class LiveKitPlugin: CAPPlugin {
    private var vapi: Vapi?
    private var cancellables = Set<AnyCancellable>()

    @objc func configure(_ call: CAPPluginCall) {
        let publicKey = call.getString("publicKey") ?? ""
        vapi = Vapi(publicKey: publicKey)
        vapi?.eventPublisher
                    .sink { [weak self] event in
                        switch event {
                        case .callDidStart:
                            self?.notifyListeners("call-start", data:[:], retainUntilConsumed: true)
                        case .callDidEnd:
                            self?.notifyListeners("call-end", data:[:], retainUntilConsumed: true)
                        case .speechUpdate(let speechUpdate):
                            if (speechUpdate.status == SpeechUpdate.Status.started) {
                                self?.notifyListeners("speech-start", data:[:], retainUntilConsumed: true)
                            } else {
                                self?.notifyListeners("speech-stopped", data:[:], retainUntilConsumed: true)
                            }
                        case .hang:
                            self?.notifyListeners("message", data:[:], retainUntilConsumed: true)
                        case .functionCall:
                            self?.notifyListeners("message", data:[:], retainUntilConsumed: true)
                        case .conversationUpdate(let conversationUpdate):
                            self?.notifyListeners("message", data:["type": "conversation-update", "conversation": conversationUpdate.conversation], retainUntilConsumed: true)
                        case .metadata:
                            self?.notifyListeners("message", data:[:], retainUntilConsumed: true)
                        case .transcript(let transcript):
                            self?.notifyListeners("message", data:["type": "transcript", "role": transcript.role], retainUntilConsumed: true)
                        case .error(let error):
                            self?.notifyListeners("error", data:[:], retainUntilConsumed: true)
                        }
                    }
                    .store(in: &cancellables)
    }
    
    @objc func connect(_ call: CAPPluginCall) {
        let assistantId = call.getString("assistantId") ?? ""
        Task {
            do {
                try await vapi?.start(assistantId: assistantId)
            } catch {
                call.reject(error.localizedDescription )
            }
            call.resolve()
        }
    }
    
    @objc func disconnect(_ call: CAPPluginCall) {
        vapi?.stop()
        call.resolve()
    }
    
    @objc func setMuted(_ call: CAPPluginCall) {
        let muted = call.getBool("muted") ?? false
        Task {
            do {
                try await vapi?.setMuted(muted)
            } catch {
                call.reject(error.localizedDescription)
            }
        }
    }
}

