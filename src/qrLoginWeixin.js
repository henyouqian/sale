import * as lwUtil from "./lwUtil"
// import lscache from "lscache"
import $ from "jquery"

const frameEl = $(".centerFrame")
const btnLoginEl = $("#btnLogin")

lwUtil.post("auth/getUserInfo", null).then(resp=>{
	let code = lwUtil.getUrlParam("code")
	console.log(resp)
	let userInfo = resp.UserInfo
	$("avatar>img").attr("src", lwUtil.makeAvatarUrl(userInfo.AvatarKey, 128))
	btnLoginEl.click(()=>{
		lwUtil.post("auth/qrLogin", {Code:code}).then(resp=>{
			alert("登陆成功")
			btnLoginEl.hide()
		})
	})
	
	frameEl.show()
}, err=>{
	console.error(err)
})