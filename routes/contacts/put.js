var mongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/contacts';
var tb = 'list';

module.exports = function(req, res, next){
	mongoClient.connect(DB_CONN_STR,function(err,db){
		var collection = db.collection(tb);
		var whereStr = {"uid": req.body.uid};
		var updateStr = {$set:{
			name: req.body.name,
			sex: req.body.sex,
			schoolId: req.body.schoolId,
			proclass: req.body.proclass,
			phone: req.body.phone,
			birth: req.body.birth
		}};
		collection.update(whereStr, updateStr, function(err,result){
			if(err || result.result.nModified === 0){
				console.log("Error:" + err);
				res.json({
					code: 500,
					msg: 'Error'
				});
			} else {
				res.json({
					code: 200,
					msg: 'success'
				});
			}
			db.close();
		});
	});
}