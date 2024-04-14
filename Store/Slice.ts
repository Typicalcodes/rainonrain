import { ThunkDispatch, createSlice } from '@reduxjs/toolkit';

export const dataSlice = createSlice({
  name: 'datastore',
  initialState: {
    data: [],
    errorvalue: false,
    countryData: [],
    timeZoneData: ["Europe", "America", "Asia", "Africa", "Australia", "Pacific", "Indian", "Atlantic", "Arctic", "Antarctica"],
    datafilter: {},

  },
  reducers: {
    fetchDataSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = data;
      state.errorvalue = false;
    },
    fetchDataFailure: (state) => {
      state.errorvalue = true;
    },
    fetchCountryDataSuccess: (state, action) => {
      const { countryData } = action.payload;
      state.countryData = countryData;
      state.errorvalue = false;
    },
    fetchCountryDataFailure: (state) => {
      state.errorvalue = true;
    },
    setdatapage: (state, action) => {
      // Modify state accordingly based on action payload
    }
  }
});

// Async action creators
export const fetchData = (filter:object,pageno:number) => async (dispatch: ThunkDispatch<any, any, any>) => {
    let where = null;
    let country = null;
    if(filter.timezone){
        where = `&where=timezone%20like%20%27${filter.timezone}%25%27%20`
    }
    if(filter.cou_name_en){
        country = `&refine=cou_name_en%3A${filter.cou_name_en}`
    }
       try {
       
    const res = await fetch(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=name%2Ctimezone%2Ccou_name_en%2C%20coordinates${where !== null ? where : ''}&limit=20&offset=${pageno}${country !== null ? country : ''}`
    );
    const json = await res.json();
   
    dispatch(fetchDataSuccess({ data: json.results }));
  } catch (error:any) {
    dispatch(fetchDataFailure());
    console.error("Failed to fetch data", error.message);
  }
};

export const fetchCountryData = (pageno:number) => async (dispatch: ThunkDispatch<any, any, any>) => {
  try {
    const res = await fetch(
      `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?select=cou_name_en&group_by=cou_name_en&limit=20&offset=${1+pageno}`
    );
    const json = await res.json();

    dispatch(fetchCountryDataSuccess({ countryData: json.results }));
  } catch (error:any) {
    dispatch(fetchCountryDataFailure());
    console.error("Failed to fetch country data", error.message);
  }
};

export const { fetchDataSuccess, fetchDataFailure, fetchCountryDataSuccess, fetchCountryDataFailure, setdatapage } = dataSlice.actions;

export default dataSlice.reducer;
