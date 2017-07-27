var uuid = require('uuid');
var md5 = require('md5');
var insertData = require('../../tools/db').insertData;
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/contacts';

module.exports = function(req, res, next){
    var name = req.body.name;
    var sex = req.body.sex;
    var schoolId = req.body.schoolId;
    var proclass = req.body.proclass;
    var phone = req.body.phone;
    var shortphone = req.body.shortphone;
    var birth = req.body.birth;
    var uid = md5(uuid.v4());

    var a =[name, sex, schoolId, proclass, phone, shortphone, birth, uid];
    
    if(a.some(e => {
         return (e ==="" || typeof e ==='undefined')
         
    })){
        res.json({
            code:500,
            msg:'参数不符'
        });
        return ;
    }

    var data = [
        {
            name,
            sex,
            schoolId,
            proclass,
            phone,
            shortphone,
            birth,
            uid
        }
    ];

    MongoClient.connect(DB_CONN_STR, function(err, db) {
    insertData(db, data,  function(result) {
        db.close(); 

        res.json({
            code:200,
            msg:'成功插入'
        });

     });
  })


    

    
}