
// ===================================================================
// 監聽智能合約event
let Web3 = require('web3');
const MongoClient =require('mongodb').MongoClient;
const url ="mongodb://localhost:27017/";
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}
var contractAdress="0x4e8e2b60354fe7008a05142e8657d82B120F0515";
var contractAbi={
    "abi" : [
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "etherValue",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwner",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getCoinBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getBankBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getOwner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "coinValue",
                    "type": "uint256"
                }
            ],
            "name": "transferCoin",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "coinValue",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "etherValue",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "kill",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "deposit",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "coinValue",
                    "type": "uint256"
                }
            ],
            "name": "buy",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "DepositEvent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "WithdrawEvent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "TransferEvent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "MintEvent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "BuyCoinEvent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "TransferCoinEvent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "oldOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "timestamp",
                    "type": "uint256"
                }
            ],
            "name": "TransferOwnerEvent",
            "type": "event"
        }
    ],
    "bytecode" : "0x6080604052600080546001600160a01b031916331790556108ae806100256000396000f3fe60806040526004361061009c5760003560e01c80638dde60fa116100645780638dde60fa1461016d578063a0712d68146101a6578063a9059cbb146101d0578063cbf0b0c014610209578063d0e30db01461023c578063d96a094a146102445761009c565b80632e1a7d4d146100a15780634fb2e45d146100cd57806356fbd78f146101005780637b83b50b14610127578063893d20e81461013c575b600080fd5b3480156100ad57600080fd5b506100cb600480360360208110156100c457600080fd5b503561026e565b005b3480156100d957600080fd5b506100cb600480360360208110156100f057600080fd5b50356001600160a01b0316610364565b34801561010c57600080fd5b50610115610415565b60408051918252519081900360200190f35b34801561013357600080fd5b50610115610428565b34801561014857600080fd5b5061015161043b565b604080516001600160a01b039092168252519081900360200190f35b34801561017957600080fd5b506100cb6004803603604081101561019057600080fd5b506001600160a01b03813516906020013561044a565b3480156101b257600080fd5b506100cb600480360360208110156101c957600080fd5b503561052b565b3480156101dc57600080fd5b506100cb600480360360408110156101f357600080fd5b506001600160a01b0381351690602001356105e2565b34801561021557600080fd5b506100cb6004803603602081101561022c57600080fd5b50356001600160a01b03166106c3565b6100cb610722565b34801561025057600080fd5b506100cb6004803603602081101561026757600080fd5b503561077a565b33600090815260016020526040902054670de0b6b3a76400008202908111156102de576040805162461bcd60e51b815260206004820152601c60248201527f796f75722062616c616e63657320617265206e6f7420656e6f75676800000000604482015290519081900360640190fd5b604051339082156108fc029083906000818181858888f1935050505015801561030b573d6000803e3d6000fd5b5033600081815260016020908152604091829020805485900390558151858152429181019190915281517f5bb95829671915ece371da722f91d5371159095dcabf2f75cd6c53facb7e1bab929181900390910190a25050565b6000546001600160a01b031633146103b7576040805162461bcd60e51b81526020600482015260116024820152703cb7ba9030b932903737ba1037bbb732b960791b604482015290519081900360640190fd5b600080546001600160a01b038381166001600160a01b03198316811790935560408051428152905191909216929183917f587a4fcff87b7be11c779eb502f8b2584f996387d8b8cda0e5113fef424f73169181900360200190a35050565b3360009081526002602052604090205490565b3360009081526001602052604090205490565b6000546001600160a01b031690565b33600090815260026020526040902054670de0b6b3a76400008202908111156104ba576040805162461bcd60e51b815260206004820152601d60248201527f636f696e2062616c616e63657320617265206e6f7420656e6f75676821000000604482015290519081900360640190fd5b336000818152600260209081526040808320805486900390556001600160a01b038716808452928190208054860190558051868152429281019290925280519293927f941d755df54ad0234b406209d0c923107cabf6d4f1ce335b8ae5d89d6a28c2d29281900390910190a3505050565b6000546001600160a01b0316331461057e576040805162461bcd60e51b81526020600482015260116024820152703cb7ba9030b932903737ba1037bbb732b960791b604482015290519081900360640190fd5b336000818152600260209081526040918290208054670de0b6b3a764000086029081019091558251858152429281019290925282519093927f8069ef4945469d029cc32e222031bccdc99b2eaaf4ee374cd268012f7ddee907928290030190a25050565b33600090815260016020526040902054670de0b6b3a7640000820290811115610652576040805162461bcd60e51b815260206004820152601c60248201527f796f75722062616c616e63657320617265206e6f7420656e6f75676800000000604482015290519081900360640190fd5b336000818152600160209081526040808320805486900390556001600160a01b038716808452928190208054860190558051868152429281019290925280519293927fbabc8cd3bd6701ee99131f374fd2ab4ea66f48dc4e4182ed78fecb0502e44dd69281900390910190a3505050565b6000546001600160a01b03163314610716576040805162461bcd60e51b81526020600482015260116024820152703cb7ba9030b932903737ba1037bbb732b960791b604482015290519081900360640190fd5b806001600160a01b0316ff5b336000818152600160209081526040918290208054349081019091558251908152429181019190915281517fad40ae5dc69974ba932d08b0a608e89109412d41d04850f5196f144875ae2660929181900390910190a2565b33600090815260016020526040902054670de0b6b3a76400008202908111156107ea576040805162461bcd60e51b815260206004820152601e60248201527f65746865722062616c616e63657320617265206e6f7420656e6f756768210000604482015290519081900360640190fd5b3360008181526001602090815260408083208054869003905582546001600160a01b03908116845281842080548701905584845260028352818420805487019055835416835291829020805485900390558151858152429181019190915281517f4c5ad1aea676c1e1613de5416105424342b84655de046903409dea58418bedff929181900390910190a2505056fea265627a7a723158202dbfcde4ceb83063f45a79291bbea198f5186c927fe65631422fc64a5e088ee564736f6c634300050b0032"
};

let Mycontract = new web3.eth.Contract(contractAbi ,contractAdress);
ListenEvent();
function ListenEvent(){
    console.log("Listening...");

    let myEvent =Mycontract.events.TransferEvent({
        filter:{},
        fromBlock:"latest"
    },function(error,event){})
    .on('data',function(event){
        console.log(event.returnValues);
    })
    .on('changed',function(event){
        // remove event from local database
    })
    .on('error',console.error)
};

// a();
// function a(){
// 	con.getConnection(function (err, connection) {
// 		if (err) throw err;
// 		console.log("Connected!");
// 		connection.query('SELECT * from event' , function (err, result) {
// 		  if (err) {
// 			console.log(err);
// 		  }else{
// 			console.log(JSON.stringify(result[0].Content));
// 			console.log("Saved to EventStore!");
// 		  } 
		  
// 		});
// 	});
// }

// ListenEvent();
// function ListenEvent(){
// 	// console.log(lastBlockNumber);
// 	console.log("Listening...");

// 	var myEvent = MyContract.events.TransferEvent({
// 		filter:{},
// 		fromBlock: "latest"
// 	}, function(error, event){})
// 	.on('data', function(event){
// 		// console.log(event.returnValues);
// 		var Symbol=event.returnValues["Symbol"];
// 		var tokenID=event.returnValues["tokenID"];
// 		var buyerID=event.returnValues["buyerID"];
// 		var sellerID=event.returnValues["sellerID"];
// 		var closingPrice=event.returnValues["closingPrice"];
// 		var volume=event.returnValues["volume"];
// 		var blockNumber=event.returnValues["blockNumber"];
// 		var timestamp=event.returnValues["timestamp"];
	
// 		console.log("Symbol:" + Symbol);
// 		console.log("tokenID:" + tokenID);
// 		console.log("buyerID:" + buyerID);
// 		console.log("sellerID:" + sellerID);
// 		console.log("closingPrice:" + closingPrice);
// 		console.log("volume:" + volume);
// 		console.log("blockNumber:" + blockNumber);
// 		console.log("timestamp:" + timestamp);
// 		console.log("=======================");

// 		var jsonData = {};
// 		jsonData["Symbol"]=Symbol;
// 		jsonData["tokenID"]=tokenID;
// 		jsonData["buyerID"]=buyerID;
// 		jsonData["sellerID"]=sellerID;
// 		jsonData["closingPrice"]=closingPrice;
// 		jsonData["volume"]=volume;
// 		jsonData["blockNumber"]=blockNumber;
// 		jsonData["timestamp"]=timestamp;
		
// 		console.log(jsonData);
// 		console.log("*");
// 		console.log(JSON.stringify(jsonData));
// 		jsonData=JSON.stringify(jsonData);
		
// 		con.getConnection(function (err, connection) {
// 			if (err) throw err;
// 			console.log("Connected!");
// 			var event  = {ContractClass: Symbol, Content: jsonData,Timestamp:timestamp};
// 			connection.query('INSERT INTO event SET ?', event , function (err, result) {
// 			  if (err) {
// 				console.log(err);
// 			  }else{
// 				console.log("Saved to EventStore!");
// 			  } 
			  
// 			});
// 		});
// 	})
// 	.on('changed', function(event){
// 		// remove event from local database
// 	})        
// 	.on('error', console.error);
// };