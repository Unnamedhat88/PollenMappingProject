import EXIF from "exif-js";
import heic2any from "heic2any";
export default function FlowerUploader({geo, flowerLocation, setFlowerLocation, setMessage,message,fetchFlowers,notificationPanel,setNotificationPanel}){
    //create a new functon to get gps with the input of file
    const extractGPSData = (file) => {
        //promise to wait and check whether they get a file that is readable or not
        return new Promise((resolve, reject) => {
            //initialize a object from FileReader class to read the file
          const reader = new FileReader();
          //if file done being read, execute the function below
          reader.onload = function () {
            //instantiate a new object from Image class
            const img = new Image();
            //if img done being read, execute the function below
            img.onload = function () {
                //use the Exif class to get data about gps lat, gps lon, gps lat ref, gps lon ref
                //from this object (img in this case)
                EXIF.getData(img, function () {
                const latitude = EXIF.getTag(this, "GPSLatitude");
                const longitude = EXIF.getTag(this, "GPSLongitude");
                const latRef = EXIF.getTag(this, "GPSLatitudeRef"); // N or S
                const lonRef = EXIF.getTag(this, "GPSLongitudeRef"); // E or W

                
                //converts the lat and lon from dms to decimal if exists
                if (latitude && longitude) {
                  const lat = convertDMSToDecimal(latitude, latRef);
                  const lon = convertDMSToDecimal(longitude, lonRef);
                  //return lat and lon and break out of the promise
                  resolve({ lat, lon });
                } else {
                  setMessage("No GPS data found")
                  reject("No GPS data found");
                }
              });
            };
            //set the source of the image as the result of where the file was read 
            img.src = reader.result;
          };
          
          reader.readAsDataURL(file);
        });
      };
    
      const convertDMSToDecimal = (dms, ref) => {
        const degrees = dms[0];
        const minutes = dms[1];
        const seconds = dms[2];
        let decimal = degrees + minutes / 60 + seconds / 3600;
        if (ref === "S" || ref === "W") {
          decimal *= -1;
        }
        return decimal;
      };

    const handleSubmit= async (e)=>{
        e.preventDefault();
        const formData= new FormData();
        const imgFile=e.target.imagefile.files[0]
        formData.append("imagefile", imgFile)
        const fileName = imgFile.name.toLowerCase();

        //need to get lon and lat from exif
    
        try{
       
            const gpsData = await extractGPSData(imgFile);
            const lon = gpsData.lon;
            const lat = gpsData.lat;

            formData.append("longitude", lon);
            formData.append("latitude", lat);
            const response= await fetch("http://127.0.0.1:5000/create_flower_instance",{method:"POST", body:formData})
            if (!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            const data=await response.json()
            setMessage("")
            setNotificationPanel(true)
            fetchFlowers()}
            
            
            catch(error){
                // setMessage("error submitting the form")
                console.log("error: " ,error)
                setFlowerLocation({ lat: geo.lat, lon: geo.lon })
            }}
        
    
    return( <>
    {(notificationPanel)? <div className="bg-yellow-100 z-5 absolute flex items-center justify-center" style={{top:"2rem", right:"3rem", height:"25rem", width:"38rem"}}>
      <div className="absolute right-7 top-3 w-10 h-10 text-2xl flex items-center justify-center font-bold cursor-pointer" onClick={()=>setNotificationPanel(false)} >X</div>
      <p>Thank you for the image, </p>
      <p>The plant has been uploaded to the map</p>
      </div>:null}
    <div className="flex grid">
    <p>Please upload an image of a flower</p>
    <form className="pt-4" onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="imagefile" required/>
        <input type="hidden" name="longitude" value={flowerLocation.lon} readOnly/>
        <input type="hidden" name="latitude" value={flowerLocation.lat} readOnly/>
        <input className="bg-green-300 px-2 py-2 rounded-lg cursor-pointer" type="submit" value="Submit"/>
    </form>
    {message && <p style={{color:"red"}}>{message}</p>}
    
    
    

  
    </div>
    </>)

}