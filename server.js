const port = 3000
const express = require('express');
const app = express();
const router=express.Router()
const path=require('path')
//JSON files
const about_json = require('./public/page_data/about.json')
const start_chapter_json = require('./public/page_data/start-chapter.json')
const report_json=require('./public/page_data/report.json')


app.set('view engine', 'pug');

app.use(express.static(__dirname+'/public'))
app.set('views', path.join(__dirname, '/public/views'))

app.get('/', (req, res) =>{
    res.render('index')
    
});

app.get('/about', (req, res) =>{
    
    res.render('about', {data: about_json})
    
});

app.get('/start-chapter',(req, res)=>{
    res.render('start_chapter',{data:start_chapter_json})
});

app.get('/report',(req, res)=>{
    res.render('report',{data:report_json})
});
app.listen(process.env.PORT || port, console.log(`Server started on ${port}`));