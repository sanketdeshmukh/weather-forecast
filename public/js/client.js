console.log('clientside js file')
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');
const messageThree=document.querySelector('#message-3');
const messageFour=document.querySelector('#message-4');
navigator.geolocation.getCurrentPosition((position) => {
    const lat=position.coords.latitude;
    const long=position.coords.longitude;
    const data={lat,long}
    const options={
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-Type':'application/json'
        }
    }
    fetch('/weather',options).then(data=>{
        data.json().then(response=>{
            if(response.error){
                messageOne.textContent=response.error;
                return;
            }
            messageOne.textContent=response.name;
            messageTwo.textContent=response.temp+'° Celsius';
            messageThree.textContent='Wind speed= '+response.wind+' m/s';
            messageFour.textContent='Humidity= '+response.humidity+' %';
        })
    });
  });

const form=document.querySelector('form');
const search=document.querySelector('input');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value;
    fetch('/weather?find='+location+'').then(response=>{
        response.json().then(data=>{
            if(data.error){
                messageOne.textContent=data.error;
                messageTwo.textContent=location;
                console.log(data.error);
                return;
            }else{
            messageOne.textContent=location;
            messageTwo.textContent=data.temp+'° degree celsius';
            messageThree.textContent='Wind speed= '+data.wind+' m/s';;
            messageFour.textContent='Humidity= '+data.humidity+' %';
            console.log(data);
            }
        })
    });
});