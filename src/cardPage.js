import React, { Component } from 'react';
import { render } from 'react-dom';
import { SideMenu } from './sideMenu';
import FastClick from "fastclick";
import * as lwUtil from "./lwUtil"
import $ from "jquery"
import "velocity-animate"
import { Dlg, DlgAlert } from"./dlg"

// require("./cardPage.css");

let _rootEl = document.getElementById("root");
FastClick.attach(_rootEl);
let _state = {
	card:{},
	editable:lwUtil.getUrlParam("editable")?true:false
}

class CardPage extends Component {
	componentDidMount(){
		var msg = {
			UserId:-1,
		}
		if (!_state.editable) {
			msg.UserId = parseInt(lwUtil.getUrlParam("userId"))
			if (!msg.UserId) {
				alert("need userId param")
				return
			}
		}

		lwUtil.post("catalog/getCard", msg).then(resp=>{
			console.log(resp)
			if (resp.Card){
				_state.card = JSON.parse(resp.Card)
				Object.keys(_state.card).forEach(k=>{
					let ref = this.refs[k]
					if (ref) {
						ref.setState({"value": _state.card[k]})
					}
				})
			}
		}, err=>{
			console.error(err)
		})
	}
	render() {
		const card = _state.card
		let inputUIs = [
			{key:"Company", label:"企业", icon:"building-o", placeholder:"必填"},
			{key:"ContactPerson", label:"联系人", icon:"user", placeholder:"必填"},
			{key:"Phone", label:"电话", icon:"phone", placeholder:"必填"},
			{key:"Email", label:"邮箱", icon:"envelope-o"},
			{key:"Weixin", label:"微信", icon:"wechat"}
		]
		const editable = _state.editable
		let inputEls = inputUIs.map(v=>{
			return <Input key={v.key} label={v.label} icon={v.icon} ref={v.key} placeholder={v.placeholder} editable={editable}/>
		})
		const title = editable?"编辑我的联系方式":"供货商联系方式"
		const btn = editable?<button className="uk-button uk-button-large .uk-width-1-1" onClick={()=>this._onSave()}><i className="uk-icon-save"></i> 保存</button>:""

		return (
			<div className="uk-container uk-container-center">
				<div className="uk-width-1-1" style={{maxWidth:"720px", margin:"15px auto"}}>
					<div className="uk-panel uk-panel-box widget_text">
						<div className="uk-panel-badge uk-badge tm-badge-primary" data-uk-offcanvas="{target:'#offcanvas'}" style={{left:0, right:"auto"}}>
							<a href="#offcanvas" data-uk-offcanvas className="uk-icon-navicon" style={{color:"white"}}></a>
						</div>
						<SideMenu />
						<div className="uk-panel-teaser">
							<img src="/home_venice.jpg" width="722" height="407" alt=""/>
						</div>
						<h2>{title}</h2>
						<div>
							<form className="uk-form uk-form-stacked">
								{inputEls}
							</form>
						</div>
					</div>
					{btn}
				</div>
				<div style={{height:"40px"}}></div>
				<DlgAlert ref="dlg" title="保存成功" msg=""></DlgAlert>
			</div>

		);
	}

	_onSave() {
		let d = React.createElement(Dlg)
		console.log(d)
		// this.refs.dlg.show()

		// this.forceUpdate()

		const props = ["Company", "ContactPerson", "Phone", "Email", "Weixin"]
		const requiredProps = ["Company", "ContactPerson", "Phone"]
		let ok = true
		const card = props.reduce((r,k)=>{
			let v = r[k] = this.refs[k].state.value;
			if (v.length == 0 && requiredProps.indexOf(k)>=0) {
				this.refs[k].setState({err: true})
				ok = false
			} else {
				this.refs[k].setState({err: false})
			}
			return r
		}, {})

		if (ok){
			this.props.onSave(card)

			lwUtil.post("catalog/editCard", card).then(resp=>{
				console.log(resp)
				_state.card = card
				this.refs.dlg.show()
			}, err=>{
				console.error(err)
			})
		}
	}
}

class Input extends Component {
	constructor(props) {
	    super(props)
	    this.state = {err: false, value:""}
	}
	render() {
		let type = this.props.type?this.props.type:"text"
		let style = this.state.err?{border:"1px solid red"}:{}
		let placeholder = this.props.placeholder || ""

		let value = this.state.value

		let input = this.props.editable?
			<input className="uk-width-1-1 uk-form-large" type={type} style={style} placeholder={placeholder} ref="input" value={value} onChange={e=>{this.onChange(e)}}/>
			:<input disabled className="uk-width-1-1 uk-form-large" type={type} style={style} placeholder={placeholder} ref="input" value={value} onChange={e=>{this.onChange(e)}}/>

		return (
			<div className="uk-form-row">
				<label className="uk-form-label">{this.props.label}</label>
				<div className="uk-form-controls">
					<div className="uk-form-icon uk-width-1-1">
						<i className={"uk-icon-"+this.props.icon}></i>
						{input}
					</div>
				</div>
			</div>
		)
	}
	onChange(e){
		if (this.props.editable) {
			this.setState({value: e.target.value})
		}
	}
  // render() {
  //   var value = this.state.value;
  //   return <input type="text" value={value} onChange={event=>{this.setState({value: event.target.value})}} />;
  // }
}

render(<div><CardPage onSave={(info) => console.log("onSave", info)}/></div>, document.getElementById('root'));

let loadState = lwUtil.hisOnload()
console.log(loadState)


