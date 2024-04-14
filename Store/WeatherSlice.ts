import { ThunkDispatch, createSlice } from '@reduxjs/toolkit';

export const WeatherSlice = createSlice({
  name: 'datastore',
  initialState: {
    Wdata: {},
    errorvalue: false,
    forcast:[],
    mylocation:{}

  },
  reducers: {
    fetchWDataSuccess: (state, action) => {
      const { data } = action.payload;

      state.Wdata = data;
      state.errorvalue = false;
    },
    fetchFDataSuccess: (state, action) => {
        const { data } = action.payload;
  
        state.forcast = data;
        state.errorvalue = false;
      },
    fetchDataFailure: (state) => {
      state.errorvalue = true;
    },
    setdatanull: (state) =>{
      state.Wdata = {}
    },
    setmylocation: (state,action)=>{
      state.mylocation = action.payload
    }
  }
});

// Async action creators
export const fetchWData = (lat:number,lon:number) => async (dispatch: ThunkDispatch<any, any, any>) => {
       try {
       
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=51690717b0efc26dcc1cbac748cb55ae`
    );
    const json = await res.json();
   
    const res2 = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=51690717b0efc26dcc1cbac748cb55ae`
    );
    const json2 = await res2.json();
   
    dispatch(fetchWDataSuccess({ data: json }));
    dispatch(fetchFDataSuccess({ data: json2.list }));
  } catch (error:any) {
    dispatch(fetchDataFailure());
    console.error("Failed to fetch data", error.message);
  }

}
export const settingdatanull = () => (dispatch: ThunkDispatch<any, any, any>) => {
  dispatch(setdatanull())
}
export const settingmylocationdata = (location:{Name: string,Country: string, Latitude: Number, Longitude : Number }) => (dispatch: ThunkDispatch<any, any, any>) => {
  dispatch(setmylocation(location))
}

export const { fetchWDataSuccess, fetchDataFailure, fetchFDataSuccess,setdatanull, setmylocation} = WeatherSlice.actions;

export default WeatherSlice.reducer;
