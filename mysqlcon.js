

const MongoClient =require('mongodb').MongoClient;
const url ="mongodb://localhost:27017/";
// 建立連線
for(let i=10;i<=20;i++){
    

MongoClient.connect(url,{useNewUrlParser: true},function(err,db){
    if(err) throw err;
    let dbschema =db.db("CQRS");
    let myobj=[
        {
        Formaccount: "owen",
        Toaccount:"johnny",
        volume : 2,
        type: 'transfer' ,
        blockNumber: i,
        timestamp:9049092039+i
    }
    ];
    dbschema.collection("blockchain").insertMany(myobj,(err,res)=>{
        if (err) throw err;
        console.log("插入文件數量為"+ i);
    })
    // console.log('mongodb is running !');
    db.close();
})
};