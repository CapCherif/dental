


const express = require('express')
const bodyParser = require('body-parser')


let path = require('path')
let urlencodedparser = bodyParser.urlencoded({extended:false})
const app = express()
let fs = require('fs');



app.use(express.static(path.join(__dirname + '/public')))
app.set('view engine', 'ejs')

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});








app.get('/get_rdv', (req,res)=>{
    // loading info from db
    try {

        let rdvs = JSON.parse(fs.readFileSync('./db/rdvs.json', 'utf8'));

        res.json({rdvs:rdvs.slice(0,20)})
        
        
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }

})


app.get('/get_one/:id', (req,res)=>{
    try {

        let rdvs = JSON.parse(fs.readFileSync('./db/rdvs.json', 'utf8'));
        let one ;
        rdvs.forEach((rdv)=>{
            if(rdv.id == req.params.id){
                one = rdv;
            }
        })
        res.json({rdv:one})
        
        
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
})


app.delete('/delete/:id', urlencodedparser, (req,res)=>{
    try {
        let rdvs = JSON.parse(fs.readFileSync('./db/rdvs.json', 'utf8'));
        rdvs.forEach((rdv,index)=>{
            if(rdv.id == req.params.id){
                rdvs.splice(index, 1)
            }
        })

        let data1 = JSON.stringify(rdvs, null, 4);
    
        // write file to disk
        fs.writeFileSync('./db/rdvs.json',data1, 'utf8');
        res.json({done:true})
        
        
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
})



app.post('/add', urlencodedparser, (req,res)=>{
    try {
        let rdvs = JSON.parse(fs.readFileSync('./db/rdvs.json', 'utf8'));
        rdvs.unshift({
            id:req.body.id,
            nom:req.body.nom,
            prenom:req.body.prenom,
            date:req.body.date,
            medecin:req.body.medecin,
            detail:req.body.detail,
        })

        let data1 = JSON.stringify(rdvs, null, 4);
    
        // write file to disk
        fs.writeFileSync('./db/rdvs.json',data1, 'utf8');
        res.json({done:true})
        
        
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
})


app.post('/update/:id', urlencodedparser, (req,res)=>{
    try {
        let rdvs = JSON.parse(fs.readFileSync('./db/rdvs.json', 'utf8'));
        rdvs.forEach((rdv)=>{
            if(rdv.id == req.body.id){
                rdv.nom=req.body.nom
                rdv.prenom=req.body.prenom
                rdv.date=req.body.date
                rdv.medecin=req.body.medecin
                rdv.detail=req.body.detail
            }
        })
        

        let data1 = JSON.stringify(rdvs, null, 4);
    
        // write file to disk
        fs.writeFileSync('./db/rdvs.json',data1, 'utf8');
        res.json({done:true})
        
        
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
})



app.post('/filter', urlencodedparser, (req,res)=>{
    try {

        let rdvs = JSON.parse(fs.readFileSync('./db/rdvs.json', 'utf8'));
        let filtered = [] 
        rdvs.forEach((rdv)=>{
            if(rdv[req.body.filter].indexOf(req.body.saisie) != -1){
                filtered.push(rdv)
            }
        })
        res.json({rdvs:filtered})
        
        
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
})


app.get('/all', urlencodedparser, (req,res)=>{
    try {

        let rdvs = JSON.parse(fs.readFileSync('./db/rdvs.json', 'utf8'));
        
        res.json({rdvs})
        
        
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }
})




















app.use(function (req, res) {
    res.redirect('/')
})


const server = app.listen(process.env.PORT || 5000, ()=>{
    const port =server.address().port;
    console.log('listening to port ', port)
})


