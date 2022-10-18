
const comp_buttons = document.querySelectorAll('.comp_button');


var modules=[]

//add a module, get components
function addModule(module_name, index=modules.length-1){
    const domain =window.location.href
    fetch(domain+`/getmodules?module=${module_name}`,{
        method:'GET'
        
    }).then(function(res){
        return res.json()
    }).then(data=>{
        // console.log(data)
        const module = new Module(module_name, data, modules)
        modules.splice(index,0,module)
        // console.log(module.fields)
        
        //get the html preview
        module.fetchHTMLPreview()
            .then((data)=>{
                const container = document.getElementById('preview_container')
                var module_container =document.createElement('div')
                
                module_container.setAttribute('id', module.dataid)
                module_container.classList.add('edit_listener')
                module_container.innerHTML += data.page_data
                
                container.appendChild(module_container)
                //render_fields(module.dynamic_components, module.json, module.dataid)
                //render_fields(module, inital=true)
                // module.addDataID(data.page_data)
                refreshListeners()
            })
        
    })
}

//refresh module with updated components/JSON
function refreshModule(module_id){
    let compiled_json=modules[module_id].compileJSON()
    removeModule(module_id)
    addModule()

}


//remove module from DOM and modules list
function removeModule(module_name){

}

//remove all modules from dom and modules list
function removeAllModules(){

}

//change order of module in DOM and modules list
function changeModuleOrder(module_name){

}

//compile all module JSON fragments into a complete file
function compileJSON(){

}

//preview page with compiled JSON
function previewPage(){

}

//upload page to DB pages table
function publishPage(){

}


function refreshListeners(){
    const module_listeners = document.querySelectorAll('.edit_listener')
    //add button listeners
    module_listeners.forEach(section =>{
    
        section.addEventListener("click", function(e){            
            let target_id= this.id
            render_fields(modules[target_id])
        })

    })
}



//use initial=false to tell whether components are created for the first time
function render_fields(module, initial=false){
    var target_module =document.getElementById(module.dataid)
   
    const container = document.getElementById('fields_container')
    container.innerHTML=""
    
    for(var component of module.dynamic_components){

        for(var input of component.inputs){
            //console.log(input)
            container.appendChild(input)
            //create event listeners for component and sync text
            if(input.constructor.name!="HTMLLabelElement"){
                component.syncListen(input, target_module, initial)

            }
        }
    }


    // var input_styles=["form-element-text", "w-[70%]", "h-[200px]", "mx-auto", "p-2", "rounded-md", "text-mid-gray", "ptext", "mt-3"]
    // for(var field of fields){
    //     var inputs_list=[]
    //     var input;
    //     var element =target_module.querySelector(`#${field.name}`)
    //     if(field.type=='text' || field.type=='paragraph'){
    //         if(field.type=='paragraph'){
    //             input=document.createElement("textarea")
                
    //         }else{
    //             input=document.createElement("input")
    //         }

    //         if(initialCreate==true){
    //             console.log(json)
    //             //input.value = json[field.name]
    //             input.value=element.id
    //         }else{
    //             // console.log(field.name)
    //             console.log(modules[module_id].json)
                
    //             input.value=json[field.name]
                
    //             console.log(element)
    //         }
            
            

    //         input.dataset.targetName=field.name
            
            
    //     }
    //     else if(field.type=='img'){
    //         input = document.createElement("input")
    //         input.type="file"
    //     }else if(field.type=='button'){
    //         input = document.createElement("input")
            
    //     }
    //     input.classList.add("form-element-text", "w-[70%]", "h-[200px]", "mx-auto", "p-2", "rounded-md", "text-mid-gray", "ptext", "mt-3")
        

    //     var label = document.createElement("label")
    //     label.innerHTML = field.name
    //     label.classList.add("form-element-label","block", "text-mid-gray","ptext", "mt-[2em]")


    //     container.appendChild(label)
    //     container.appendChild(input)

    //     input.addEventListener('input', updateVal)
        
    //     function updateVal(e){
            
    //         let target_val =e.target.dataset.targetName
            
            
    //         let target_div = target_module.querySelector(`#${target_val}`)
            
    //         target_div.innerHTML=e.target.value
            
    //     }

        

    // }


}

//add button listeners for modules
comp_buttons.forEach(button =>{
    button.addEventListener('click', function handleClick(event) {
        //addModule(button.dataset.moduleType);
    });
})

