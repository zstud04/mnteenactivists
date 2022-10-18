var DBModel=require('../db')
let database= new DBModel()
//req.query.module
const getComponents = () =>{
    return (req, res, next)=>{
        //TODO use Promise instead?
        (async function(){
            let components = await database.doQuery(`SELECT * FROM modules m join crossref_modules cm on m.id = cm.module_id join components c on cm.component_id = c.id WHERE m.display_name = '${req.query["module"]}'`)
            
            //TODO use cross_ref list to lookup components
            //TODO make boolean for has_subcomponents?
            res.status(200).send(components)
           
        })()
    }
}

module.exports=getComponents