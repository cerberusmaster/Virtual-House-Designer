export default class WebsocketController {
    constructor(t, e) {
        this.CONTROLLER = t,
            this.APPLICATION_CONFIGURATION = e,
            this.ws = void 0, !0 === e.getIsDavea() ? this.clientName = "davea" : this.clientName = "schaffrath",
            this.domain = e.getPathWebSocket(),
            this.url = `wss://${this.domain}`
        this.subProtocols = ["json"]
        this.isConnected = !1
        this.isRegistered = !1
        this.disconnected = !1
        this.connect()
    }
    connect() {
        this.ws && this.ws.readyState !== this.ws.CLOSED || (this.ws = new WebSocket(this.url),
            this.ws.onopen = this.onOpen.bind(this),
            this.ws.onerror = this.onError.bind(this),
            this.ws.onclose = this.onClose.bind(this),
            this.ws.onmessage = this.onMessage.bind(this),
            this.pingInterval = setInterval((() => {
                this.ping()
            }), 3e4))
    }
    disconnect() {
        this.ws && this.ws.readyState === this.ws.OPEN && (this.ws.close(), this.disconnected = !0)
    }
    onOpen() {
        const t = {
            analytics: {}
        };
        t.analytics.doAnalytics = this.APPLICATION_CONFIGURATION.getDoAnalytics(),
            t.clientName = this.clientName,
            this.send("connected", t),
            this.isConnected = !0,
            this.CONTROLLER.onWebsocketConnected()
    }
    onClose() {
        this.disconnected || (clearTimeout(this.pingTimeout), clearInterval(this.pingInterval), setTimeout((() => {
            this.connect()
        }), 5e3)),
            this.disconnected = !1,
            this.isConnected = !1
    }
    onMessage(t) {
        const e = JSON.parse(t.data);
        switch (e.type) {
            case "pong":
                this.heartbeat();
                break;
            case "message":
                -1 !== e.data.indexOf("registerBrowserClient") &&
                    (Logger.log("WebsocketController. Registered"), this.isRegistered = !0);
                break;
            case "renderComplete":
                this.updateRender(e)
        }
    }
    onError() {
        this.disconnect()
    }
    heartbeat() {
        clearTimeout(this.pingTimeout),
            this.ws && 1 === this.ws.readyState && (this.pingTimeout = setTimeout((() => {
                this.terminate()
            }), 31e3))
    }
    ping() {
        this.send("ping", {})
    }
    send(t, e) {
        const n = e;
        if (n.clientName = this.clientName, this.ws && 1 === this.ws.readyState) {
            const e = {
                action: "sendmessage",
                type: t,
                data: n
            };
            this.ws.send(JSON.stringify(e))
        }
    }
    updateRender(t) {
        const {
            CONTROLLER: e
        } = this;
        if (void 0 !== t.data) {
            const n = t.data.filePath,
                i = t.data.renderJobId;
            "f" === i.slice(0, 1) && e.onWebsocketRenderedFrame(n, i)
        } else {
            const n = t.renderPath,
                i = t.renderJobId;
            "f" === i.slice(0, 1) && e.onWebsocketRenderedFrame(n, i)
        }
    }
    getIsRegistered() {
        return this.isRegistered
    }
    getIsConnected() {
        return this.isConnected
    }
    destroy() {
        clearTimeout(this.pingTimeout), this.disconnect(), this.ws = void 0
    }
}

