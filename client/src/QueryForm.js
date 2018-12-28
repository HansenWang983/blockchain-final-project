import React from 'react'
import {Button,Panel} from 'react-bootstrap'
class QueryForm extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
          <Panel bsStyle="primary" id="loginpanel">
            <Panel.Heading>
              <Panel.Title componentClass="h3">根据取货地点查询委托</Panel.Title>
            </Panel.Heading>
            <Panel.Body>

            <form onSubmit={(event) => {
              event.preventDefault()
              this.props.queryDelegate(event.target.source.value)
              }} >
              <div className='form-group' id="logininput">
              <label>取货地点</label>
              <input
              name="source"
              type="string"
              value={this.source}
              className="form-control"
              placeholder="取货地点"
              required />
              </div>
              <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
              <div class="btn-group mr-2" role="group" id="querybutton">
                <Button type='submit' className='btn btn-success'>查询委托</Button>
              </div>  
              <div class="btn-group mr-2" role="group" id="querybutton">
              <Button onClick={(event) => {
                  this.props.clickReturn()
                }} className='btn btn-primary'>返回</Button>
               </div>
               </div>

            </form>
            </Panel.Body>
          </Panel>
    )
  }
}

export default QueryForm