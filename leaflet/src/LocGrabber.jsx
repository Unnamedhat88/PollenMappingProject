//takes the user's geo location and update the variable geo in the app.jsx
//input is null and updates the geo variable in the main
export default function LocGrabber({setGeo}){

    if (navigator.geolocation){
        const options = {
            enableHighAccuracy: true,  
            timeout: 5000,             
            maximumAge: 0              
          };
        navigator.geolocation.getCurrentPosition((position)=>{
            const latitude=position.coords.latitude;
            const longitude=position.coords.longitude;
            
            setGeo({
                lat: latitude,
                lon: longitude
            })
        },
        (error)=>{console.error("error code = "+ error.code)},options)
    }
    else{
        console.log("geolocation is not suported by this environment");
        }
    
    

}

