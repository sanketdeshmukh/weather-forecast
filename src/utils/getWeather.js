const request=require('request');
const getWeather=(Location,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(Location)+'&units=metric&appid=a4dc16810ffbf9a591b221c6408bd152'

    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to the service');
        }else if(body.message){
            callback('Location not found');
        }else{
            callback(undefined,{
                name:body.name,
                temp:body.main.temp,
                wind:body.wind.speed,
                humidity:body.main.humidity
            });
        }
    });
}

module.exports=getWeather;
