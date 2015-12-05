import $ from 'jquery';
import lscache from "lscache"

const isRelease = location.hostname.indexOf(".com") >= 0

export const HOST = isRelease?"g.erdianzhang.com":window.location.hostname+":5555"
export const UPLOAD_DOMAIN = "http://7xnmom.com1.z0.glb.clouddn.com/"
const WEIXIN_APP_ID = isRelease?"wx91d22b9d6d98f9eb":"wxf51d2850dcca419e"

//===========================
//util
export function getTime() {
	var d = new Date()
	return d.getTime()
}

export function getTimeSec() {
	var d = new Date()
	return Math.floor(d.getTime()/1000)
}

export function getUrlParam(param, url) {
  param = param.replace(/([\[\](){}*?+^$.\\|])/g, "\\$1");
  var regex = new RegExp("[?&#]" + param + "=([^&#]*)");
  url   = url || decodeURIComponent(window.location.href);
  var match = regex.exec(url);
  return match ? match[1] : "";
}

export function setUrlParam(searchString, param, value) {
	var rx = new RegExp('([&?#]' + param + ')(?:=[^&]*)?(?=&|$)', 'i'),
		encodedVal = encodeURIComponent(value);

	if (rx.test(searchString)) {
		return searchString.replace(rx, '$1=' + encodedVal)
	} else {
		if (searchString.indexOf('?') == -1)
			return (searchString + '?' + param + '=' + encodedVal);
		else
			return (searchString + '&' + param + '=' + encodedVal);
	}
}

export function getCookie(c_name) {
	if (document.cookie.length>0) {
		let c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1) {
			c_start=c_start + c_name.length+1;
			let c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end))
		}
	}
	return "";
}

export function setCookie(c_name,value,expiredays) {
	let exdate = new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +value+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}

export function delCookie(c_name){
	setCookie(c_name, 0, -1);
}

//
export function isTouchDevice(){
	return ("createTouch" in document)
}

export function isIos() {
	var u = navigator.userAgent, app = navigator.appVersion;
	return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

export function isAndroid() {
	var u = navigator.userAgent, app = navigator.appVersion;
	return u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
}

export function isWeixin(){
	var ua = navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		return true;
	} else {
		return false;
	}
}

export function makeAvatarUrl(avatarKey, size) {
	if (!avatarKey) {
		return
	}
	if (avatarKey[0] == "+") {
		return "http://en.gravatar.com/avatar/"+avatarKey.substr(1)+"?d=identicon&s="+size
	} else if (avatarKey.substr(0, 4) == "http") {
		var sizes = [46, 64, 96, 132, 640]
		var pickSize = 0
		for (var i in sizes) {
			if (sizes[i] >= size) {
				pickSize = sizes[i]
				break
			}
		}
		return avatarKey.substr(0, avatarKey.length - 1) + pickSize
	} else {
		return UPLOAD_DOMAIN + avatarKey
	}
}

//===========================
//ajax

$.ajaxSetup({
	cache: false,
	crossDomain: true,
	dataType: 'json',
	xhrFields: {
		withCredentials: true
	}
});

export function checkAuth() {
	var usertoken = getCookie("usertoken")
	if (!usertoken) {
		goAuth()
	}
}

export function goAuth(){
	lscache.set("returnUrl", window.location.href)
	
	let url = "http://192.168.2.55:4444/qrLogin.html"
	url = setUrlParam(url, "onLoginUrl", `${location.origin}/onLogin.html`)
	location.replace(url)
}

export function post(url, data) {
	let p = new Promise((resolve, reject)=>{
		if (url.indexOf("auth/") < 0) {
			checkAuth()
		}

		var idx = url.indexOf("?")
		if (idx == -1) {
			url = "http://"+HOST+"/"+url+"?nocache="+getTime()
		} else {
			url = "http://"+HOST+"/"+url+"&nocache="+getTime()
		}
		
		$.post(url, JSON.stringify(data), resolve, "json")
		.error(function(xhr){
			var resp = xhr.responseJSON
			if (typeof(resp) == "undefined") {
				reject({Type:"err_net"})
				return
			}
			if (resp.Type == "err_auth") {
				if (window.location.pathname != "/account.html") {
					goAuth()
				}
			} else {
				reject(resp)
			}
		})
	})
	return p
}

function initWeixin() {
	var data = {
		Url : location.href.split('#')[0],
	}
	post("weixin/getJsApiSig", data, function(resp) {
		console.log(resp)
		var ticket = resp.Ticket
		var noncestr = resp.Noncestr
		var timestamp = resp.Timestamp
		var sig = resp.Sig
		var appId = resp.AppId

		// alert(sig+",\n"+timestamp)

		wx.config({
			debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: appId, // 必填，公众号的唯一标识
			timestamp: timestamp, // 必填，生成签名的时间戳
			nonceStr: noncestr, // 必填，生成签名的随机串
			signature: sig,// 必填，签名，见附录1
			jsApiList: [
		        'checkJsApi',
		        'onMenuShareTimeline',
		        'onMenuShareAppMessage',
		        'onMenuShareQQ',
		        'onMenuShareWeibo',
		        'hideMenuItems',
		        'showMenuItems',
		        'hideAllNonBaseMenuItem',
		        'showAllNonBaseMenuItem',
		        'translateVoice',
		        'startRecord',
		        'stopRecord',
		        'onRecordEnd',
		        'playVoice',
		        'pauseVoice',
		        'stopVoice',
		        'uploadVoice',
		        'downloadVoice',
		        'chooseImage',
		        'previewImage',
		        'uploadImage',
		        'downloadImage',
		        'getNetworkType',
		        'openLocation',
		        'getLocation',
		        'hideOptionMenu',
		        'showOptionMenu',
		        'closeWindow',
		        'scanQRCode',
		        'chooseWXPay',
		        'openProductSpecificView',
		        'addCard',
		        'chooseCard',
		        'openCard'
		      ]
		})
	}, function(resp){
		alert("err_weixin_sig:"+resp.Type)
	})
}

////////
export function hisOnload() {
	if (!sessionStorage.currHis) {
		sessionStorage.currHis = 0
	}
	if (history.state) {
		var currHis = parseInt(sessionStorage.currHis)
		if (history.state.__his < currHis) {
			sessionStorage.currHis = history.state.__his
			return "back"
		} else if (history.state.__his > currHis) {
			sessionStorage.currHis = history.state.__his
			return "forward"
		} else {
			return "refresh"
		}
	} else {
		sessionStorage.currHis++
		history.replaceState({__his:parseInt(sessionStorage.currHis)}, "", "")
		return "push"
	}
}

export function hisSetState(state) {
	state.__his = history.state.__his
	history.replaceState(state, "", "")
}

