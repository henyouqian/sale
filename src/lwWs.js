
export class wsConnect {
	constructor(url) {
		let self = this
		self.wsProcMap = {}
		self.conn = new WebSocket(url);
		self.conn.onclose = function(evt) {
			console.log("ws close")
		}
		self.conn.onerror = function(evt) {
			console.log("ws error")
		}
		self.conn.onmessage = function(evt) {
			var msg = JSON.parse(evt.data)
			if (msg.Type in self.wsProcMap) {
				self.wsProcMap[msg.Type](msg)
			}
		}
	}
	bind(msgType, func) {
		this.wsProcMap[msgType] = func
	}
	send(obj) {
		this.conn.send(JSON.stringify(obj))
	}
}