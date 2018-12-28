import React from 'react'
import ReleaseForm from './ReleaseForm'
import QueryForm from './QueryForm'
import AcceptForm from './AcceptForm'
import ChoiceForm from './ChoiceForm'
import LoginForm from './LoginForm'
import UserDelegateForm from "./UserDelegateForm"

class Content extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  render() {
    // console.log(this.props.delegateInfo)
    // console.log(this.props.hasLogined)
    if (this.props.hasLogined === false){
      return (
        <LoginForm 
          loginOrReg = {this.props.loginOrReg}
          userLogin = {this.props.userLogin}
          userRegister = {this.props.userRegister}
          loginOrRegChoice = {this.props.loginOrRegChoice}
        />
      )
    }

    else{
      if (this.props.choice === ''){
        return (
          <ChoiceForm 
          choice = {this.props.choice}
          userChoice = {this.props.userChoice}/>
        )
      }
      if (this.props.choice === 'release'){
        return (
          <div>
          {
            <ReleaseForm 
            releaseDelegate={this.props.releaseDelegate} 
            clickReturn = {this.props.clickReturn}
            />
          }
          </div>
        )
      }
  
      if (this.props.choice === 'query'){
        return (
          <div>
            {
              !this.props.querying ?
              <QueryForm 
              queryDelegate = {this.props.queryDelegate} 
              clickReturn = {this.props.clickReturn}
              />
              // : <label>已经查询委托</label>
              :
              <AcceptForm 
              acceptDelegate = {this.props.acceptDelegate} 
              delegateInfo = {this.props.delegateInfo}
              accept = {this.props.accept}
              code = {this.props.code}
              delegator = {this.props.delegator}
              confirmReceived = {this.props.confirmReceived}
              clickReturn = {this.props.clickReturn}
              />
            }
          </div>
        )
      }

      if (this.props.choice === 'queryself'){
        return (
          <div>
            {
              <UserDelegateForm 
              delegator = {this.props.delegator}
              requestor = {this.props.requestor}
              confirmReceived = {this.props.confirmReceived}
              account = {this.props.account}
              clickReturn = {this.props.clickReturn}
              />
            }
          </div>
        )
      }
    }
  }
}

export default Content