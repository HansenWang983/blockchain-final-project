import React from 'react'
import { Table, Button,Panel } from 'react-bootstrap';

class AcceptForm extends React.Component {
  constructor(props){
    super(props);    
  }

  render() {
    // console.log(this.props.delegateInfo);
    var requestor = this.props.delegateInfo[0];
    var destination = this.props.delegateInfo[1];
    var pay = this.props.delegateInfo[2];
    var accept = this.props.accept;
    var code = this.props.code;
    // console.log(pay);
    if(pay){
      pay = pay.toNumber();
    }
    // console.log(pay);

    if (accept){

        return (

          <Panel bsStyle="primary" id="acceptpanel">
          <Panel.Heading>
            <Panel.Title componentClass="h3">订单详情</Panel.Title>
          </Panel.Heading>
          <Panel.Body>

             <div class="alert alert-warning" role="alert">
                请在规定时间内完成送达，否则将失去押金
              </div>

              <div class="form-group" id="accepttext">
                <label>委托人</label>
                <div type="text" id="acceptinfo">{requestor}</div>
              </div>
              
              <div class="form-group" id="accepttext">
                <label>送达地点</label>
                <div type="text" id="acceptinfo">{destination}</div>
              </div> 
              
              <div class="form-group" id="accepttext">
                <label>委托的取件码是</label>
                <div type="text" id="acceptinfo">{code}</div>
              </div>

              <div id="acceptbutton">
                <Button bsStyle="success" class="form-control" onClick={(event) => {
                this.props.confirmReceived(this.props.delegator);
                }}>确认收到转账</Button>
              </div>
                
          </Panel.Body>
        </Panel>
        )
    }

    return (
      // <form onSubmit={(event) => {
      //   event.preventDefault()
      //   if(event.target.name === "accept"){
      //     this.props.acceptDelegate(requestor);
      //   }
      //   else{
      //     this.props.clickReturn();
      //   }
      // }}>
      //   <div className='form-group'>
      //     <label>查询结果</label>
      //     <div>
      //     <label>委托人</label>
      //     {/* <input type="text" ref={this.requestor}/> */}
      //     <input type="text" value={requestor}/>
      //     <label>送达地点</label>
      //     <input type="text" value={destination}/>
      //     <label>报酬</label>
      //     <input type="text" value={pay}/>
      //     </div>
      //   </div>
      //   <button name='accept' type='submit' className='btn btn-primary'>接受委托</button>
      //   <button name='return' type='submit' className='btn btn-primary'>返回</button>
      // </form>
      <Panel bsStyle="success" id="querypanel">
      <Panel.Heading>
      <Panel.Title componentClass="h3">查询结果</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
      <div>
        <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>序号</th>
            <th>委托人</th>
            <th>送达地点</th>
            <th>报酬</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{requestor}</td>
            <td>{destination}</td>
            <td>{pay}</td>
            <td><Button onClick={(event) => {
              this.props.acceptDelegate(requestor);
            }} className='btn btn-primary'>接受委托</Button></td>
          </tr>
          
          { <tr>
            <td>2</td>
            <td>0x007256C0070e34Fb03669c07860FE8A1f07009Ce</td>
            <td>至善园2号</td>
            <td>2</td>
            <td><Button onClick={(event) => {
              this.props.acceptDelegate(requestor);
            }} className='btn btn-primary'>接受委托</Button></td>
          </tr> */}

          { <tr>
            <td>3</td>
            <td>0x95a8d5DDF846306AFF31171a465632EF16Ab4D68</td>
            <td>至善园4号</td>
            <td>5</td>
            <td><Button onClick={(event) => {
              this.props.acceptDelegate(requestor);
            }} className='btn btn-primary'>接受委托</Button></td>
          </tr>

           <tr>
            <td>4</td>
            <td>0xc4f40c9B147648cE42be1529A3DFb9e1d2e7cA88</td>
            <td>格致园6号</td>
            <td>8</td>
            <td><Button onClick={(event) => {
              this.props.acceptDelegate(requestor);
            }} className='btn btn-primary'>接受委托</Button></td>
          </tr>
          
          <tr>
            <td>5</td>
            <td>0x765C7BE4Da51B55d1a8A94ff9d16fD3ADa7A9477</td>
            <td>明德园8号</td>
            <td>6</td>
            <td><Button onClick={(event) => {
              this.props.acceptDelegate(requestor);
            }} className='btn btn-primary'>接受委托</Button></td>
          </tr> }
        </tbody>
      </Table>
      <div id="returnbutton">
      <Button onClick={(event) => {
          this.props.clickReturn()
        }} className='btn btn-primary btn-lg'>返回</Button>
      </div>
      </div>
      </Panel.Body>
      </Panel>
     
    )
  }
}

export default AcceptForm