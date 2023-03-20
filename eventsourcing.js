const MongoClient =require('mongodb').MongoClient;
const url ="mongodb://localhost:27017/";

//==========================================================
// 從DB中取得event
function GetEvents(downer,upper){

MongoClient.connect(url, function(err,db){
if(err)throw err;
let dbo =db.db("CQRS");
console.log("connected !");

let query={"$and": [{blockNumber:{$gte:downer},blockNumber:{$lte:upper}}]};
    
dbo.collection("blockchain").find(query).toArray(function(err,result){
    if(err) throw err;
    console.log(result);
   let data=[];
    data=JSON.parse(JSON.stringify(result));
     GenerateDaySnapshot(data);

    db.close();
    });

})
}
// ============================================================
// 取得事件回溯資料並產生snapshot，後存進另一個DB
function GenerateDaySnapshot(data){


let Quantity=data.reduce((Quantity,event)=>{
    if (isNaN(Quantity[event.Formaccount])){
        Quantity[event.Formaccount]=0;
    }
    if (isNaN(Quantity[event.Toaccount])){
        Quantity[event.Toaccount]=0;
    }
    Quantity[event.Formaccount]= Quantity[event.Formaccount]-event.volume;
    Quantity[event.Toaccount]=Quantity[event.Toaccount]+event.volume;
   
    return Quantity;
    
},{});


saveDaysnapedshot(Quantity);
}


function saveDaysnapedshot(Quantity){
console.log(Quantity);
    MongoClient.connect(url,{useNewUrlParser: true},function(err,db){
        if(err) throw err;
        let dbschema =db.db("Querystore");
        let myobj=[Quantity];
        dbschema.collection("querycache").insertMany(myobj,(err,res)=>{
            if (err) throw err;
            console.log("插入文件數量為"+1);
        })
        // console.log('mongodb is running !');
        db.close();
    });
}
// ========================================================================
// 生成特定時間點的snapshot 目前是以blocknumber為主
GetSnapshotAndEvent(0,9);

function GetSnapshotAndEvent(downer,upper){
    GetEvents(downer,upper);
}


// ==============================================================================
var TestEvent={
    Formaccount: "owen",
    Toaccount:"johnny",
    volume : 2,
    type: 'transfer' ,
    blockNumber: 94,
    timestamp:9049092039
};
//生成即時Snapshot 只要有Event就更新
function GetLatestEvent(ContractClass,LatestEvent){
      con.getConnection(function (err, connection) {
        if (err) throw err;
        console.log("Connected!");
        //先撈取最新的state Snapshot
        connection.query('SELECT * FROM eventstore.state WHERE state.ContractClass=? and state.Timestamp=(SELECT MAX(state.Timestamp) FROM eventstore.state);' ,ContractClass , function (err, result) {
          if (err) {
            console.log(err);
          }else{
            var LatestStateSnapshot=JSON.parse(result[0].Content);
            var EventObject=JSON.parse(JSON.stringify(LatestEvent));
            //如果沒有最新的state
            if(LatestStateSnapshot.length==0){
              var StateSnapshot={};
              StateSnapshot[EventObject.buyerID]=parseInt(EventObject.volume);
              StateSnapshot[EventObject.sellerID]=parseInt(EventObject.volume)*-1;
              delete StateSnapshot["platform"];
              //寫入State table
              SaveStateSnapshot(EventObject.Symbol,StateSnapshot);
            }else{
              var StateSnapshot={};
              //將最新的State Load進StateSnapshot
              for(var key in LatestStateSnapshot){
                StateSnapshot[key]=LatestStateSnapshot[key];
              }
              //加入event(以下為業務邏輯)
              if(isNaN(StateSnapshot[EventObject.buyerID])){
                StateSnapshot[EventObject.buyerID]=0;
              }
              if(isNaN(StateSnapshot[EventObject.sellerID])){
                StateSnapshot[EventObject.sellerID]=0;
              }
              StateSnapshot[EventObject.buyerID]=StateSnapshot[EventObject.buyerID]+parseInt(EventObject.volume);
              StateSnapshot[EventObject.sellerID]=StateSnapshot[EventObject.sellerID]+parseInt(EventObject.volume);
              delete StateSnapshot["platform"];

              //寫入State table
              SaveStateSnapshot(EventObject.Symbol,StateSnapshot);
            }

          } 
        });
      });
}

function SaveStateSnapshot(Symbol,Data){
  jsonData=JSON.stringify(Data);
  var Now_Timestamp = Date.now();
  var sql  = {ContractClass: Symbol, Content: jsonData,Timestamp:Now_Timestamp};

  // console.log(Now_Timestamp);
  con.getConnection(function (err, connection) {
      if (err) throw err;
      console.log("Connected!");
      connection.query('INSERT INTO eventstore.state SET ?',sql , function (err, result) {
        if (err) {
          console.log(err);
        }else{
          console.log("產生State Snapshot成功");
        } 
        
      });
  });
}