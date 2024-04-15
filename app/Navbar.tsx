'use client'
import { settingmylocationdata } from '@/Store/WeatherSlice'
import { useAppDispatch } from '@/Store/hooks'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaHome, FaStar } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'

interface Locationdata {
    Latitude : Number,
    Longitude : Number

}
interface Namecity {
    Name: string,
    Country: string,
    Latitude : Number,
    Longitude : Number
}
const Navbar = () => {
    const [locationData, setLocationData] = useState<Locationdata>({Latitude: 9,Longitude: 9});
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const [mylocation, setmylocation] = useState<Namecity>({Name : "", Country: '',Latitude: 2, Longitude:2})

  useEffect(() => {
    // Check if geolocation is supported by the browser
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    // Get the current position
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Extract latitude and longitude from the position object
        const { latitude, longitude } = position.coords;
        // Set the location data state
        setLocationData({ Latitude: latitude, Longitude : longitude });
        
      },
      (error) => {
        
        setError(`Error: ${error.message}`);
      }
    );
  }, []);
  useEffect(() => {
      
    const latlong = async()=>{
    try {
        
       
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${locationData.Latitude}&lon=${locationData.Longitude}&limit=1&&appid=51690717b0efc26dcc1cbac748cb55ae`
        );
        const json = await res.json();

        setmylocation({Name:json[0].name,Country: json[0].country, Latitude: json[0].lat,Longitude: json[0].lon})
        dispatch(settingmylocationdata({Name:json[0].name,Country: json[0].country, Latitude: json[0].lat,Longitude: json[0].lon}))
      } catch (error:any) {
     
        console.error("Failed to fetch data", error.message);
      }}
      if(locationData.Latitude != 9){
          latlong()
      }
  }, [locationData])
  return (
    <div className=" flex bottom-0 md:w-0 md:h-0 md:invisible inset-x-0 m-2 rounded-full bg-white px-4  py-2 justify-around border-2 border-gray-700 fixed z-[1000]">
    <div onClick={()=>{
      if(mylocation.Latitude == 2){
        window.alert("Please Enable Location")
      }
    }}><Link href={mylocation.Latitude == 2 ? "/" : `/Weather/${mylocation.Latitude}/${mylocation.Longitude}/${mylocation.Country}/${mylocation.Name}`}><div className="flex flex-col items-center font-semibold text-gray-700"><FaLocationDot size={20}/><span>My Weather</span> </div></Link></div>
    <Link href={"/"}><div className="flex flex-col items-center font-semibold text-gray-700"><FaHome size={20}/><span>Home</span> </div></Link>
    <Link href={"/Favourite"}><div className="flex flex-col items-center font-semibold text-gray-700"><FaStar size={20}/><span>Favourites</span> </div></Link>
  </div>
  )
}

export default Navbar