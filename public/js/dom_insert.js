const domain =window.location.href
var path =window.location.pathname.substring(1)
//make var assignment for the edit handler globally available
var handler

//check for page load and then request raw HTML, either for a preview page or the actual page
document.addEventListener('DOMContentLoaded',() => {
    (async function(){
        const data=await fetchPugContent();
        
        const html_inject=data["page_data"]
        const modules=data["page_modules"]
        //check if container is either for actual page or page preview
        try{
            let container = document.getElementById("container")
            container.innerHTML=html_inject
        }catch{
            let container = document.getElementById("preview_container")
            
            //TODO: Attach the edit_handler object to a DOM element on the edit page so that it can be accessed at any point by a
            //...DOM handler
            handler = new EditHandler(container, html_inject, modules)
            container.innerHTML=html_inject
        }
        
        //check if "cover" exists for page load
        try{
            let cover = document.getElementById("cover")
            //console.log(cover)
            cover.style.display="none"
        }catch{
            
        }
        
    })()
});

async function fetchPugContent(){
    // console.log("PATH:")
    // console.log(path)
    

    //if we are rendering pug content from page edit preview, get only the route name at the end of the module
    
    if(path.substring(0,9)=="dashboard"){
        path=path.substring(20)
    }

    
    

    const module_info = await fetch(domain+`/retrievemodules:${path}`,{
        method:'GET'
        
    })
    const json = await module_info.json()
    return json

}