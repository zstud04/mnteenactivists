var DBModel=require('../db')
let database= new DBModel()

const retrieveModules = () =>{
    return (req, res, next)=>{
        (async function(){
            let modules= await database.doQuery(`SELECT display_name FROM modules`)
            //console.log(modules)
            res.locals.modules=modules
        })();

        next()
    }
}

module.exports=retrieveModules;