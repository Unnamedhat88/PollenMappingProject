import {MapContainer, TileLayer, Marker, Popup, Circle} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {useState,useEffect} from "react";
import {Icon} from "leaflet";
import LocGrabber from "./LocGrabber";
import AboutUs from "./AboutUs";
import Almanac from "./Almanac";
import FlowerUploader from "./FlowerUpload";
import info from "./data.json";


function App(){
    const[geo,setGeo]=useState({lat:"",lon:""});
    const[flowers, setFlowers]=useState([])
    const[fullScreen, setFullScreen]=useState(true)
    const[uiOptions,setUiOptions]=useState([1,0,0])
    const [flowerLocation,setFlowerLocation]=useState({lat:"",lon:""})
    const [n,setN]=useState(0)
    const [notificationPanel,setNotificationPanel]=useState(false);
    const [time,setTime]=useState("");
    
    //for debugging
    const [message,setMessage]=useState("")
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    const dates = [
        "1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", 
        "11th", "12th", "13th", "14th", "15th", "16th", "17th", "18th", "19th", "20th", 
        "21st", "22nd", "23rd", "24th", "25th", "26th", "27th", "28th", "29th", "30th", "31st"
    ];
    
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    

    useEffect(()=>{
        fetchFlowers()
        LocGrabber({setGeo})
            //for the time
        const date = new Date();
        setTime(days[date.getDay()]+" "+dates[date.getDate()-1]+" "+months[date.getMonth()]+" "+date.getFullYear());
    },[])

    const fetchFlowers=async()=>{
        const response= await fetch("http://127.0.0.1:5000/flowers")
        const data= await response.json()
        setFlowers(data.flowers)
        console.log(data.flowers)
    }

    //adds marker for the flower and used for debugging
    const markers=[{
        geocode: [geo.lat,geo.lon],
        popUp:"you are here"
    }];

    const level3flowers=["Sakura","Pine Tree"]
    const level2flowers=["Bougainville","Hydrangeas","Lagerstroemia Indica","Tulip"]
    const level1flowers=["Orchid, Others, others"]

    const mapPlant=(marker,index)=>{
        const flowerobj=info.find(item=> item.Name===marker.name)
        const date = new Date();
        let ficon
        if(!flowerobj.Duration.includes(months[date.getMonth()])){
            ficon = new Icon({
                iconUrl:"/grayPlant.png", 
                iconSize:[60,60],
                iconAnchor: [30, 30]
            })
            return (
                    <Marker key={index} position={[marker.latitude,marker.longitude]} icon={ficon} >
                        <Popup>{marker.name}</Popup>
                    </Marker>)
        }
        
        
        let fcolor;
        if (level3flowers.includes(marker.name)){
            ficon = new Icon({
                iconUrl:"/redPlant.png", 
                iconSize:[60,60],
                iconAnchor: [30, 30]
            })
            fcolor="red"
        }
        else if(level2flowers.includes(marker.name)){
            ficon = new Icon({
                iconUrl:"/yellowPlant.png", 
                iconSize:[60,60],
                iconAnchor: [30, 30]
            })
            fcolor="#ebbe4d"
        }
        else{
            ficon = new Icon({
                iconUrl:"/greenPlant.png", 
                iconSize:[60,60],
                iconAnchor: [30, 30]
            })
            fcolor="green"
        }
       
        return (
            <>
                <Marker key={index} position={[marker.latitude,marker.longitude]} icon={ficon} >
                    <Popup>{marker.name}</Popup>
                </Marker>
                (test2flower.includes(marker.name))&&(
                <Circle color={fcolor} radius={flowerobj.Radius} center={[marker.latitude,marker.longitude]}/>)
                </>
        )

    }

    //custome Icon 
    const customIcon = new Icon({
        iconUrl:"https://static.vecteezy.com/system/resources/previews/018/749/812/non_2x/3d-red-map-pointer-pin-generative-ai-png.png", 
        iconSize:[40,40],
        iconAnchor: [20, 0]
    })
    
    const flowerIcon = new Icon({
        iconUrl:"https://static.vecteezy.com/system/resources/thumbnails/042/240/974/small/ai-generated-green-seedling-growing-from-soil-isolated-on-transparent-background-png.png", 
        iconSize:[60,60],
        iconAnchor: [30, 30]
    })
    const flowerIcon2 = new Icon({
        iconUrl:"https://gallerypng.com/wp-content/uploads/2024/04/closeup-view-of-red-rose-flower-png.png", 
        iconSize:[60,60],
        iconAnchor: [30, 30]
    })

    return (<>
        <div className="relative h-screen">
            
        {/*The user interface*/}
           
            <div className=" grid bg-blue-500 absolute" style={{height:"100vh",width:"60%", left:fullScreen?"-55%":"0%",transition: "left 1s ease"}}>
                {/* fullscreen button */}
                <div className="grid w-10 h-10 bg-red-100 cursor-pointer mr-4 rounded-md px-2 py-2" onClick={()=>setFullScreen(!fullScreen)} style={{position: "absolute",top: "20px", right: "-2px", transition: "left 1s ease"}}>
                    {!fullScreen?
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
                    <path d="M8.766.566A2 2 0 0 0 6.586 1L1 6.586a2 2 0 0 0 0 2.828L6.586 15A2 2 0 0 0 10 13.586V2.414A2 2 0 0 0 8.766.566Z"/>
                    </svg>:

                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 10 16">
                    <path d="M3.414 1A2 2 0 0 0 0 2.414v11.172A2 2 0 0 0 3.414 15L9 9.414a2 2 0 0 0 0-2.828L3.414 1Z"/>
                    </svg>}

                </div>
                
                <div className="justify-self-center " style={{height:"50%", width:"80%"}}>
                    <div className="bg-green-100 px-10 mt-4 py-2 flex items-center justify-center rounded-xl" >{time}</div>
                    <div className="bg-green-100 px-10 mt-4 py-2 flex items-center justify-center rounded-xl cursor-pointer" onClick={()=>setUiOptions([1,0,0])}>About us</div>
                    <div className="bg-green-100 px-10 mt-4 py-2 flex items-center justify-center rounded-xl cursor-pointer" onClick={()=>setUiOptions([0,1,0])}>Upload a plant picture</div>
                    <div className="bg-green-100 px-10 mt-4 py-2 flex items-center justify-center rounded-xl cursor-pointer" onClick={()=>setUiOptions([0,0,1])}>Plant encyclopedia</div>
                </div>

                <div className="bg-blue-100 justify-self-center absolute rounded-xl px-4 py-4" style={{ width:"80%", top:"30%", height:"68%"}}>
                {uiOptions[0] ? <AboutUs /> :
                uiOptions[1] ? <FlowerUploader geo={geo} flowerLocation={flowerLocation} setFlowerLocation={setFlowerLocation} setMessage={setMessage} message={message} fetchFlowers={fetchFlowers} notificationPanel={notificationPanel} setNotificationPanel={setNotificationPanel}/> :
                uiOptions[2] ? <Almanac setN={setN} n={n}/> : null}

                

                </div>
            </div>

            {/*returns the map itself*/}
            <div className="absolute" style={{height: "100vh",width:"95%",left:fullScreen?"5%":"60%",transition: "left 1s ease" }}>
            <MapContainer center={[34.80966,135.5617]} zoom={18} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                attribution ='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* adds the marker for the person */}
                {markers.map((marker,index)=>(
                <Marker key={index} position={marker.geocode} icon={customIcon} className="z-5" >
                    <Popup>{marker.popUp}</Popup>
                </Marker>
                ))}

                {/* adds the marker for each flower*/}
                {flowers && flowers.map((marker,index)=>( mapPlant(marker,index)))}
                
                
                
               

                
            </MapContainer>
            </div>
        </div>
        </>
    );
}

export default App