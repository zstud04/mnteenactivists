const connection = require('./db_connect')


class DB{
    constructor(db=connection){
        this.db=db;
    }

    async doQuery(queryToDo){
        let pro=new Promise((resolve,reject)=>{
            let query= queryToDo;
            this.db.query(query,function(err,result){
                if(err) throw err;
                resolve(result);
            });
        })
        return pro.then((val)=>{
            return val;
        })
    }
}

module.exports= DB