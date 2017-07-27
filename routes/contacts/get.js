var getData = require('../../tools/db').getData;
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/contacts';

module.exports = function(req, res, next){
    var page;
    
    if ("page" in req.query){
		page = parseInt(req.query.page); 
		if (Number.isNaN(page)){
			page = 0; 
		} else {
			page = page - 1; 
		}
	} else {
		page = 0;
    }
    

    MongoClient.connect(DB_CONN_STR, function(err, db) {
		getData(db, page, function(result) {
			res.json({
				code:200,
				data:result,
				msg:'成功'

			});
			db.close();
		});
	});

}



