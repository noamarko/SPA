import React, { useState, useEffect } from 'react';
import InputDetails from './Users/InputDetailsComponent';
import OverView from './Overview/OverViewComponent';
import {Switch, Route} from 'react-router-dom'
import { COUNTRY_DATA } from "../countriesData";
import api from '../api';

/* Creating the lists that each page will use
  countryList ---> Overview page
  countryNameList ---> Input Details  */



export function AppRouter(props){


  
  const [countryList, setCountryList] = useState([]);
  const [countryNameList, setCountryNameList] = useState([]);
  const [sumOfCountryUsers, setSumOfCountryUsers] = useState(0);

  

  const extractCountryData = (countriesDataFromServer) =>{

    const hashMapCountries = {};
    let usersSum = 0;
    
    COUNTRY_DATA.forEach(countryFromJson => {
      hashMapCountries[countryFromJson.name] = {
        lat:countryFromJson.latlng[0],
        lng:countryFromJson.latlng[1]
      };
    });

    const extendedCountriesList = countriesDataFromServer.map(
      (countryFromServer)=>{
        usersSum += countryFromServer.users;
        return {...countryFromServer, ...hashMapCountries[countryFromServer.country]}
      })
    setSumOfCountryUsers(usersSum);
    setCountryNameList(Object.keys(hashMapCountries));
    setCountryList(extendedCountriesList);
  }

  const getCountryListFromServer = async () =>{
    await api.get('/')
      .then(res => {
        const data = extractCountryData(res.data);
        return data
      }).catch((error) => {
        console.log(error);
      });

  }

  useEffect(() => {
    getCountryListFromServer();
  },[])

    return(
      <div style={{position:'fixed', left:'15%', height:'80%', width:'100%', float:'left'}}>
        <Switch>
            <Route path="/InputDetails">
                <InputDetails data={countryNameList} getCountryListFromServer={getCountryListFromServer}/>
            </Route>
            <Route path="/">
              <OverView dataList={countryList} usersData={sumOfCountryUsers}/>
            </Route>
          </Switch>
        </div>
    );
}
export default AppRouter;