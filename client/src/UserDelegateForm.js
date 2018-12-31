import React from 'react'
import {Panel,Button,Table} from 'react-bootstrap'
class UserDelegateForm extends React.Component {
  // constructor(props){
  //   super(props);
  // }

  render() {
    
    if(this.props.delegator === '' || this.props.account === this.props.delegator){
        this.props.confirmReceived(this.props.delegator);
        return (
            <label>暂无查询结果</label>
        )
    }

    if(this.props.requestor === ''){
      this.props.confirmReceived('');
      return (
        <label>暂无查询结果</label>
      )
    }
    return (
        // <form onSubmit={(event) => {
        //     event.preventDefault()
           
        //   }}>
        //     <div className='form-group'>
        //       <label>查询结果</label>
        //       <div>
        //       <label>接受委托者</label>
        //       <input type="text" value={this.props.delegator}/>
        //       </div>
        //     </div>
        //     <button type='submit' className='btn btn-primary'></button>
        //     <hr />
        // </form>

        <Panel bsStyle="success" id="querypanel">
        <Panel.Heading>
          <Panel.Title componentClass="h3">正在进行的委托</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
        <div>
          <Table striped bordered condensed hover>
          <thead>
            <tr>
              <th>序号</th>
              <th>接受委托人（代领者）</th>
              <th>预计送达时间</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{this.props.delegator}</td>
              <td>1小时</td>
              <td><Button onClick={(event) => {
                this.props.confirmReceived(this.props.requestor);
              }} className='btn btn-success'>确认收货</Button></td>
            </tr>
            
          </tbody>
          </Table>

          <div id="returnbutton">
            <Button onClick={(event) => {
                this.props.clickReturn()
              }} className='btn btn-primary'>返回</Button>
          </div>
        </div>
        </Panel.Body>
        </Panel>
    )
  }
}

export default UserDelegateForm