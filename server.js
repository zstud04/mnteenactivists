const port = 3000
const express = require('express');
const app = express();
const router=express.Router()
const path=require('path')
const cookieParser = require('cookie-parser')
const bodyParser= require("body-parser")
const adminRoutes=require('./routes/admin')
const adminOpsRoutes=require('./routes/admin_ops')
const publicRoutes=require('./routes/public')
const utilRoutes = require('./routes/util')




app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'))
app.use(cookieParser());
app.use('/', adminRoutes);
app.use('/dashboard',adminOpsRoutes)
app.use('/',publicRoutes)
app.use('/',utilRoutes)

app.set('views', path.join(__dirname, '/public/views'))
  
app.get('/', (req, res) =>{
    res.render('index')
    
});



// app.get('/about', (req, res) =>{
    
//     res.render('about', {data: dataLookup["about"]})
    
// });

// app.get('/start-chapter',(req, res)=>{
//     res.render('start_chapter',{data:start_chapter_json})
// });

// app.get('/report',(req, res)=>{
//     res.render('report',{data:report_json})
// });
app.listen(process.env.PORT || port, console.log(`Server started on ${port}`));