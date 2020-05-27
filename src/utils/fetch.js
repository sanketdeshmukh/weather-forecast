const request=require('request');
const fetch=(lat,long,callback)=>{
    const url='http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&units=metric&appid=a4dc16810ffbf9a591b221c6408bd152'
    
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to the service');
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

// const fetch=()=>{
//     const url='http://api.openweathermap.org/data/2.5/weather?lat=19.1546761&lon=73.239918&units=metric&appid=a4dc16810ffbf9a591b221c6408bd152&cnt=1'
//     request({url,json:true},(error,response)=>{
//         console.log(response.body.name);
//         console.log(response.body.main.temp); 
//         console.log(response.body.wind.speed);
//         console.log(response.body.main.humidity);
//     })
// }
// fetch();

module.exports=fetch;
