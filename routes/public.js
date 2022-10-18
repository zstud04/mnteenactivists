const express = require('express');
const router = express.Router();
const ParsedData=require('../util/data_parse')




router.get('/:page', (req, res)=>{
    var page=req.params["page"]
    res.render("template")

});



// router.get('/:page/:subpage', (req, res)=>{
//     var page=req.params["page"]
//     var subpage=req.params["subpage"]
//     console.log(subpage)

// })

//retrieve all modules for a given page based on page param and send to client
router.get('/:page/retrievemodules:path',async (req,res)=>{
    console.log(req.params["path"])
    var page=req.params["path"].substring(1)
    const data_parse= new ParsedData(page)
    let module_html=await data_parse.compileModules()
    res.status(200).send({page_data:module_html})
});

module.exports=router