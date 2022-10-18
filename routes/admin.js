const express = require('express');
const router = express.Router();
const db = require('../db_connect')

const dataLookup=require('../util/data_lookup')
const middleware=require('../middleware');





//admin login
router.get('/admin',(req,res)=>{
    const login=req.cookies.login

    if(login){
        res.redirect('/dashboard')
    }else{
        res.render('admin/admin', {data:dataLookup["admin"]})
    }
});

//verify admin login
router.post('/auth-dashboard',(req, res)=>{
    const {username, password}= req.body
    db.query(`SELECT * FROM users WHERE username='${username}' AND password='${password}'`, (err, rows) => { 
        if(err) throw err
        if(rows.length != 0){
            res.cookie('login', {"username":username, "first_name":rows[0]["first_name"],"last_name":rows[0]["last_name"], "permissions":rows[0]["permissions"]});
            res.redirect('dashboard')
        }else{
            res.send("invalid login")
        }
    });

    
})

//dashboard: redirect if not logged in
router.get('/dashboard', (req,res)=>{
    const login=req.cookies.login
    if(login){
        res.render('admin/dashboard', {login})
    }else{
        res.redirect('/admin')
    }
});

//render page from json folder
router.get('/dashboard/:page', (req, res)=>{
    var page=req.params["page"]
    res.render(`admin/${page}`, {data:dataLookup[page]})
});

//retrieve all modules for a given page based on page param and send to client
router.get('/dashboard/:page/retrievemodules:path',(req,res)=>{
    var page=req.params["path"].substring(1)
    const data_parse= new ParsedData(page)
    let module_html=data_parse.compileModules()
    res.status(200).send({page_data:module_html})
});


module.exports=router;