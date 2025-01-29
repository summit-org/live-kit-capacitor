package com.livekit.capacitor.plugin;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "LiveKit")
public class LiveKitPlugin extends Plugin {

    @PluginMethod
    public void connect(PluginCall call) {
        call.resolve();
    }

    @PluginMethod
    public void disconnect(PluginCall call) {
        call.resolve();
    }
}
