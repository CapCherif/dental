


const express = require('express')
const bodyParser = require('body-parser')


let path = require('path')
let urlencodedparser = bodyParser.urlencoded({extended:false})
const app = express()
let fs = require('fs');



app.use(express.static(path.join(__dirname + '/public')))
app.set('view engine', 'ejs')



app.get('/', (req,res)=>{
    res.render('index')
})


app.get('/search', (req,res)=>{
    res.render('search')
})


app.post('/load_info', urlencodedparser, (req,res)=>{
    // loading info from db
    let databases = {};
    try {

        let data = fs.readFileSync('./db/database.json', 'utf8');

        // parse JSON string to JSON object
        databases = JSON.parse(data);
        gene = null;
        databases.forEach((g)=>{
            if(g.nom.search(req.body.nom) != -1){
                gene = g;
            }
        })
        if(gene == null){
            res.json({gene:null})

        }else{
            res.json({gene:gene})

        }
        
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }

})
































app.use(function (req, res) {
    res.redirect('/')
})


app.listen(3000, ()=>{
    console.log('listening to port 3000')
})