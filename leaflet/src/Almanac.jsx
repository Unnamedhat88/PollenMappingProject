import info from "./data.json";
export default function Almanac({setN,n}){
    return(<>
    <div className="grid " style={{height:"100%"}}>
        <p className="text-4xl font-bold px-2">Almanac</p>
        {/* control buttons */}
        <div className="flex  h-10">
            <div className="bg-green-100 rounded-lg w-20 mx-2 px-2 flex items-center justify-center cursor-pointer" onClick={()=>setN((n-1<0)?info.length-1:n-1)}>Previous</div>
            <div className="bg-green-100 rounded-lg w-20 mx-2 px-2 flex items-center justify-center cursor-pointer" onClick={()=>setN((n+1>=info.length)?0:n+1)}>Next</div>
        </div>

        <div className="grid relative " style={{width:"100%",height:"24rem"}}>
            <div className="flex px-2 py-2">
                <div className="w-96 h-60 ">
                    <img className="object-contain" src={info[n].Image} style={{height:"100%", widht:"100%"}}></img>
                </div>
                <div className="grid self-start px-2 py-2">
                    <p>Name: {info[n].Name}</p>
                    <p>Latin Name: {info[n].LatinName}</p>
                    <p>Pollen: {info[n].Pollen}</p>
                    <p>Blooming Duration: {info[n].Duration}</p>
                </div>
            </div>
            <p className="px-2">{info[n].Description}</p>


        
        </div>
            <div className=" flex justify-self-center mt-0" >
            {Array.from({ length: info.length }, (_, i) => ((i===n)?
            <p key={i} className="text-6xl pb-2">.</p>:
            <p key={i} className="text-6xl pb-2 opacity-40">.</p>
            ))}
            </div>
       

    </div>
    

    </>)
}