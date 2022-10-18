
class Module {

    constructor(name, components, index, container, json={}){
        this.components=components
        this.fields=[]
        this.name=name;
        this.json=json
        this.dynamic_components=[]
        this.source=this.components[0].source
        this.path=this.components[0].path
        this.dataid=index
        this.container=container
        
        this.html_preview=""

        //check if the module is being created for the first time(if json length is 0)
        if(Object.keys(this.json).length==0){
            this.initialCreate=true;
            this.compileJSON()
        }else{
            this.initialCreate=false;
        }
        //update json with component values
        this.createDynamicComponents()
       

    }
    
    //create component based off JSON, add to components list 
    createDynamicComponents(){
        for(var component of this.components){
            console.log(this.json)
            var dynamic_component=new Component(component.name,component.type,this.json, this.dataid, this.initialCreate)
            this.dynamic_components.push(dynamic_component)

        }

    }

    returnComponent(component_name){
        for(var comp of this.dynamic_components){
            if (comp.name==component_name){
                return comp
            }
        }
    }

    //create text entry fields and save to fields list: get info from components
    createField(component){
        let field_obj={name: component.name,type:component.type}
        this.fields.push(field_obj)
    }
    
    
    //TODO: change function to get module html direct from pugfile, STOP using modulars.pug
    async fetchHTMLPreview(route){
    
        const render_json=this.packageJSONPreview()
        const http_req = route+ `/getmodulerender?module=${this.path}&json=${render_json}`
        
        const response = await fetch(http_req,{
            method:'GET'
        })
        const json=await response.json()
        return json;
    }


    
    //compile all JSON values from components
    compileJSON(){
        let json_dict = {"source": this.source}

        for(var component of this.dynamic_components){
            
            json_dict[component.name]=component.retrieveVal()
            
        }
        this.json=json_dict
    }


    //Put the JSON fragment into a complete JSON file that can be read and rendered by the PUG template that renders modules
    packageJSONPreview(){
        this.compileJSON()
        var json_export= {sections:[this.json]}
     
        return JSON.stringify(json_export)
    }

    //TODO: create list of input field objects in createField function
    //TODO: read input fields and render on shell page
    //TODO: update JSON from input fields
    //TODO: concatenate JSON for individual modules into the total page JSON and update that
    //TODO: give each module JSON a unique id so it can be tracked and deleted if necessary
    //TODO: render out completed pages when viewing again

    //Create class for pages? 
    
}