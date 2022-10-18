class Component{
    constructor(name, type, json, module_target, initialCreate=false){
        this.type=type
        this.name=name
        this.json=json
        this.module_target=module_target
        this.targetField
        this.inputs
        //this.renderInitialField()

        this.createInputGroup()

        //check if there is a json value already
        if(this.type=='img'){
            this.value='placeholder.jpeg'
        }else{
            if(this.json[this.name]){
                this.value=this.json[this.name]
            }else{
                this.value=this.name
            }
        }

        if(this.type=='button'||this.type=='form_input'){

            this.enabled=false
            this.isOptional=true


        }else{
            this.isOptional=false
            this.enabled=true
        }
        

       
        
    }
   
    // renderInitialField(){

    //     if(this.type=='formElements'){
    //         this.renderFieldEnable()
    //         return
    //     }

    //     if(this.type=='paragraph'){
    //         var input=document.createElement('textarea')

    //     }else{
    //         var input=document.createElement('input')
    //     }

    //     input.dataset.name=this.name
    //     input.dataset.type=this.type
    //     input.dataset.target=this.module_target
        
    //     if(this.type=='img'){
    //         input.type="file"

    //     }
    //     input.classList.add("form-element-text", "w-[70%]", "h-[200px]", "mx-auto", "p-2", "rounded-md", "text-mid-gray", "ptext", "mt-3")
    //     var label = document.createElement("label")
    //     label.innerHTML = this.name
    //     label.classList.add("form-element-label","block", "text-mid-gray","ptext", "mt-[2em]")
    //     // input.value=this.name
    //     this.inputs.push(label, input)
    //     // this.checkOtherFields()
    //     if(this.initialCreate==true){
    //     }else{
    //         //this.retrieveFieldVal()
    //     }

    // }

    //create Inputs for component
    createInputGroup(){
        this.inputs=new InputGroup(this.type, this.isOptional, this.enabled, this.json)

        
    }
    
    //create a button(and event listener) that will create the correct optional fields
    renderFieldEnable(){
        var add_fields_button = document.createElement('button')
        var callback;
        add_fields_button.innerHTML=`Add ${this.type}`
        add_fields_button.classList.add("btn","btn-lg","btn-outline-primary","zbutton", "mx-[1em]","mt-3","comp_button")
        add_fields_button.dataset.type=this.type
        add_fields_button.dataset.target=this.module_target
        add_fields_button.addEventListener('click', this.addSubComponent)
        

        this.inputs.push(add_fields_button)
        

    }
    //refresh module with added button component
    updateButtonVal(e){
        let value =e.target.value
        this.value=value
      

        var target_div=document.getElementById(e.target.dataset.target)
        var component = modules[e.target.dataset.target].returnComponent("button_text")


        //button text was deleted
        if(value.length==0){
            component.inputs.pop()
            component.inputs.pop()
        }else{
            try{
                target_div.getElementById('href')
            }
            catch{
                var input=document.createElement('input')
                input.classList.add("form-element-text", "w-[70%]", "h-[200px]", "mx-auto", "p-2", "rounded-md", "text-mid-gray", "ptext", "mt-3")
                var label = document.createElement("label")
                label.innerHTML = "Button Link"
                label.classList.add("form-element-label","block", "text-mid-gray","ptext", "mt-[2em]")
                input.id='href'
                
                component.inputs.push(label, input)
                refreshModule(e.target.dataset.target)

                
            }
            

        }
    }

    addSubComponent(){

    }

    
    //get subcomponents of component add and render them
    addField(){
        // const render_json=this.packageJSONPreview()
        // const http_req = route+ `/getmodulerender?module=${this.path}&json=${render_json}`
        
        // const response = await fetch(http_req,{
        //     method:'GET'
        // })
        // const json=await response.json()
        // return json;
    }

    //sync values for input and create listener for input change
    syncListen(input, target_module,initial){
        let target_div = target_module.querySelector(`#${input.dataset.name}`)
        this.targetField=target_div
        
        if((input.dataset.type=='text'||input.dataset.type=='paragraph')){
            input.value= target_div.innerHTML

            target_div.innerHTML=input.value
            
            input.addEventListener('input', updateVal)
            

        }else if(input.dataset.type=='img'){
            
        }else if(input.dataset.type=='button'){
            input.addEventListener('input', this.updateButtonVal)
        }
        
        function updateVal(e){
            // let target_val =e.target.dataset.targetName
            target_div.innerHTML=e.target.value
            // target_div.innerHTML=e.target.value
            
        }
    }
    //

    
    //retrieve the value for a component
    retrieveVal(){
        return this.value
        
        // let target_div=document.getElementById(this.module_target)
        // var target_val=target_div.querySelector(`#${this.name}`)
       

        // if(this.type=='text'||this.type=='paragraph'){
        //     return target_val.innerHTML
        // }else if(this.type=='img'){
        //     try{
        //         return target_val.source

        //     }catch{
        //         return ""
        //     }
        // }else if(this.type=='button'){
        //     return this.inputs[1].value
        // }
      
        
        //return this.test


    }

    // //get values for the initial field
    // renderInitialFieldVal(target_component){
        
    //     this.inputs[0].value=this.targetElement.id
        
    // }

    

}