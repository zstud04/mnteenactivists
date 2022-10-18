
async function postFormData(formData,formType){
      const plainFormData=Object.fromEntries(formData.entries())
      const formDataJsonString = JSON.stringify({
        data:plainFormData,
        type:formType
      })
      
      const fetchOptions ={
          method:"POST",
          headers:{
              "Content-Type":"application/json",
          },
          body:formDataJsonString
      }
      const response = await fetch('/form-submit', fetchOptions)
      

      if(!response.ok){
          const errorMessage = await response.text()
          throw new Error(errorMessage)
      }else{
          console.log("success!")
          
      }
      return response
}

async function handleFormSubmit(event){
    
    event.preventDefault();

    const form=event.target;
    const url=form.action
    const type = form.dataset.type
    var alert_prompt
    
    if(type=='contact'){
        alert_prompt="Thanks for reaching out! We'll get back to you as soon as possible"

    }else if(type=='report'){
        alert_prompt="Thanks for reaching out! We'll begin looking into this and reach out as soon as possible"

    }else if(type=='donations'){
        alert_prompt="Thank you for your contribution! People like you keep MN Teen Activists running"
    }else if(type=='mailing'){
        alert_prompt="Thanks for joining the mailing list! We look forward to keeping in touch"

    }
    alert(alert_prompt)
    window.location.href='/'

    try{
        const formData = new FormData(form, type)
        const responseData= await postFormData(formData, type)

        
    }catch(e){
        console.error(e)
    }
}




/*
window.onload=function(){
    const form=document.querySelector('#checkout-form');

    

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("hi!")
        // TODO do something here to show user that form is being submitted
        fetch('/form-submit',{
            method: 'POST',
            
            body: JSON.stringify({
                data:new FormData(event.target)
            }),
            headers:{
                'Content-type':'application/json'
            }
                
            
        }).then((resp) => {
            
            return resp.json(); // or resp.text() or whatever the server sends
        }).then((body) => {
        }).catch((error) => {
            // TODO handle error
        });
    });
}
*/