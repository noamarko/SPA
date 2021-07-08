import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import countryList from 'react-select-country-list'
import api from '../../api';
import { withRouter } from "react-router-dom";


/*Controls the Input Details page
  executes POST method to update the server
  or
  executes DELETE method to erase country from server
  */

function InputDetails(props) {


    const [amountOfUsers, setAmountOfUsers] = useState(null);
    const [msg, setMsg] = useState('');
    const [countryName, setCountryName] = useState('');


    const options = useMemo(() => countryList().getData(), []);//retrieving country list for the select bar

    const sendDetailsFromServer = async (event) => {//sending added country to server || deleting country
        event.preventDefault();
        if (countryName.label) {
            if (event.target.innerText === 'Submit') {
                if (amountOfUsers > 0) {
                    const countryDetails = {
                        'country': countryName.label,
                        'users': amountOfUsers
                    }
                    api.post('/', countryDetails).then(response => {
                        if (response.status === 200) {
                            setMsg('Details posted successfuly!');
                            setAmountOfUsers(null);
                            setCountryName('');
                            
                        }
                        else
                            setMsg('Error: ' + countryDetails + ' posted unsuccessfuly!');
                    })
                }
                else
                    setMsg('Error: Users must be larger than 0!') 
            } else {
                api.delete('/' + countryName.label).then(res => {
                    if (res.status === 200) {
                        props.update(countryName.label);
                        setMsg('Deleted Successfuly!');
                        setAmountOfUsers(null);
                        setCountryName('');
                    }
                    else
                        setMsg('Error in deleting ' + countryName.label);
                })
            }
        } else
            setMsg('Error: Must select a country!');
    };

    const changeHandler = (value) => {
        setMsg('');
        setCountryName(value)
    };

    const handleUsers = (event) => {
        if(parseInt(event.target.value)<0){
            setMsg('Error: Users can not be lower than 0!');
            setAmountOfUsers(0);
        }
        else{
            setMsg('');
            setAmountOfUsers(parseInt(event.target.value));
        }
    }


    return (
        <div>
            <h2 style={{ color: 'black' }}>Input Details</h2>
            <div style={{ position: 'sticky', width:'230px' }}>
                <form id="example-form">
                    <Select options={options} value={countryName} placeholder='Country' onChange={changeHandler} />
                    <label>
                        <input
                            type="number"
                            onChange={handleUsers}
                            value={amountOfUsers}
                            placeholder="Amount of users..."
                            style={{ position: 'relative', }} />
                    </label>
                    <br />
                    <button value="Submit" onClick={sendDetailsFromServer} style={{ position: 'relative', color: 'black', backgroundColor: 'turquoise' }}>
                        Submit</button>
                    <button value='Delete' onClick={sendDetailsFromServer} style={{ position: 'relative', left: '5%' }}>Delete</button>
                </form>
                {msg.includes('Error') ? <div style={{ textAlign: 'left', color: 'red' }}>{msg}</div>
                    :
                    <div style={{ textAlign: 'left', color: 'blue' }}>{msg}</div>}
                <h6 style={{ fontSize: '12px', color: 'black' }}>
                    * If country exists - new value will<br/>be added to the old value.
                    <br/>
                    * Can erase picked country.
                </h6>
            </div>
        </div>
    );
}   

    export default withRouter(InputDetails);