import React from 'react'
import {Form,FormGroup,Col,ControlLabel,FormControl,Button,Panel} from 'react-bootstrap'
class ReleaseForm extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      // <form onSubmit={(event) => {
      //   event.preventDefault()
      //   this.props.releaseDelegate(event.target.source.value,event.target.destination.value,event.target.code.value,event.target.pay.value)
      // }}>
      //   <div className='form-group'>
      //     {/* <select ref={(input) => this.source = input} class='form-control'>
      //       <option value="1">1 eth</option>
      //       <option value="2">2 eth</option>
      //       <option value="3">3 eth</option>
      //     </select> */}
      //     <label>取货地点</label>
      //     <input
      //       name="source"
      //       type="string"
      //       value={this.source} required/>
          
      //     <label>收货地点</label>
      //     <input
      //       name="destination"
      //       type="string"
      //       value={this.destination} required/>

      //     <label>取件码</label>
      //     <input
      //       name="code"
      //       type="string"
      //       value={this.code} required/>

      //     <label>报酬</label>
      //     <input
      //       name="pay"
      //       type="number"
      //       value={this.pay} required placeholder="报酬至少为1"/>

      //   </div>
      //   <button type='submit' className='btn btn-primary'>发布委托</button>
      //   <hr />
      // </form>
      <Panel bsStyle="primary" id="releasepannel">
      <Panel.Heading>
        <Panel.Title componentClass="h3">新建一个委托</Panel.Title>
      </Panel.Heading>
      <Panel.Body>
      <Form horizontal onSubmit={(event) => {
          event.preventDefault()
          this.props.releaseDelegate(event.target.source.value,event.target.destination.value,event.target.code.value,event.target.pay.value)
        }}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            取货地点
          </Col>
          <Col sm={10}>
            <FormControl name="source" type="string" placeholder="取货地点（如“丰巢”，”蜜蜂箱“等）" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            收货地点
          </Col>
          <Col sm={10}>
            <FormControl name="destination" type="string" placeholder="收货地点（如“至善园2号”，”公教楼“等）" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            取件码
          </Col>
          <Col sm={10}>
            <FormControl name="code" type="password" placeholder="取件码" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} sm={2}>
            报酬
          </Col>
          <Col sm={10}>
            <FormControl name="pay" type="number" placeholder="报酬（至少为1）" />
          </Col>
        </FormGroup>

      <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
        <div class="btn-group mr-2" role="group" id="releasebutton">
          <Button type="submit" className='btn btn-success btn-lg'>发起委托</Button>
        </div>  
        <div class="btn-group mr-2" role="group" id="releasebutton">
        <Button onClick={(event) => {
            this.props.clickReturn()
          }} className='btn btn-primary btn-lg'>返回</Button>
        </div>
      </div>
      </Form>
      </Panel.Body>
    </Panel>
    )
  }
}

export default ReleaseForm