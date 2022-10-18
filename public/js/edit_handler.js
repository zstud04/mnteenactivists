//class to hanlde all modules, components on screen and package for export
class EditHandler{
    constructor(container, html, modules){
        this.container=container
        container.innerHTML=html
        if(!modules){
            this.modules=[]
        }else{
            this.modules=modules
        }
        this.addModuleButtonListeners()
        this.initModules()


    
    }

    //initialize all pre-existing modules
    initModules(){
        try{
            for(module in this.modules){
                this.addModule(module["name"])
            }
        }catch{
            //no modules in list
        }
    }
    
    

    //add a module, get components- Add at next available index by default
    addModule(module_name, index=this.modules.length){
        const domain =window.location.href

        //fetch components for module
        fetch(domain+`/getmodules?module=${module_name}`,{
            method:'GET'
            
        }).then(function(res){
            return res.json()
        }).then(data=>{
            var module_container =document.createElement('div')
            const module = new Module(module_name, data, index, module_container)
            this.renderModuleContainer(module)
            this.modules.splice(index,0,module)
            this.refreshModule(module)
        })
    }

    //create module container in DOM
    renderModuleContainer(module){
        module.container.setAttribute('id', module.dataid)
        module.container.classList.add('edit_listener')
        this.container.appendChild(module.container)
        this.container.appendChild(module.container)
        this.addModuleListener(module.container)


    }

    //TODO: assign module DOM container element to each module object WHEN IT IS CREATED for ease of access
    //refresh the display HTML for a module
    refreshModule(module){
        let module_container = module.container
        module.fetchHTMLPreview()
            .then((data)=>{
                module_container.innerHTML=data.page_data
                this.renderFields(module)
            })
    }

    //add listener for module
    addModuleListener(div){
        div.addEventListener("click", function(e){            
            let target_id= this.id
            handler.renderFields(handler.modules[target_id])
        })
    
       
    }

    //render the text fields for a module
    renderFields(module, initial=false){
        const container = document.getElementById('fields_container')
        container.innerHTML=""
        console.log("renderfields:")
        console.log(module.dynamic_components)
        for(var component of module.dynamic_components){
            for(var input of component.inputs){
                //console.log(input)
                container.appendChild(input)
                //create event listeners for component and sync text
                if(input.constructor.name!="HTMLLabelElement"){
                    var target_module =module.container
                    component.syncListen(input, target_module, initial=true)

                }
            }
        }
    }

    

    //add listeners for all module buttons
    addModuleButtonListeners(){
        const comp_buttons = document.querySelectorAll('.comp_button');
        //add button listeners for modules
        comp_buttons.forEach(button =>{
            button.addEventListener('click', function handleClick(event) {
                console.log(handler.modules)
                handler.addModule(button.dataset.moduleType);
                
            });

        })
    }

}
