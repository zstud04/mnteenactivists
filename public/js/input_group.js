class InputGroup {
    constructor(type, isOptional, enabled, json){
        this.type=type
        this.isOptional=isOptional
        this.enabled=enabled

        this.json=json
        //empty list of fields to return and render later
        this.inputs=[]
        this.initFields()
        console.log("inputs:")
        console.log(this.inputs)
    }


    //create fields for the input group
    initFields(){
        if(this.type=='paragraph'){
            var input=document.createElement('textarea')

        }else{
            var input=document.createElement('input')
        }

        input.dataset.name=this.name
        input.dataset.type=this.type
        input.dataset.target=this.module_target
        
        if(this.type=='img'){
            input.type="file"

        }

        input.classList.add("form-element-text", "w-[70%]", "h-[200px]", "mx-auto", "p-2", "rounded-md", "text-mid-gray", "ptext", "mt-3")
        var label = document.createElement("label")
        label.innerHTML = this.name
        label.classList.add("form-element-label","block", "text-mid-gray","ptext", "mt-[2em]")
        // input.value=this.name
        this.inputs.push(label, input)
        // this.checkOtherFields()
        if(this.initialCreate==true){
        }else{
            //this.retrieveFieldVal()
        }

    
    }

}