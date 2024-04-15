"use client";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { useEffect, useState } from "react";
import { fetchWData } from "@/Store/WeatherSlice";
import { settingdatanull } from "@/Store/WeatherSlice";
import { extractColors } from "@/Utils/colorExtractor";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { bgprovider } from "@/Utils/backgroundprovider";
import { FaTemperatureArrowDown } from "react-icons/fa6";
import { FaTemperatureArrowUp } from "react-icons/fa6";
import { FiWind } from "react-icons/fi";
import { FaCloudRain, FaCompressAlt, FaRegStar } from "react-icons/fa";
import { FaDroplet } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

import { useMediaQuery } from "react-responsive";
import {Namecity, WeatherData} from "@/Utils/interfaces";
interface WeatherAnimations {
  [dayOrNight: string]: {
    [weatherCondition: string]: string;
  };
}
const lottieUrl =
  "https://lottie.host/96cd20b2-7d66-4bfc-9789-a0a5fcb52541/STFPZOkySK.json";
const weatherAnimations: WeatherAnimations = {
  Day: {
    Clear:
      "https://lottie.host/0d9ee58a-cb86-4e7a-bdf8-08bb5e745e64/YMs3H9qZXs.json",
    Clouds:
      "https://lottie.host/1da589e9-50d3-4944-82d7-aa8985e77489/cfHCXAsW4g.json",
    Rain: "https://lottie.host/32688b23-b2c1-41b3-b1d5-6946b5df286f/zitGKjkDYb.json",
    Drizzle:
      "https://lottie.host/32688b23-b2c1-41b3-b1d5-6946b5df286f/zitGKjkDYb.json",
    Snow: "https://lottie.host/8926886a-b7aa-46da-aee7-e2fc398fdb08/MH38gQ0KvR.json",
    Thunderstorm:
      "https://lottie.host/e132b9a7-ca13-40e4-962d-bae53b2f6869/5RR2oNwqAM.json",
    Mist: lottieUrl,
    Smoke: lottieUrl,
    Haze: lottieUrl,
    Dust: lottieUrl,
    Fog: lottieUrl,
    Sand: lottieUrl,
    Ash: lottieUrl,
    Squall: lottieUrl,
    Tornado: lottieUrl,
  },
  Night: {
    Clear:
      "https://lottie.host/f6d48949-e88a-4cc6-9c6b-2738ec5c035c/IypOc2WCJI.json",
    Clouds:
      "https://lottie.host/1da589e9-50d3-4944-82d7-aa8985e77489/cfHCXAsW4g.json",
    Rain: "https://lottie.host/425fa16a-e3ed-45ba-b23d-e4fbd14bab39/CJvxYJt88y.json",
    Drizzle:
      "https://lottie.host/425fa16a-e3ed-45ba-b23d-e4fbd14bab39/CJvxYJt88y.json",
    Snow: "https://lottie.host/8926886a-b7aa-46da-aee7-e2fc398fdb08/MH38gQ0KvR.json",
    Thunderstorm:
      "https://lottie.host/e132b9a7-ca13-40e4-962d-bae53b2f6869/5RR2oNwqAM.json",
    Mist: lottieUrl,
    Smoke: lottieUrl,
    Haze: lottieUrl,
    Dust: lottieUrl,
    Fog: lottieUrl,
    Sand: lottieUrl,
    Ash: lottieUrl,
    Squall: lottieUrl,
    Tornado: lottieUrl,
  },
  // Add more mappings for other weather conditions
};

interface today {
  date: number;
  day: string;
  year: number;
}
interface dates {
  date: number;
  day: number;
  month: number;
}
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December'
];
export default function Page({ params }: { params: { slug: string[] } }) {
  const dispatch = useAppDispatch();
  const data: WeatherData = useAppSelector((state) => state.weatherstore.Wdata);
  const forcastdata  = useAppSelector(
    (state) => state.weatherstore.forcast
  );
  const mylocation:Namecity = useAppSelector((state) => state.weatherstore.mylocation);
  const [color, setColor] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [day, setDay] = useState<string>("");
  const [today, setToday] = useState<today>({
    date: 1,
    day: "saturday",
    year: 124,
  });
  const [datray, setDatray] = useState<dates[]>([]);
  const isSmallScreen = useMediaQuery({
    query: '(min-width: 768px)'
  });

  useEffect(() => {
    const lat = Number(params.slug[0]);
    const lon = Number(params.slug[1]);

    dispatch(fetchWData(lat, lon));

  }, []);
  useEffect(()=>{
  
return()=>{
dispatch(settingdatanull())

}
  },[])

  useEffect(() => {

    if (data.sys) {
      const currentDate = new Date(data.dt * 1000);
      const sunriseDate = new Date(data.sys.sunrise * 1000);
      const sunsetDate = new Date(data.sys.sunset * 1000);
      
      setToday({
        date: currentDate.getDate(),
        day: daysOfWeek[currentDate.getDay()],
        year: currentDate.getFullYear(),
      });
      // Compare the current time with sunrise and sunset times
      if (currentDate >= sunriseDate && currentDate <= sunsetDate) {
        setDay("Day");
      } else {
        setDay("Night");
      }
      const imageUrl = `${bgprovider(data.weather[0].main)}`; // URL of the image you want to extract colors from
      extractColors(imageUrl).then((extractedColors) => {
        setColor(extractedColors);
      });
    }

    const lat = Number(params.slug[0]);
    const lon = Number(params.slug[1]);
     const favorite = localStorage.getItem(`favlat=${lat}lon=${lon}`)
     if (favorite){

      setIsFavorite(true)
    }
   
  }, [data, forcastdata]);
  useEffect(() => {

const dateobjarray = forcastdata.map((item) => {
  const date = new Date(item.dt * 1000);
  return { date: date.getDate(), day: date.getDay(), month: date.getMonth() };
});

// Create a Set with custom comparison logic
const setOfObjects = new Set(dateobjarray.map((item) => JSON.stringify(item)));

// Convert the Set back to an array of unique objects
const uniqueArray = Array.from(setOfObjects).map((item) => JSON.parse(item));



    setDatray(()=>uniqueArray)

    // setColor((prev:number[])=>[...prev, ])
  }, [forcastdata]);

  useEffect(()=>{
    const lat = Number(params.slug[0]);
    const lon = Number(params.slug[1]);

    if(data){
      const favdata={coordinates: {lon: lon,lat:lat}, name: decodeURIComponent(params.slug[3]) , country: decodeURIComponent(params.slug[2]) }

    if(isFavorite){

      localStorage.setItem(`favlat=${lat}lon=${lon}`, JSON.stringify(favdata))
    
    }else if(!isFavorite){
      localStorage.removeItem(`favlat=${lat}lon=${lon}`);

    }}

  },[isFavorite,data])

  return (
    <> 
      {data.main && color ? (
      
        <main
          style={{
            background: `linear-gradient(to bottom, ${color.palette[1]}, ${color.palette[2]}, ${color.palette[3]}, ${color.palette[3]}, #cedbf0)`,
          }}
          className="pb-[70px] md:py-10 min-h-screen lg:px-60 xl:px-80 md:px-40 relative p-2"
        > <div> <div style={{ background: `${color.palette[0]}` }} className="self-start  md:flex md:justify-between md:items-center  justify-center  relative  md:py-5 backdrop-blur-lg bg-black backdrop-filter rounded-md bg-opacity-50  text-white p-2 drop-shadow-lg font-bold ">
        <div className="flex  items-center  justify-between space-x-2"><div className="flex items-center space-x-2"><FaCloudRain size={30}/> <span className="text-white">RainOrain</span> </div><span onClick={()=>{setIsFavorite((prev)=>!prev)}} className="md:flex md:items-center cursor-pointer hover:text-slate-200 " > {isFavorite ? <FaStar size={20}/>: <FaRegStar size={20}/>}</span></div>
        <div className="flex items-center">
        <div className=" flex bottom-0 md:space-x-4 w-0 h-0 invisible md:visible md:h-auto md:w-auto md:items-center  md:m-2 m-0 rounded-full  justify-around text-white ">
    <Link href={"/"}><div className="flex flex-row items-center space-x-2 font-semibold  hover:text-slate-200 "><span>Home</span> </div></Link>
    <div onClick={()=>{
    if(Object.keys(mylocation).length === 0){
      window.alert("Please Enable Location")
    }
   }}><Link href={Object.keys(mylocation).length === 0 ? "/" : `/Weather/${mylocation.Latitude}/${mylocation.Longitude}/${mylocation.Country}/${mylocation.Name}`}><div className="flex flex-row space-x-2 items-center font-semibold hover:text-slate-200 "><span>My City</span> </div></Link></div>
    <Link href={"/Favourite"}><div className="flex flex-row items-center space-x-2 font-semibold  hover:text-slate-200 "><span>Favourites</span> </div></Link>
  </div>
  
  </div> </div></div>
          {data && forcastdata.length > 1 && (
            <section className="drop-shadow-md  ">
              <div className="rounded-md  items-center backdrop-blur-md justify-between px-4 py-2 my-2 bg-white">
                <span className="font-bold text-lg flex justify-between">
                  <p>Weather Today</p>
                  <span>
                    {decodeURIComponent(params.slug[3])},{" "}
                    {decodeURIComponent(params.slug[2])}
                  </span>
                </span>
                <span className="flex justify-between">
                  <p>
                    {today.date} {today.day} {today.year}
                  </p>
                  <p>{day}</p>
                </span>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-2 md:items-center ">
              <section className=" h-[13rem]  relative py-2  order-1 rounded-md md:h-[16rem] flex flex-col items-center w-full my-2  md:pr-1 ">
                <div
                  style={{
                    backgroundImage: `url(${bgprovider(data.weather[0].main)})`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    width: "100%",
                  }}
                  className="absolute inset-0 bg-gray-800 opacity-50  rounded-md "
                ></div>
                <Player
                  autoplay
                  loop
                  src={day && weatherAnimations[day][data.weather[0].main]}
                  className="player"
                  style={{ height: isSmallScreen ? "150px" : "100px", width: isSmallScreen ? "150px":"100px" }}
                ></Player>
                <div>
                  <div className="grid grid-cols-3">
                    <div className="text-xl z-[100] self-start flex flex-col items-start text-white font-bold"></div>
                    <span className="text-xl z-[100] flex flex-col items-center text-white font-bold">
                      <p>{data.main.temp}&deg; C</p>
                      <p>{data.weather[0].main}</p>
                    </span>
                    <div> </div>
                    <p className="text-lg z-[100] col-span-3 text-wrap  text-white font-bold text-center w-full capitalize">
                      {data.weather[0].description}
                    </p>
                  </div>
                </div>
              </section>
              <div className="bg-white p-4 order-3 col-span-3 rounded-md ">
                <div className="flex justify-between">
                  <div className="flex flex-col justify-between">
                    <p className="text-xl font-bold  ">Feels Like</p>
                    <p className="align-bottom content-end items-end">
                      {data.main.feels_like}&deg; C
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-bold "></p>
                    <FiWind size={35} />
                    <p>{data.wind.speed} km/h</p>
                  </div>
                </div>
                <span className="font-bold text-xl my-2 ">Hourly Forecast</span>
                <div className="md:grid md:grid-cols-2 md:gap-x-2">
                {forcastdata
                  .filter((item) => {
                    const currentDate = new Date(item.dt * 1000);
                    return currentDate.getDate() === today.date;
                  })
                  .map((item, index) => {
                    const hour = new Date(item.dt * 1000);
                    return (
                      <div
                        className="flex justify-between  md:bg-slate-300 md:rounded-lg md:p-2 md:my-1 md:text-slate-700 items-center"
                        key={index}
                      >
                        <div>{hour.getHours()}:00</div>
                        <div>
                          {item.main.temp_min}&deg;/{item.main.temp_max}
                          &deg;
                        </div>
                        <div key={index}>
                          <img
                            className="w-[3rem] h-fit"
                            alt="weatherphot"
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                          />
                        </div>
                      </div>
                    );
                  })}
                  </div>
              </div>
              <div className="grid grid-cols-2 mt-2 gap-2  order-2 justify-between">
                <div className="grid grid-cols-3  items-center rounded-lg text-lg bg-white p-4">
                  <FaTemperatureArrowUp className="text-gray-900" size={35} />
                  <span className="flex flex-col col-span-2 text-gray-700  items-start">
                    <label>Temp Max</label>
                    <p className="text-gray-700 font-bold ">
                      {data.main.temp_max}&deg; C
                    </p>
                  </span>
                </div>
                <div className="grid grid-cols-3  items-center rounded-lg text-lg bg-white p-4">
                  <FaTemperatureArrowDown className="text-gray-900" size={35} />
                  <span className="flex flex-col col-span-2 text-gray-700  items-start">
                    <label>Temp Min</label>
                    <p className="text-gray-700 font-bold ">
                      {data.main.temp_min}&deg; C
                    </p>
                  </span>
                </div>
                <div className="grid grid-cols-3  items-center rounded-lg text-lg bg-white p-4">
                  <FaDroplet className="text-gray-900" size={35} />
                  <span className="flex flex-col col-span-2 text-gray-700  items-start">
                    <label>Humidity</label>
                    <p className="text-gray-700 font-bold ">
                      {" "}
                      {data.main.humidity} %
                    </p>
                  </span>
                </div>
                <div className="grid grid-cols-3  items-center rounded-lg text-lg bg-white p-4">
                  <FaCompressAlt className="text-gray-900" size={35} />
                  <span className="flex flex-col col-span-2 text-gray-700  items-start">
                    <span>Pressure</span>
                    <p className="text-gray-700 font-bold ">
                      {data.main.pressure} Mb
                    </p>
                  </span>
                </div>
              </div>
              </div>
            </section>
          )}
          <section className=" rounded-lg text-lg my-2 border-2 order-1 bg-black border-white text-white bg-opacity-30 p-4">
            <span className="font-bold text-xl my-2">Daily Forecast</span>
            <div className="flex  flex-col ">
              {datray.map((mitem, index) => {
           
                return (
                  <div key={index}>
                    <div className="flex  items-center space-x-2">
                    <div className="font-semibold">{months[mitem.month]}</div>
                    <div className="font-semibold">{mitem.date}</div>

                    </div>
                    <div className="flex  items-center overflow-x-auto space-x-4 ">
                    {forcastdata
                      .filter((item) => {
                        const currentDate = new Date(item.dt * 1000);
                        return currentDate.getDate() === mitem.date;
                      })
                      .map((item, index) => {
                        const hour = new Date(item.dt * 1000);
                        return (
                          <div
                            className="flex items-center  flex-col  justify-between my-2  items-center"
                            key={index}
                          >
                            <div>{hour.getHours()}:00</div>
                            <div key={index}>
                              <img
                                className="w-[3rem] h-fit"
                                alt="weatherphot"
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                              />
                            </div>
                            <div>{item.main.temp}&deg;C</div>
                    
                          </div>
                        );
                      })}
                      </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      ):<div className="h-screen w-screen flex justify-center items-center"> <Player
      autoplay
      loop
      src="https://lottie.host/6805faec-01b0-4b56-ae7a-23bf0071ef5c/uGFFr6WHIO.json"
      style={{ height: "300px", width: "300px" }}
    ></Player></div> }
    </>
  );
}
