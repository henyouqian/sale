import React, { Component } from 'react'
import { render } from 'react-dom'
import FastClick from "fastclick"
import * as lwUtil from "./lwUtil"
import Velocity from "velocity-animate"
// import UIkit from "uikit"
// let UIkit = require("uikit")
let UIkit = require('imports?jQuery=jquery!uikit');
require("./itemList.css")

var _rootEl = document.getElementById("root")
FastClick.attach(_rootEl)


let _state = {
	items:[
		{Id:0, Name:"美国原装进口金华火腿 美国原装进口金华火腿", Image:"FuNBhFsmbfxPptCdVwX4umPwD-pe"},
		{Id:1, Name:"一桶酒", Image:"Fu460EdIFX6BEtc0td8bUsi7Fax1"},
		{Id:2, Name:"不知道这是啥", Image:"Fkwz7vJk4uaURQGwc3LgeKAwrztW"},
		{Id:3, Name:"美国原装进口金华火腿 美国原装进口金华火腿", Image:"FuNBhFsmbfxPptCdVwX4umPwD-pe"},
	],
	title:"啦啦啦",
	types:["进口食品","成人用品","化妆品","日用品","奢侈品","数码产品"]
}

class ItemListPage extends Component {
	render() {
		let cells = _state.items.map((v)=>{
			return <ItemCell name={v.Name} img={v.Image} key={v.Id} item={v}/>
		})
		return (
			<div className="uk-container">
				<div className="uk-grid uk-grid-small itemsContainer">
					{cells}
				</div>
				<BottomBar text={_state.title} onSearchBtnClick={this._onSearchBtnClick.bind(this)} onSellerBtnClick={this._onSellerBtnClick.bind(this)}/>
				<SearchModal onTypeClick={this._onTypeClick.bind(this)} />
				<Loader ref="loader"/>
			</div>
		)
	}
	_onSearchBtnClick(){
		var modal = UIkit.modal("#searchModal")
		modal.show()
	}
	_onSellerBtnClick(){
		// _state.items = [
		// 	{Id:2, Name:"不知道这是啥", Image:"Fkwz7vJk4uaURQGwc3LgeKAwrztW"},
		// 	{Id:3, Name:"美国原装进口金华火腿 美国原装进口金华火腿", Image:"FuNBhFsmbfxPptCdVwX4umPwD-pe"},
		// ]
		// this.forceUpdate()

		// location.href = "cardPage.html?editable=true"

		// _state.title = "new title"
		// this.forceUpdate()

		this.refs.loader.show()
		window.f = ()=>{this.refs.loader.hide()}
	}
	_onTypeClick(v){
		alert(v)
	}
}

class ItemCell extends Component {
	render() {
		const imgUrl = lwUtil.UPLOAD_DOMAIN+this.props.img+"?imageView2/1/w/200/h/200"
		return (
			<div className="cellContainer uk-width-1-2 uk-width-small-1-3 uk-width-medium-1-4 uk-width-large-1-5">
				<div className="cell" onClick={this.gotoItemPage.bind(this)}>
					<img src={imgUrl} alt=""/>
					<div className="caption">{this.props.name}</div>
				</div>
			</div>
		)
	}
	gotoItemPage() {
		location.href = "item.html?id="+this.props.item.Id
	}
}

class HeaderBar extends Component {
	render() {
		return (
			<div id="headerBar" className="uk-panel-box">
				<div className="uk-form uk-flex uk-flex-middle">
					<div className="output uk-flex-item-auto">所有货品</div>
				</div>
			</div>
		)
	}
}

class BottomBar extends Component {
	render() {
		return (
			<div id="bottomBar" className="uk-panel-box">
				<div className="uk-form uk-flex uk-flex-middle">
					<div className="output uk-flex-item-auto">{this.props.text}</div>
					<button className="uk-button uk-button-large uk-flex-item-none" onClick={this.props.onSearchBtnClick}>分类与搜索</button>
					<button className="uk-button uk-button-large uk-flex-item-none" onClick={this.props.onSellerBtnClick}>供货商</button>
				</div>
			</div>
		)
	}
}

class SearchModal extends Component {
	render() {
		let types = _state.types.map(v=>{
			return <a key={v} onClick={()=>{this.props.onTypeClick(v)}}><span className="uk-badge uk-badge-success">{v}</span></a>
		})
		return (
			<div id="searchModal" className="uk-modal">
				<div className="uk-modal-dialog">
					<a className="uk-modal-close uk-close"></a>
					<div className="uk-modal-header">搜索</div>
					<div className="uk-form uk-flex uk-flex-middle">
						<input id="searchInput" className="uk-flex-item-auto" type="text" placeholder="输入关键字"/>
						<button className="uk-button uk-button-large uk-flex-item-none" >搜索</button>
					</div>
					<br/>
					<hr/>
					<div className="uk-modal-header">分类</div>
					<a><span className="uk-badge" onClick={()=>{this.props.onTypeClick("")}}>所有类别</span></a>
					{types}
					{/*<div className="uk-modal-footer">footer</div>*/}
				</div>
			</div>
		)
	}
}

class Loader extends Component {
	constructor(props) {
		super(props)
		this.showCount = 0
	}
	render() {
		return (
			<div className="loaderBg" ref="bg">
				<div className="loader">
					<div className="cssload-loader">
						<div className="cssload-flipper">
							<div className="cssload-front"></div>
							<div className="cssload-back"></div>
						</div>
					</div>
				</div>
			</div>
		)
	}
	show() {
		console.log(this.showCount)
		if (this.showCount == 0) {
			Velocity(this.refs.bg, "fadeIn", { duration: 300, easing:"easeOutCubic" })
		}
		this.showCount++
	}
	hide() {
		console.log(this.showCount)
		this.showCount--
		if (this.showCount <= 0) {
			Velocity(this.refs.bg, "fadeOut", { duration: 300, easing:"easeOutCubic" })
		}
		if (this.showCount < 0){
			this.showCount = 0
		}
	}
}

let loadState = lwUtil.hisOnload()
console.log(loadState)

window.onunload = ()=>{
	lwUtil.hisSetState(_state)
}


render(<ItemListPage />, document.getElementById('root'));
