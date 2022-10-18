const path=require('path')
const fs =require('fs')
var dir_json=path.join(__dirname, '../public/data/page_data')
var json_dict={}



//Iterate through all files in the page_data folder and add those files to a dict
fs.readdirSync(dir_json).forEach(function(file){
    json_dict[`${file}`.slice(0,-5)]=require("../public/data/page_data/"+file);
});



module.exports= json_dict