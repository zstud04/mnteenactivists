var DBModel=require('../db')
let database= new DBModel()

  
async function sqlReq(table) {
    let sql_info = await database.doQuery(`SELECT * FROM ${table}`)
    return sql_info
}
  

module.exports=sqlReq