import * as lwUtil from "./lwUtil"
import lscache from "lscache"

const token = lwUtil.getUrlParam("token")
if (!token) {
	throw("need token")
}
console.log(token)
lwUtil.setCookie("usertoken", token)

let returnUrl = lscache.get("returnUrl")
if (!returnUrl) {
	throw("returnUrl miss")
}

lwUtil.post("auth/getUserInfo", null).then(resp=>{
	console.log(resp)
	lscache.set("userInfo", resp.UserInfo)
	let returnUrl = lscache.get("returnUrl")
	lscache.remove("returnUrl")
	location.replace(returnUrl)
}, err=>{
	console.error(err)
})
