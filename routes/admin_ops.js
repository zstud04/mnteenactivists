const express = require('express');
const router = express.Router();
const bodyParser= require("body-parser")
const db = require('../db_connect')
const data_lookup = require('../util/data_lookup')
const ParsedData=require('../util/data_parse')

const fs =require('fs')
const middleware=require('../middleware');
const pug = require('pug')

//middleware for page-edit
router.use('/page-edit/:route',middleware["retrieve_modules"]())


//create a new empty page with empty JSON
router.post('/page-create', middleware["pagecreate"](), (req, res)=>{
    res.redirect(`/dashboard/page-edit/${res.locals.route}`)
})



//delete a page
router.post('/page-delete',(req, res)=>{

})

//update a page
router.post('/page-update',(req, res)=>{

})

//read config data for page
router.get('/page-read/:page', (req,res)=>{

})

//create blog post
router.post('/')

//render page edit
router.get('/page-edit/:route', middleware["renderpage"](),(req, res)=>{
   
})

//get components in editor
router.get('/page-edit/:route/getmodules', middleware["getcomponents"](),(req, res)=>{
    
})

//get html info for pug module
router.get('/page-edit/:route/getmodulerender',(req,res)=>{
    const json_val=JSON.parse(req.query["json"])
    var pugData = pug.renderFile('public/views/includes/modulars.pug', {data:json_val})
    

    //send JSON file here as well: do a SELECT in database, and if nothing returns, send an empty file
    res.status(200).send({page_data:pugData})
    
})

//retrieve all modules for a given page based on page param and send to client as HTML
//exact same as public method for retrievemodules, except we also return Objects for Modules in the JSON
router.get('/page-edit/:page/retrievemodules:path',(req,res)=>{
    var page=req.params["path"].substring(1)
    const data_parse= new ParsedData(page)
    let module_html=data_parse.compileModules()
    let modules_json=data_parse.retrieveModules()
    res.status(200).send({"page_data":module_html, "page_modules":modules_json})
});


module.exports=router;