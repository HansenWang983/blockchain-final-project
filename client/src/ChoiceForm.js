import React from 'react'
import {Button,Panel} from "react-bootstrap";

class ChoiceForm extends React.Component {
//   constructor(props){
//     super(props);
//     console.log()
//   } 

  render() {
    return (
      <Panel bsStyle="primary" id="choicepanel">
      <Panel.Heading>
        <Panel.Title componentClass="h3">主菜单</Panel.Title>
        </Panel.Heading>
          <Panel.Body>
          <form>
          <div id="userchoice">
          <Button bsStyle="success btn-lg"  name="release" type="submit" onClick={(event) => {
          this.props.userChoice(event.target.name);
          }}>发起委托</Button> 
          </div>
          <div id="userchoice">
          <Button bsStyle="success btn-lg"   name="query" type="submit" onClick={(event) => {
          this.props.userChoice(event.target.name);
          }}>查看委托</Button>
          </div>
          <div id="userchoice">
          <Button bsStyle="success btn-lg"   name="queryself" type="submit" onClick={(event) => {
          this.props.userChoice(event.target.name);
          }}>被接受的委托</Button> 
          </div>
        </form>
      </Panel.Body>
    </Panel>
    
   
    )
  }
}

export default ChoiceForm