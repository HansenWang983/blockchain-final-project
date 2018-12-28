import React, { Component } from "react";
import TruffleContract from 'truffle-contract'
import ProjectContract from "./contracts/Project.json";
import getWeb3 from "./utils/getWeb3";
import Web3 from "web3"
import Content from './Content'
import "./App.css";

class App extends Component {
  constructor(props){
    super(props); 
    this.state = {
      release : false,
      querying : false,
      accept : false,
      message: '',
      loading : true,
      delegateInfo : '',
      code : '',
      choice : '',
      loginOrReg : '',
      hasLogined : false,
      delegator : '',
      requestor : '',
    }

    // this.web3 = getWeb3();
    if (typeof this.web3 != 'undefined') {
      this.web3Provider = Web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
    }

    this.web3 = new Web3(this.web3Provider)
    // this.web3.eth.getAccounts().then((accounts) => {
    //   console.log(accounts)
    //   this.accounts = accounts;
    // });
    this.Contract = TruffleContract(ProjectContract)
    this.Contract.setProvider(this.web3Provider)
    this.account = '';

    this.releaseDelegate = this.releaseDelegate.bind(this);
    this.queryDelegate = this.queryDelegate.bind(this);
    this.acceptDelegate = this.acceptDelegate.bind(this);
    this.userChoice = this.userChoice.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.userRegister = this.userRegister.bind(this);
    this.loginOrRegChoice = this.loginOrRegChoice.bind(this);
    this.confirmReceived = this.confirmReceived.bind(this);
    this.clickReturn = this.clickReturn.bind(this);
  }
  

  componentDidMount = async () => {
      try {
        
        // Get the contract instance.
        // const networkId = await web3.eth.net.getId();
        // const deployedNetwork = ProjectContract.networks[networkId];
        // const instance = new web3.eth.Contract(
        //     ProjectContract.abi,
        //     deployedNetwork && deployedNetwork.address,
        // );

        var contractAddr = "0x895e850A56ddb080dd1b5eE2ed2A2604f34e2Fcf";
        this.Contract.at(contractAddr).then((instance) => {
          console.log(instance)
          this.contractInstance=instance
          this.setState({loading:false})

          this.contractInstance.getDelegator().then((res)=>{
            this.setState({ delegator : res});
          })

          this.contractInstance.getRequestor().then((res)=>{
            this.setState({ requestor : res});
          })

        //  this.web3.eth.getAccounts().then(e => {let firstAcc=e[0]; console.log(firstAcc)})
        //  this.setState({gambler:this.web3.eth.accounts[1]})
        })
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    };

    userLogin(addr,password){
      // console.log(addr,password);
      this.web3.eth.personal.unlockAccount(addr, password,600,
        function(err, _) {
          if (err) {
           alert("密码错误");
           return;
          }
          else{
            alert("登陆成功");
          } 
        }).then((res) => {
          this.account = addr;
          this.setState({ hasLogined : true});
        });
      // console.log(this.account);
    }

    userRegister(password){
      // console.log(password);
      this.web3.eth.personal.newAccount(password).then((addr) =>{
        console.log(addr);
        this.account = addr;
        this.setState({ hasLogined : true});
        alert("注册成功");
      })
    }
    releaseDelegate(source,destination,code,pay){
        try {
          this.setState({ message: '发起委托中，请稍后...'});
          
          // const accounts = await web3.eth.getAccounts();
          // console.log(this.contractInstance.methods.release)
          this.web3.eth.getBalance(this.account)
            .then( (bal) => {
              console.log(bal);
              if(this.web3.utils.toWei(bal, 'ether') < pay){
                this.setState({ message: '发起失败'});
                alert("您的余额不足，无法发起委托");
              }
              else{
                this.contractInstance.release(source,destination,code,{
                  from:this.account,
                  value: this.web3.utils.toWei(pay, 'ether')
                }).then( (res) => {
                  console.log(res);
                  this.setState({ message: '发起成功！',release : true});
                  alert("发起委托成功");
                });
              }
              this.setState({ choice: ''});
          })
          // setTimeout(() => {
          //   window.location.reload();
          // }, 10000);
        } catch (err) {
          console.error(err);
          this.setState({ message: err.message || err.toString(), loading: false });
        }
    };

    queryDelegate(source){
      try {
        this.setState({ message: '查询委托中，请稍后...'});

        // this.queryResult = new Array();  
        // this.contractInstance.getDeleCount().then((res)=>{
        //   this.queryCount = res.toNumber();
        // })
        // console.log(this.queryCount)
        // for(var i = 0 ; i<this.queryCount;i++){
        //   this.contractInstance.getSource(i).then((res)=>{
        //     console.log(res);
        //     if(res === source){
        //       this.dic = new Array();
        //       this.contractInstance.getrequestor(i).then((res)=>{
        //         this.dic["requestor"] = res;
        //       })
        //       this.contractInstance.getDestination(i).then((res)=>{
        //         this.dic["destination"] = res;
        //       })
        //       this.contractInstance.getPay(i).then((res)=>{
        //         this.dic["pay"] = res;
        //       })
        //       this.queryResult.push(this.dic);
        //     }
        //   })
        // }
        // console.log(this.queryResult);

        
        this.contractInstance.getDelegation(source).then((res)=>{
          if(res!=0){
            this.contractInstance.delegate(source,{
              from : this.account
            }).then(res => {
              // console.log(res);
              this.setState({ delegateInfo: res});
            });
            this.setState({ message: '查询委托成功！',querying : true});
            alert("查询委托成功");
          }
          else{
            this.setState({ message: '查询委托失败'});
            alert("未找到相关委托信息，请稍后重试或更改取货地点");
          }
        })
        
      }catch(err){
        console.log(err);
        this.setState({ message: err.message || err.toString(), loading: false });
      }
    }

    acceptDelegate(addr){
      try {
        this.setState({ message: '接受委托中，请稍后...'});

        // console.log(addr)
        this.web3.eth.getBalance(this.account)
        .then( (bal) => {
          console.log(bal);
          if(this.web3.utils.toWei(bal, 'ether') < 5){
            this.setState({ message: '接受委托失败'});
            alert("您的余额不足，无法支付 5 ether 押金");
          }
          if(addr === this.account){
            this.setState({ message: '接受委托失败'});
            alert("接收委托者不能为发起者自己");
          }
          else{
            this.contractInstance.acceptDelegate(addr,{
              from : this.account,
              value: this.web3.utils.toWei('5', 'ether')
            }).then(receipt => {
              // console.log(receipt);
              this.contractInstance.getSecretInfo(addr).then(res => {
                // console.log(res);
                this.setState({message: '接受委托成功', code: res,accept : true});
              })
            });
          }
        });
        
      }catch(err){
        console.log(err);
        this.setState({ message: err.message || err.toString(), loading: false });
      }
    }

    async confirmReceived(addr){
      if(addr === ''){
        alert("暂无查询结果");
      }
      else{
        if(addr === this.state.requestor){
          this.contractInstance.confirmReceived({
            from : this.account
          });
          this.contractInstance.getDelegator().then((res)=>{
            this.setState({ delegator : res});
          })
          this.setState({ 
            release : false,
            querying : false,
            accept : false,
            message : '',
            requestor : '', 
          });
          alert("已收货，完成交易");
        }
        else if(addr === this.state.delegator){
          alert("完成交易，收到转账");
          this.setState({ 
            release : false,
            querying : false,
            accept : false,
            message : '',
            delegateInfo : '',
            delegator : '',
          });
        }
      }
      await this.setState({ choice : ''});
    }

    clickReturn(){
      this.setState({ choice: '',delegateInfo : '',querying : false});
    }


    userChoice(choice){
      this.setState({ choice: choice});
    }

    loginOrRegChoice(choice){
      this.setState({ loginOrReg: choice});
    }
  // async handleInputChange(event){ 
  //   const target = await event.target;
  //   const name = target.name;
  //   var value = target.value;
  //   this.setState((prevState, props) => ({
  //     name: value
  //   }));
  //   // console.log(this.state.name);
  // }

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>;
    // }

    return (
      <div className="App">
        <div className='col-lg-12 text-center' >
          {/* <h1>请选择</h1> */}
          <Content 
          release={this.state.release}
          releaseDelegate={this.releaseDelegate}
          querying = {this.state.querying}
          queryDelegate = {this.queryDelegate}
          delegateInfo = {this.state.delegateInfo}
          acceptDelegate = {this.acceptDelegate}
          accept = {this.state.accept}
          code = {this.state.code}
          choice = {this.state.choice}
          userChoice = {this.userChoice}
          hasLogined = {this.state.hasLogined}
          userLogin = {this.userLogin}
          loginOrReg = {this.state.loginOrReg}
          userRegister = {this.userRegister}
          loginOrRegChoice = {this.loginOrRegChoice}
          delegator = {this.state.delegator}
          requestor = {this.state.requestor}
          confirmReceived = {this.confirmReceived}
          account = {this.account}
          clickReturn = {this.clickReturn}
          />
      </div>
    </div>
    );
  }
}

export default App;