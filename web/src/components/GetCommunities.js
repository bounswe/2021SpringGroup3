import React, { useParams, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Select } from 'antd';
import { GetCommunities as GetCommunitiesRequest } from '../utils/helper';

const { Option } = Select;

const GetCommunities = (props) => {
    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate() 
    const dispatch = useDispatch()
    
    const [result, setResult] = useState([]);
  
    useEffect(() => {
        GetCommunitiesRequest({token: loginState.token}, dispatch)
        .then( result => setResult(result.data));
    }, [])

    console.log("navbar select: ",result)

    let options = result.map(item => {
        return {
            label: item.name,
            value: item.id
        }
    })

    function handleChange(value) {
        console.log(`selected ${value}`);
        navigate(`/communities/${value}`);
    }

    return ( 
        <Select 
            defaultValue="Communities" 
            style={{ width: 120 }} 
            options={options} 
            onSelect={handleChange}
        >
        </Select>
     );
}
 
export default GetCommunities;