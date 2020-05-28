const path=require('path');
const express=require('express');
const hbs=require('hbs');
const getWeather=require('./utils/getWeather');
const fetch=require('./utils/fetch');

const app=express();
const port=process.env.PORT || 3000;
const Path=path.join(__dirname,'../public')
app.set('view engine','hbs')
app.set('views',path.join(__dirname,'../templates/views'));
app.use(express.static(Path))
app.use(express.json({limit:'1mb'}));
const partialPath=path.join(__dirname,'../templates/partials');
hbs.registerPartials(partialPath);
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Sanket Deshmukh'
    });
});
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About what??'
    });
});
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Not working yet!!'
    });
});
app.get('/weather',(req,res)=>{
    if(!req.query.find)
    {
        return res.send({
            error:'Please provide location'
        });
    }
    getWeather(req.query.find,(error,response)=>{
        if(error){
           return res.send({error});
        }
        res.send(response)
    });
});

app.post('/weather',(req,res)=>{
    const lat=req.body.lat;
    const long=req.body.long;
    fetch(lat,long,(error,response)=>{
        if(error){
            return res.send({error});
        }
        // console.log(response.name);
        res.send(response);
    });
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Help article not found'
    });
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Page not found'
    });
})
app.listen(port,()=>{
    console.log('Server is started');
});