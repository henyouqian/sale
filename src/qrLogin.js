import * as lwUtil from "./lwUtil"
import lscache from "lscache"
import $ from "jquery"
import * as lwWs from "./lwWs"
import * as uuid from "node-uuid"
import React, { Component } from 'react';
import { render } from 'react-dom';

require("./qrLogin.css")

// let code = uuid.v1()
// jquery('#qrcode').qrcode(`${location.origin}/qrLoginWeixin.html?code=${code}`);

// let returnUrl = lwUtil.getUrlParam("returnUrl")

// let conn = new lwWs.wsConnect(`ws://${lwUtil.HOST}/ws/login?code=${code}`)
// conn.bind("login", msg=>{
// 	lwUtil.setCookie("usertoken", msg.Token)
// 	lwUtil.post("auth/getUserInfo", null).then(msg=>{
// 		lscache.set("userInfo", JSON.stringify(msg.UserInfo))
// 		console.log(returnUrl)
// 		if (returnUrl) {

// 		}
// 	}, err=>{
// 		console.error(err)
// 	})
// })

let returnUrl = lwUtil.getUrlParam("returnUrl")

export class QrLoginPage extends Component {
	constructor(props) {
	    super(props)  
	}
	componentDidMount() {
		let code = uuid.v1()
		let qrcodeEl = $("#qrcode")
		let url = `${location.origin}/qrLoginWeixin.html?code=${code}`
		console.log(url)
		qrcodeEl.qrcode(url)
		let conn = new lwWs.wsConnect(`ws://${lwUtil.HOST}/ws/login?code=${code}`)
		conn.bind("login", msg=>{
			lwUtil.setCookie("usertoken", msg.Token)
			lwUtil.post("auth/getUserInfo", null).then(msg=>{
				lscache.set("userInfo", JSON.stringify(msg.UserInfo))
				$(this.refs.qrFrame).hide()
				$(this.refs.loginOk).show()
				if (returnUrl) {
					setTimeout(()=>{
						location.href = returnUrl
					}, 2000)
				}
			}, err=>{
				console.error(err)
			})
		})
	}
	render() {
		return(
			<div>
				<div id="qrFrame" ref="qrFrame">
					<div id="qrcode"></div>
					<div id="desc">微信扫描二维码登陆</div>
				</div>
				<div id="loginOk" ref="loginOk">登陆成功</div>
			</div>
		)
	}
}

render(<QrLoginPage></QrLoginPage>, document.getElementById('root'));
