var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/contacts';

var insertData = function(db, data, cb){

    var collection = db.collection('list');

    collection.insert(data, function(err, result){
        if(err){
            console.log('Error' + err);
            return;
        }
        cb(result);
    })

}

var getData =function(db, page, cb){
    
    var collection = db.collection('list');

    var whereStr = {"name":{$gte:null}};
    collection.find(whereStr).limit(10).skip(page*10).toArray(function(err, result) {
        if(err)
        {
        console.log('Error:'+ err);
        return;
        }     
        cb(result);
    });


}


module.exports = {
    insertData:insertData,
    getData:getData
}
