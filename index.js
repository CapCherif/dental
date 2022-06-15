


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


app.get('/us', (req,res)=>{
    res.render('us')
})


app.get('/cuisiner', (req,res)=>{
    res.render('cuisiner')
})




app.get('/celiaq', (req,res)=>{
    res.render('celiaq')
})

app.get('/search', (req,res)=>{
    res.render('search')
})

app.get('/contact', (req,res)=>{
    res.render('contact')
})

app.post('/load_info', urlencodedparser, (req,res)=>{
    // loading info from db
    let databases = {};
    try {

        let data = fs.readFileSync('./db/db.json', 'utf8');

        // parse JSON string to JSON object
        databases = JSON.parse(data);
        allele = {}
        databases.forEach((g)=>{
            if(g.id == req.body.id){
                allele = g.types
            }
        })
        res.json({res: allele})
        
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`);
    }

})













app.post('/post_msg', urlencodedparser,  (req,res)=>{

    var mailOptions = {
      from: 'projet de master',
      to: 'gharbi_cherif@hotmail.com',
    //   to: 'brahamiines84@gmail.com',
      subject: "Message",
      text: "name: " + req.body.nom + " " + '\n' + " email :" +
      req.body.email  +'\n' + "phone : "+ req.body.phone + '\n' + "message : " + req.body.msg
    };
    

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        res.json({res:true});
        }
    });
     
    
})






















app.use(function (req, res) {
    res.redirect('/')
})


const server = app.listen(process.env.PORT || 5000, ()=>{
    const port =server.address().port;
    console.log('listening to port ', port)
})



var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'med03cherif@gmail.com',
    pass: 'uejhggapyygjlenl'
  }
});