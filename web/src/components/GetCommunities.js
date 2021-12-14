import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'antd';
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

    let options = result.map(item => {
        return {
            label: item.name,
            value: item.id
        }
    })

    function handleChange(value) {
        console.log(`selected ${value}`);
        if (props.isCreatePost) {
            props.onSelectCommunity(value)
        } else {
            navigate(`/communities/${value}`);
        }
    }

    return ( 
        <Select 
            defaultValue="Communities" 
            style={{ width: props.isCreatePost ? "100%" : 180, marginBottom: "30px"}} 
            options={options} 
            onSelect={handleChange}
        >
        </Select>
     );
}
 
export default GetCommunities;