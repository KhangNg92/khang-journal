import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch } from 'react-redux';
import { clearUpdatedPostSlice } from '../redux/slices/postsSlice';

const SearchInput = ({ title, postChange, updatedPost }) => {
    return (
        <div style={{ marginTop: 50, marginLeft: '40%' }}>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={title}
                sx={{ width: 300 }}
                renderInput={(params) => {
                    postChange(params.inputProps.value)
                    return <TextField {...params}
                        autoFocus
                        label="Search your Title Here"
                    />
                }}
            />
        </div>
    )
}

export default SearchInput
