"use client";
import Image from "next/image";
import { FaCloudRain, FaHome, FaStar } from "react-icons/fa";
import { MdStar } from "react-icons/md";
import { IoIosArrowForward, IoMdLocate } from "react-icons/io";
import { FaLess, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchCountryData, fetchData } from "../Store/Slice";
import { IoIosArrowBack } from "react-icons/io";
import { TiDelete } from "react-icons/ti";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaLocationDot } from "react-icons/fa6";
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
interface Filter {
  timezone?: string;
  cou_name_en?: string;
}
export default function Home() {
  const [pageno, setPageno] = useState<number>(0);
  const [pagenocu, setPagenocu] = useState<number>(1);
  const [togglecu, setTogglecu] = useState<boolean>(false);
  const [toggletz, setToggletz] = useState<boolean>(false);
  const [toggleh, setToggleh] = useState<boolean>(false);
  const [filter, setFilter] = useState<Filter>({});
  const [Favlist, setFavlist] = useState<Object[]>([]);
  const [searchResults, setSearchResults] = useState<unknown[]>([]);
  const [searchterm, setSearchterm] = useState<string>("");
  const data: any[] = useAppSelector((state) => state.datastore.data);



  const mylocation: object = useAppSelector((state) => state.weatherstore.mylocation);
  const countrydata: any[] = useAppSelector(
    (state) => state.datastore.countryData
  );
  const timezonedata: any[] = useAppSelector(
    (state) => state.datastore.timeZoneData
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData(filter, pageno));
    dispatch(fetchCountryData(pagenocu))
  }, [pageno, filter]);


  useEffect(() => {
    if (togglecu) {
      dispatch(fetchCountryData(pagenocu));
    }
  }, [togglecu, pagenocu]);

  useEffect(() => {
    if (searchterm === "") {
      setSearchResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=name%2Ctimezone%2Ccou_name_en%2Ccoordinates&where=startswith(name%2C%20%22${searchterm}%22)&limit=100`
        );
        const json = await res.json();
        setSearchResults(json.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const timeoutId = setTimeout(fetchData, 300); // Debounce time
    return () => clearTimeout(timeoutId); // Cleanup function to cancel previous request
  }, [searchterm]);

  function SetHistory(item:Object){

      localStorage.setItem(`histlat=${item.coordinates.lat}lon=${item.coordinates.lon}`, JSON.stringify(item))

  }
  useEffect(() => {
    function getLocalStorageItemsStartingWith(prefix: string) {
      const items:object = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key:unknown = localStorage.key(i);
        if (key.startsWith(prefix)) {
          const value = localStorage.getItem(key);
          items[key] = value;
        }
      }
      return items;
    }

    // Usage
    const itemsStartingWithPrefix = getLocalStorageItemsStartingWith("hist");
    const favvalues = Object.values(itemsStartingWithPrefix)
    const favlist = favvalues.map((item)=>JSON.parse(item))
    // Create a Set with custom comparison logic
const setOfObjects = new Set(favlist.map((item) => JSON.stringify(item)));

// Convert the Set back to an array of unique objects
const uniqueArray = Array.from(setOfObjects).map((item) => JSON.parse(item));
    setFavlist(uniqueArray)
    
  }, [toggleh]);
  function RemoveHistory(item){
    console.log(`histlat=${item.coordinates.lat}lon=${item.coordinates.lon}`)
    localStorage.removeItem(`histlat=${item.coordinates.lat}lon=${item.coordinates.lon}`);
    const newfavlist = Favlist.filter((d)=>d!=item)
    
    setFavlist(newfavlist)

  }


  

  return (
    <>
     <div style={{backgroundImage: 'url("https://cdn.pixabay.com/photo/2012/08/27/14/19/mountains-55067_1280.png")',
                    backgroundRepeat: "no-repeat"}} className="p-2 md:bg-cover md:drop-shadow-lg  md:p-32 lg:px-60 xl:px-80 md:px-40 py-4">
      <div className="self-start md:flex md:justify-between md:items-center  justify-center  relative  md:py-5 backdrop-blur-lg bg-black backdrop-filter rounded-md bg-opacity-50  text-white p-2 drop-shadow-lg font-bold ">
        <div className="flex  items-center space-x-2"><FaCloudRain size={30}/> <span className="text-white">RainOrain</span></div>
        <div className=" flex bottom-0 md:space-x-4 w-0 h-0 invisible md:visible md:h-auto md:w-auto md:items-center  md:m-2 m-0 rounded-full  justify-around text-white ">
    <Link href={"/"}><div className="flex flex-row items-center space-x-2 font-semibold  hover:text-slate-200 "><span>Home</span> </div></Link>
    <Link href={Object.keys(mylocation).length === 0 ? "/" : `/Weather/${mylocation.Latitude}/${mylocation.Longitude}/${mylocation.Country}/${mylocation.Name}`}><div className="flex flex-row space-x-2 items-center font-semibold hover:text-slate-200 "><span>My City</span> </div></Link>
    <Link href={"/Favourite"}><div className="flex flex-row items-center space-x-2 font-semibold  hover:text-slate-200 "><span>Favourites</span> </div></Link>
  </div>
      </div>
      <section className="flex border-2 mt-2 rounded-md bg-white  items-center">
        <input
        onFocus={()=>{setToggleh(true)}}
        onBlur={()=>{setTimeout(()=>{setToggleh(false)},100)}}
          onChange={(e) => {
            let inputValue = e.target.value;
            e.target.value =
              inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
            setSearchterm(e.target.value);
          }}
          className=" text-md capitalize font-semibold  p-2 h-full outline-none border-none placeholder:text-base   w-full "
          placeholder="Type City Name"
        />
        <FaSearch size={20} className="mx-2 text-[#4682B4]" />
      </section>
          
      {searchResults.length > 1 && (
        <section className="border-2 absolute  md:left-40 md:right-40 lg:left-60 lg:right-60 xl:left-80 xl:right-80   rounded-md right-2 mt-2 left-2  bg-white z-[1001] ">
          {searchResults.map((item: any, index) => (
           <Link onClick={()=>{SetHistory(item)}} href={`/Weather/${item.coordinates.lat}/${item.coordinates.lon}/${item.cou_name_en}/${item.name}`} key={index}> <section
              className="flex flex-col text-wrap break-words items-start   text-md font-semibold rounded-sm p-2  "
              key={index}
            >
              <div className="font-semibold">{item.name}</div>
              <div className="font-light text-sm">{item.cou_name_en}</div>
      
            </section>
            </Link>
          ))}
        </section>
      )}
      
      {Favlist.length>0  && (
        <section className="border-2  md:border-none rounded-md py-2   mt-2 md:bg-none   bg-white md:bg-transparent ">
          <span className="text-lg font-semibold p-2 my-2 md:invisible md:hidden">Recents</span>
          <div className="md:flex md:flex-wrap  md:space-x-2 md:text-white ">
          {Favlist.map((item: any, index) => (
            <div key={index} className="flex  items-center md:rounded-lg  md:my-1 md:backdrop-filter md:backdrop-blur-md md:bg-black md:bg-opacity-50   md:space-x-1 md:bg-none justify-between w-fit">
           <Link  href={`/Weather/${item.coordinates.lat}/${item.coordinates.lon}/${item.cou_name_en}/${item.name}`} key={index}> <section
              className="flex   drop-shadow-md text-wrap break-words  w-full space-x-3  text-md font-light rounded-sm p-2  md:text-white text-gray-950"
              
            >
              <div className="md:flex ">{item.name}, {item.cou_name_en}</div>
             
        
            
            </section>
            </Link>
            <div className="px-2 text-lg cursor-pointer" onClick={()=>{RemoveHistory(item)}}>X</div>
            </div>
          ))}
          </div>
        </section>)}
      </div>
  
    <main className=" min-h-screen bg-gray-100 pt-4  lg:px-60 xl:px-80 md:px-40 md:py-10 pb-[70px] relative p-2">
    <span className="text-lg font-bold p-2 py-4 my-4">Locations</span>
          <section className="bg-white rounded-md p-2">
          
      <section className="mt-2 flex space-x-2  items-center font-semibold">
       

        {filter && filter.cou_name_en && (
          <div className="flex space-x-2 cursor-pointer hover:bg-slate-300  rounded-md bg-slate-200 p-2 items-center">
            {filter.cou_name_en}
            <TiDelete
              className="text-lg  text-gray-400"
              onClick={() => {
                setFilter((prevState) => {
                  const newState = { ...prevState };
                  delete newState.cou_name_en;
                  return newState;
                });
              }}
            />
          </div>
        )}
        {filter && filter.timezone && (
          <div className="flex space-x-2  rounded-md bg-blue-200 p-2  items-center">
            {filter.timezone}{" "}
            <TiDelete
              className="text-lg text-gray-400"
              onClick={() => {
                setFilter((prevState) => {
                  const newState = { ...prevState };
                  delete newState.timezone;
                  return newState;
                });
              }}
            />
          </div>
        )}
      </section>
      <section>
        <div className="grid grid-cols-3  space-x-1 gap-[1px] items-center justify-between mt-2 text-white  font-semibold ">
          <span className="bg-[#4784b6] rounded-md p-2">City </span>
          <div
            onClick={() => {
              setTogglecu((prev) => !prev);
              setToggletz(() => false);
            }}
            className="bg-[#4784b6] p-2 rounded-md flex justify-between cursor-pointer items-center transition delay-100justify-between space-x-2"
          >
            Country
            {!togglecu ? <IoIosArrowDown size={18} /> : <IoIosArrowUp />}
          </div>
          <div
            onClick={() => {
              setToggletz((prev) => !prev);
              setTogglecu(() => false);
            }}
            className="bg-[#4784b6] p-2 flex rounded-md items-center cursor-pointer transition delay-100 justify-between space-x-2"
          >
            TimeZone{" "}
            {!toggletz ? <IoIosArrowDown size={18} /> : <IoIosArrowUp />}
          </div>
        </div>
        {togglecu && (
          <section className="flex  absolute right-4 md:mx-[9rem] lg:mx-[14rem] xl:mx-[19rem] left-4 border bg-white   rounded-lg items-center   justify-center  my-2 ">
            <div
              className={`${
                pagenocu == 1 ? "invisible" : "visible"
              } text-xl h-full p-1 flex items-center`}
            >
              <span
                onClick={() => {
                  setPagenocu((prev) => prev - 20);
                }}
                className="h-full cursor-pointer"
              >
                <IoIosArrowBack   />{" "}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-1  text-center will-change-auto  bg-white justify-center items-center   grid-container py-4 px-1 transition-transform transform ease-in-out delay-75 duration-200">
              {countrydata &&
                countrydata.map((item, index) => (
                  <span
                  className="font-normal  cursor-pointer hover:bg-gray-800 text-base self-end  p-1 text-white border h-full rounded-md bg-gray-500"
                    onClick={() => {
                      setFilter((prev) => ({
                        ...prev,
                        cou_name_en: item.cou_name_en,
                      }));
                      setTogglecu(() => false);
                    }}
                    key={index}
                  >
                    {item.cou_name_en}
                  </span>
                ))}
            </div>
            <div
              className={`${
                countrydata.length < 20 ? "invisible" : "visible"
              } text-xl h-full  p-1 flex items-center`}
            >
              <span
                onClick={() => {
                  setPagenocu((prev) => prev + 20);
                }}
                className="h-full cursor-pointer"
              >
                <IoIosArrowForward   />{" "}
              </span>
            </div>
          </section>
        )}
        {toggletz && (
          <section className="flex absolute right-4 left-4 lg:max-w-fit md:right-10 md:left-10 lg:right-16 xl:left-auto lg:left-16 xl:right-auto md:justify-center rounded-lg text-center items-center will-change-auto    grid-container py-2   bg-gray-500 text-wrap whitespace-normal    justify-between my-2  ">
            <div className="grid grid-cols-4 md:grid-cols-10 gap-2  font-normal text-base self-end  p-1 text-white  h-full rounded-lg ">
              {timezonedata &&
                timezonedata.map((item, index) => (
                  <span
                    onClick={() => {
                      setFilter((prev) => ({ ...prev, timezone: item }));
                      setToggletz(() => false);
                    }}
                    className="cursor-pointer hover:text-gray-200"
                    key={index}
                  >
                    {item}
                  </span>
                ))}
            </div>
          </section>
        )}
        {data.length==0 && <span className="text-center text-lg w-full p-4 flex justify-center">No Record Found</span>}
        {data &&
          data.map((item, index) => (
            <Link
            onClick={()=>{SetHistory(item)}}
            href={`/Weather/${item.coordinates.lat}/${item.coordinates.lon}/${item.cou_name_en}/${item.name}`}
              key={index}
              className="grid grid-cols-3 space-x-1 hover:bg-gray-200  py-2 px-1 rounded-md bg-gray-100 text-left text-gray-900 gap-[1px] items-center justify-between mt-2 text-wrap  font-semibold"
            >
              <span className="p-1 text-wrap whitespace-normal break-words">
                {item.name}
              </span>
              <span className="p-1 text-wrap whitespace-normal break-words">
                {item.cou_name_en}
              </span>
              <span className="p-1 text-wrap whitespace-normal break-words">
                {item.timezone}
              </span>
            </Link>
          ))}
        <div className="align-middle flex justify-between space-x-2  my-2">
          <div
            onClick={() => {
              setPageno((prev) => prev - 20);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`${
              pageno === 0 && data.length==0  ? "invisible" : "visible"
            } flex space-x-2 font-bold hover:text-gray-700 cursor-pointer py-2 text-gray-500`}
          >
            <button>&lt;</button>
            <span>Prev</span>
          </div>
          {data && data.length<20 ? "" :  <div
            onClick={() => {
              setPageno((prev) => prev + 20);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={`flex space-x-2 hover:text-gray-700 cursor-pointer py-2  font-bold text-gray-500`}
          >
            <span>Next</span>
            <button>&gt;</button>
          </div>} 
       
        </div>
      </section>
      </section>
    </main>
    </>
  );
}
