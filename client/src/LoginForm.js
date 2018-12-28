import React from 'react'
import { Carousel, Button,Jumbotron,ProgressBar,Panel,ButtonToolbar} from 'react-bootstrap';

class LoginForm extends React.Component {
  // constructor(props){
  //   super(props);
  // }

  render() {
    if(this.props.loginOrReg === ''){
        return (
          <Jumbotron>
          <h1>欢迎来到快递代领互助平台</h1>
          <p>
            基于Solidity，Web3和React
          </p>
          <Panel bsStyle="info">
          <Panel.Heading>
          <Panel.Title componentClass="h3">请选择注册新账户或者登录已有的账户</Panel.Title>
          </Panel.Heading>
          <Panel.Body>
          <div className="container" id="loginchoice">
            <form id="login-form">
            <div>
            <div class="choicebutton">
              <Button bsStyle="success btn-lg" type="submit"  name="login" onClick={(event) => {
                this.props.loginOrRegChoice(event.target.name);
            }}>登录</Button>
            </div>
            <div class="choicebutton">
              <Button bsStyle="primary btn-lg" type="submit" name="register" onClick={(event) => {
                this.props.loginOrRegChoice(event.target.name);
            }}>注册</Button>
            </div>
              </div>
            </form>
            </div>
          </Panel.Body>
          </Panel>
        </Jumbotron>
        )
    }

    if (this.props.loginOrReg === 'login'){
        return (
          <Panel bsStyle="primary" id="loginpanel">
            <Panel.Heading>
              <Panel.Title componentClass="h3">登录</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <form id="login-form" onSubmit={(event) => {
                  event.preventDefault()
                  this.props.userLogin(event.target.account.value,event.target.password.value);
              }}>
                <div className="form-group" id="logininput">
                    <input type="string" className="form-control" placeholder="账户钱包地址" name="account" required />
                </div>
                <div className="form-group" id="logininput">
                    <input type="password"  className="form-control" placeholder="账户密码" name="password" required />
                </div>
                <div id="loginbutton">
                <Button bsStyle="primary" type="submit"   class="form-control">登录</Button>
                </div>
              </form>
            </Panel.Body>
          </Panel>
           
        )
    }

    return (
      <Panel bsStyle="primary" id="loginpanel"> 
      <Panel.Body>
      <Panel.Heading>
        <Panel.Title componentClass="h3">注册</Panel.Title>
      </Panel.Heading>
      <form id="register-form" onSubmit={(event) => {
            event.preventDefault()
            this.props.userRegister(event.target.password.value);
        }}>
        <div className="form-group" id="logininput">
       <input type="password"  className="auth-form-body" name="password" placeholder="密码" id="password" className="form-control" required/>
       </div>
       <div className="form-group" id="logininput">
       <input type="submit" name="commit" value="注册" className="btn btn-primary btn-block"/>
       </div>
       </form>
      </Panel.Body>
    </Panel>
    )
  }
}

export default LoginForm