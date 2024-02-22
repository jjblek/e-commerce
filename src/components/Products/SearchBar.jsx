import React, { useState } from 'react'
import { TextField, InputAdornment, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { Search, } from '@mui/icons-material';
import useStyles from './styles';

const SearchBar = ({ categories }) => {

    const classes = useStyles();
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");
    const handleSearch = (event) => {
        setSearch(event.target.value)
    }
    const handleFilter = (event) => {
        setFilter(event.target.value)
    }
    
    console.log(search)

    // retrieve categories
    // const categorySlug = searchTerm
    // commerce.categories.retrieve(categorySlug, { type: 'slug' }).then(category => console.log(category));

    return (

        <div position="fixed" className={classes.searchBar}>

            <FormControl variant="outlined" size="small" >

            <InputLabel id="category-label">All</InputLabel>

                <Select 
                    className={classes.select}
                    labelId="category-label"
                    id="category-select"
                    value={filter}
                    label="All"
                    onChange={handleFilter}
                    autoWidth>

                    <MenuItem value="All">
                        <em>All</em>
                    </MenuItem>

                    {categories.map((category, index) => ( // map each category to a menu item
                        <MenuItem value={category.name} button={true} key={index}>{category.name}</MenuItem>
                    ))}

                </Select>
            </FormControl>
            
            <TextField 
                className={classes.search}
                label="Search"
                size="small"
                value={search}  
                variant="outlined"
                onChange={handleSearch} 
                InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
                }}>
            </TextField> 
        </div>
    )
}

export default SearchBar
