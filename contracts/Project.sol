pragma solidity ^0.5.0;

contract Project {

    // 委托人
    address payable public delegator;
    // 发送请求者
    address payable public requestor;
    // 交易状态
    enum State { Created, Locked, Inactive }
    // 所有委托信息
    mapping(string => address[]) delegateInfo;
    // 所有委托的交易状态
    mapping(address => State) delegateState;
    // 委托人的送货地点
    mapping(address => string) destinationInfo;
    // 委托信息的具体交易码，进行权限控制访问
    mapping (address => string) secretInfo;
    // 发起者支付的金额
    mapping (address => uint) valueInfo;
    // 委托规定的时间
    uint public txLimit;

    uint32 delegationCount = 0;

    struct Delegation{
         // 委托人
        address payable delegator;
        // 发送请求者
        address payable requestor;
        uint pay;
        string code;
        string source;
        string destination;
        State state;
    }
    mapping (uint => Delegation) delegateList;

    // 判断委托信息是否存在
    // modifier OnlyOnBoard(string s){
    //     require(delegateInfo[s].length!=0, "There is no relative delegate info");
    //     _;
    // }
    function getdelegator(uint id)
        public 
        view 
        returns(address)
    {
        return delegateList[id].delegator;
    }

    function getrequestor(uint id)
        public 
        view 
        returns(address)
    {
        return delegateList[id].requestor;
    }

    function getCode(uint id)
        public 
        view 
        returns(string memory)
    {
        return delegateList[id].code;
    }

    function getSource(uint id)
        public 
        view 
        returns(string memory)
    {
        return delegateList[id].source;
    }

    function getDestination(uint id)
        public 
        view 
        returns(string memory)
    {
        return delegateList[id].destination;
    }

    function getPay(uint id)
        public 
        view 
        returns(uint)
    {
        return delegateList[id].pay;
    }

    function getDeleCount() 
        public 
        view 
        returns(uint)
    {
        return delegationCount;
    }

    modifier onlyAfter(uint _time) { 
        require(now > _time,"The tx has not beyond the time limit!"); 
        _; 
    }
    
    // 判断是否在交易的创建状态
    modifier inCreateState(State _state) {
        require(
            _state == State.Created,
            "Invalid state."
        );
        _;
    }

    // 判断是否在交易的锁定状态
    modifier inLockedState(State _state) {
        require(
            _state == State.Locked,
            "Invalid state."
        );
        _;
    }

    // 判断是否是请求者 
    modifier onlyRequestor(){
        require(msg.sender==requestor,"Only requestor can call this!");
        _;
    }

    modifier condition(bool _condition) {
        require(_condition,"You should first pay the deposit for 5 ether!");
        _;
    }

    // 发布委托信息
    // delegate:取货地点,destination:送货地点,secret:取件码
    function release(string memory delegate,string memory destination,string memory secret) 
        public 
        payable
    {
        // 委托人支付的金额必须大于1个以太币
        require(msg.value>=1 ether, "Value has to be greater than 1 ether.");
        valueInfo[msg.sender] = msg.value;
        delegateInfo[delegate].push(msg.sender);
        // 更改交易状态为初始
        delegateState[msg.sender] = State.Created;
        destinationInfo[msg.sender] = destination;
        secretInfo[msg.sender] = secret;

        delegationCount = delegationCount + 1;
        delegateList[delegationCount].requestor = msg.sender;
        delegateList[delegationCount].pay = msg.value;
        delegateList[delegationCount].code =  secret;
        delegateList[delegationCount].source = delegate;
        delegateList[delegationCount].destination = destination;
        delegateList[delegationCount].state = State.Created;
    }
    

    // 根据委托信息查询请求者和送货地点
    function delegate(string memory s) 
        public 
        view 
        // inCreateState(delegateState[delegateInfo[s][0]])
        returns(address,string memory,uint){
        address res;
        for(uint i = 0;i< delegateInfo[s].length;i++){
            res = delegateInfo[s][i];
            // 保证交易处于初始状态
            if(delegateState[delegateInfo[s][i]]==State.Created){
                // 返回送货地点信息,发起者地址,和支付金额
                return (res,destinationInfo[res],valueInfo[res]/(10**18));
            }
        }
        delete res;
        return (res,"No relative delegate infomation",0);
    }
    
    function getSecretInfo(address addr) 
        public 
        view
        returns(string memory)
    {
        return secretInfo[addr];
    }
    
    // function accept(uint id)
    //     public
    //     payable
    //     inCreateState(delegateList[id].state)
    //     returns(string memory)
    // {
    //     require(msg.sender!=delegateList[id].requestor, "The delegator can not be requestor itself!");
    //     // 交易计时开始
    //     txLimit = now + 60;
    //     // 更改交易状态，不许反悔
    //     delegateList[id].state = State.Locked;
    //     delegateList[id].delegator = msg.sender;
    //     // 返回取件码
    //     return delegateList[id].code;
    // }

    //  function confirmed(uint id) 
    //     public 
    //     payable
    //     inLockedState(delegateList[id].state)
    // {   
    //     // 更新交易状态为完成
    //     delegateList[id].state = State.Inactive;
    //     // 将合约账户的余额返回给委托人，包括押金和请求者的支付金额
    //     delegator = delegateList[id].delegator;
    //     delegator.transfer(valueInfo[msg.sender]+5 ether);
    // }

    // 接受请求者的委托请求，并得到具体取件码
    function acceptDelegate(address payable addr) 
        public 
        // payable表示该动作需要支付以太币，支付的数量会累加到合约账户的余额。
        payable
        // 其他人没有接受委托
        inCreateState(delegateState[addr])
        // 押金
        condition(msg.value == 5 ether)
        returns(string memory)
    {
        require(msg.sender!=addr, "The delegator can not be requestor itself!");
        delegator = msg.sender;
        requestor = addr;
        // 交易计时开始
        txLimit = now + 60;
        // 更改交易状态，不许反悔
        delegateState[addr] = State.Locked;
        // 返回取件码
        // return secretInfo[addr];
        return getSecretInfo(addr);
    }
    
    // 请求者确认收货
    function confirmReceived() 
        public 
        payable
        onlyRequestor()
        inLockedState(delegateState[requestor])
    {   
        // 更新交易状态为完成
        delegateState[requestor] = State.Inactive;
        // 将合约账户的余额返回给委托人，包括押金和请求者的支付金额
        delegator.transfer(valueInfo[msg.sender]+5 ether);
    }
 
    // 发起者未收到货
    function confirmNotReceived()
        public
        payable
        onlyRequestor()
        inLockedState(delegateState[requestor])
        onlyAfter(txLimit)
    {
        // 更新交易状态为完成
        delegateState[requestor] = State.Inactive;
        // 当交易超时时，发起者得到委托人的押金和之前付的value
        requestor.transfer(valueInfo[msg.sender]+5 ether);
    }

    function getContractBal() public view returns(uint) {
        return address(this).balance;
    }

    function getDelegation(string memory s) public view returns(uint){
        address res;
        for(uint i = 0;i< delegateInfo[s].length;i++){
            res = delegateInfo[s][i];
            // 保证交易处于初始状态
            if(delegateState[delegateInfo[s][i]]==State.Created){
                // 返回送货地点信息,发起者地址,和支付金额
                return valueInfo[res]/(10**18);
            }
        }
        delete res;
        return 0;
    }

    function getDelegator() public view returns(address){
        return delegator;
    }

    function getRequestor() public view returns(address){
        return requestor;
    }
}
// user for test input
// "丰巢","至二","111"
// "丰巢","至三","222"
// "丰巢"   
