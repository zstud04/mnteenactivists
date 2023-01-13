
const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();
const dev_secret_key=""
const stripe=require('stripe')(dev_secret_key)
const bodyParser= require("body-parser")
const authentication = require('../util/google_auth');
const { identitytoolkit } = require('googleapis/build/src/apis/identitytoolkit');
const GoogleSpreadsheet= require('google-spreadsheet')
router.use(express.urlencoded({extended:true}));

//SHEET IDS:
const contact_sheet ='14PNwVNEGR6jmn0R6mUP9ng-CvuCrlrEZkU1HmuW20i8'
const report_sheet='11uRb5eHOndgt8VrB7ADqa5CV9baVDbik0viXRlPsxmA'
const donations_sheet='1dYOfxRfTxPWXYcaXEqWQDEhQ1Vtl2H-4jXC4i4iP3c4'
const mailing_sheet = '1oJCHCCnK9FfsP0lT8yTGNN0Gs-xR4HTsZr4OrEauGQ4'


//process a donation via Stripe
router.post('/charge-donation', (req,res)=>{
    try{
        stripe.customers.create({
            name:req.body.name,
            email:req.body.email,
            source:req.body.stripeToken
        }).then(customer=>stripe.charges.create({
            amount:req.body.amount*100,
            currency:'usd',
            customer:customer.id,
            description:'Thank you for your purchase'
        })).then(()=>{
            res.redirect('/')
        }).catch(err=>console.log(err))

    } catch(err){res.send(err)}
})


//submit a generic form entry
router.post('/form-submit', async (req, res)=>{
    var sheet_id

    if(req.body.type=='contact'){
        sheet_id=contact_sheet
    }else if(req.body.type=='report'){
        sheet_id=report_sheet
    }else if(req.body.type=='donations'){
        sheet_id=donations_sheet
    }else if(req.body.type=='mailing'){
        sheet_id=mailing_sheet
    }
    console.log(req.body.data)
    console.log(req.body)
    const inputs=Object.values(req.body.data)
    const {sheets}= await authentication();
    try{

        
        
        const writeReq= await sheets.spreadsheets.values.append({
            spreadsheetId: sheet_id,
            range: 'Sheet1',
            valueInputOption:'USER_ENTERED',
            resource:{
                values:[inputs]
            }
        })
        if(writeReq.status===200){
            console.log('Spreadsheet updated successfully')
            
            
        }else{
            console.log(res.json({msg:'Something went wrong while updating the spreadsheet'}))
        }
    }catch(e){
        console.log('ERROR UPDATING THE SPREADSHEET', e);
        res.status(500).send();
    }

    

});

module.exports=router;
