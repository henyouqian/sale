import React, { Component } from 'react';

require("./dlg.css")

export class Dlg extends Component {
  componentWillUpdate(nextProps, nextState){
    if (nextState && "visible" in nextState) {
      if (nextState.visible) {
        this.show()
      } else {
        this.hide()
      }
    }
  }
  render() {
    return(
      <div ref="frame" onClick={this.close.bind(this)} style={{display:"none", zIndex: 13,position:"absolute", left:0, right:0, top:0, bottom:0, width:"100%", backgroundColor:"rgba(0,0,0,0.7)"}}>
        <div className="uk-panel uk-panel-box dlgModal" onClick={evt=>{evt.stopPropagation()}}>
          {this.props.children}
        </div>
      </div>
    )
  }
  close() {
    Velocity(this.refs.frame, "fadeOut", { duration: 200, easing:"easeOutSine" })
  }
  show() {
    Velocity(this.refs.frame, "fadeIn", { duration: 200, easing:"easeInSine" })
  }
}

// let cssDlg = {
//   position: "fixed",
//   zIndex: 13,
//   minWidth: "200px",
//   // minHeight: "200px",
//   maxHeight: "80%",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   // backgroundColor: "#FAFAFC",
//   textAlign: "center",
//   borderRadius: "3px",
//   padding:"20px",
//   overflowY: "auto",
//   WebkitOverflowScrolling: "touch"
// }

export class DlgAlert extends Component {
  render() {
    return(
      <Dlg ref="dlg" style={{paddingBottom:"0px"}}>
        <h2>{this.props.title}</h2>
        <p>{this.props.msg}</p>
        <button onClick={this.close.bind(this)} className="uk-button uk-button-large uk-width-1-1"><span>{this.props.btn}</span></button>
      </Dlg>
    )
  }
  close() {
    this.refs.dlg.close()
  }
  show() {
    // this.refs.dlg.show()
    this.refs.dlg.setState({visible:true})
  }
}

DlgAlert.defaultProps = { title: "title", msg:"", btn:"好的"};
