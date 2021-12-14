import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'antd';
import { GetPostTypes as GetPostTypesRequest } from '../utils/helper';

const { Option } = Select;

const GetPostTypes = (props) => {

    const loginState = useSelector((state) => state.login);
    const navigate = useNavigate() 
    const dispatch = useDispatch()
    
    const [options, setOptions] = useState([]);
  
    useEffect(() => {
        console.log(props.id)
        GetPostTypesRequest({communityId: props.id, token: loginState.token}, dispatch)
        .then(result => {
            setOptions(result.data.map(item => {
                return {
                    label: item.name,
                    value: item.id
                }})
            )
        });
    }, [])

    function handleChange(value) {
        console.log(`selected ${value}`);
        props.onSelectPostType(value)
    }

    return ( 
        <Select 
            disabled={!props.id} 
            defaultValue="Post Types" 
            style={{ width: "100%", marginBottom: "30px"}} 
            options={options} 
            onSelect={handleChange}
        >
        </Select>
     );
}
 
export default GetPostTypes;