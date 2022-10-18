const bodyParser= require("body-parser")
var DBModel=require('../db')

let database= new DBModel()

const createPage = () =>{
    return (req, res, next)=>{
        let {route, name, type, description} = req.body;
        var id;
        let json_obj={"Header":name, "sections":[], "data":[]};
        let json=JSON.stringify(json_obj);

        (async function(){
            let pageQuery=await database.doQuery(`SELECT id FROM pages ORDER BY id DESC LIMIT 1`)
            if(pageQuery.length==0){
                id=0;
            }else{
                id=pageQuery[0]["id"]+1
            }
            let pageInsert= await database.doQuery(`INSERT INTO pages (id, route, name, type, description, data) VALUES ('${id}', '${route}', '${name}','${type}', '${description}', '${json}')`)
            res.redirect(`/dashboard/page-edit/${route}`)
        })();
        
    }
};

module.exports=createPage;