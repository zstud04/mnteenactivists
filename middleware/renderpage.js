var DBModel=require('../db')
const ParsedData=require('../util/data_parse')
let database= new DBModel()


//render a page preview in the edit handler
const renderPage = () =>{
    return(req, res, next)=>{
        var route = req.params["route"];
        (async function(){
            let pageData= await database.doQuery(`SELECT json_extract(data, "$[0]") AS 'Data' FROM pages WHERE route='${route}'`)
            let data =JSON.parse(pageData[0]["Data"])
            
            //TODO: replace with new util functions
            const data_parse= new ParsedData(route)
            data["sections"]=data_parse["json"]

            res.render("admin/page_preview", {data:data, modules:res.locals.modules})
        })();

        

        // next()
    }
}

module.exports=renderPage;