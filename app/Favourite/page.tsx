"use client";
import { useAppSelector } from "@/Store/hooks";
import { Namecity } from "@/Utils/interfaces";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCloudRain } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";

interface FavoriteData {
  coordinates: {
      lon: number;
      lat: number;
  };
  name: string;
  country: string;
}
export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const mylocation: Namecity = useAppSelector((state) => state.weatherstore.mylocation);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Favlist, setFavlist] = useState<FavoriteData[]>([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    function getLocalStorageItemsStartingWith(prefix: string) {
      const items: { [key: string]: string | null } = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i); // key will be of type string | null
        if (key !== null && key.startsWith(prefix)) {
          const value = localStorage.getItem(key);
          if (value !== null) {
            items[key] = value;
          }
        }
      }
      return items;
    }

    // Usage
    const itemsStartingWithPrefix = getLocalStorageItemsStartingWith("fav");
    const favvalues = Object.values(itemsStartingWithPrefix)
    const favlist = favvalues.map((item)=>{if(item!== null){return JSON.parse(item)
    }})
    setFavlist(favlist)

  }, []);

  return (
    <main className="pb-[70px] md:py-10 lg:px-60 xl:px-80  md:min-h-screen md:px-40  bg-blue-400 bg-opacity-10 relative p-2">
      <div className="self-start md:flex md:justify-between md:items-center  justify-center  relative  md:py-5 backdrop-blur-lg bg-black backdrop-filter rounded-md bg-opacity-50  text-white p-2 drop-shadow-lg font-bold ">
        <div className="flex  items-center space-x-2"><FaCloudRain size={30}/> <span className="text-white">RainOrain</span></div>
        <div className=" flex bottom-0 md:space-x-4 w-0 h-0 invisible md:visible md:h-auto md:w-auto md:items-center  md:m-2 m-0 rounded-full  justify-around text-white ">
    <Link href={"/"}><div className="flex flex-row items-center space-x-2 font-semibold  hover:text-slate-200 "><span>Home</span> </div></Link>
    <Link href={Object.keys(mylocation).length === 0 ? "/" : `/Weather/${mylocation.Latitude}/${mylocation.Longitude}/${mylocation.Country}/${mylocation.Name}`}><div className="flex flex-row space-x-2 items-center font-semibold hover:text-slate-200 "><span>My City</span> </div></Link>
    <Link href={"/Favourite"}><div className="flex flex-row items-center space-x-2 font-semibold  hover:text-slate-200 "><span>Favourites</span> </div></Link>
  </div>
      </div>
      <div className="rounded-md my-2 p-4 h-screen bg-white border  font-bold ">
     
        <div className="  drop-shadow-lg border-gray-200 py-2 ">
        {Favlist.length>0  ? Favlist.map((item,index)=><Link href={`/Weather/${item.coordinates && item.coordinates.lat}/${item.coordinates && item.coordinates.lon}/${item.country && item.country}/${item.name && item.name}`} className="flex  cursor-pointer justify-between  items-center  px-2 text-center text-lg items-start font-semibold" key={index}>
            <span className="my-2">{item.name}, {item.country}</span>
            <IoChevronForward/>
        </Link>):<span className="text-center flex justify-center text-gray-500 my-4 "> No Favourites Selected </span>}
        </div>
      </div>
    </main>
  );
}
