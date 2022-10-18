const dataLookup=require('./data_lookup')
const sqlReq = require('./sql_lookup')
const pug = require('pug')


class ParsedData{
    //retrieve json data for page
    constructor(page){
        this.page=page
        this.json= dataLookup[page]
        if(!this.json){
            this.json=""
        }
    }
   
    //return html for all modules wrapped inside header and footer, check JSON to see if page type is admin or public
    async compileModules(){
        var compiled_html=[]
        try{
            for(module of this.json["sections"]){
                var module_data= {...module}
                try{
                    if(module_data["sql-req"]=="shop"){
                        var sql_data=await sqlReq("shop")
                        module_data["shop"]=sql_data
                        for(var item of module_data["shop"]){
                            var s_item =String(item["price"]/100)
                            item["price_string"]="$"+s_item
                            item["url"]=`/shop/?id=${item["id"]}`
                        }
                           
                    }
                }catch{}
                compiled_html += pug.renderFile(`public/views/modules/${module["source"]}.pug`, module_data)
                console.log(module_data)
            }
        }
        catch{
            return "Error"
        }
       return compiled_html
    }

    //return raw html for a specific module
    compileModule(module_id){
        let module_data= this.json["sections"][module_id]
        let module_source=module_data["source"]
        return pug.renderFile(`public/views/modules/${module_source}.pug`, {...module_data})
    }

    //return json object that can be used to create module obj
    retrieveModule(module_id){
        let module=this.json["sections"][module_id]
        return {"name":module["source"],"components":module["components"],"json":module}
        
    }

    //return list of json objects that can be used to create modules
    retrieveModules(){
        var compile_modules=[]
        try{
            for(module of this.json["sections"]){
                compiled_modules.push({"name":module["source"],"components":module["components"],"json":module})
            }
        }
        catch{
            return null
        }
        
        return compiled_modules
    }

}

module.exports=ParsedData