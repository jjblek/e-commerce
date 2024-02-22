import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './Product/Product';
import SearchBar from './SearchBar';
import useStyles from './styles';

// import { commerce } from '../../lib/commerce';
const Products = ({ products, onAddToCart, categories }) => {

    const classes = useStyles();
    
    return (    
    <main className={classes.content}>
        
        <SearchBar categories={categories}/>
        {/* Grid Component - from material-ui/core */}
        <Grid container justifyContent="center" spacing={3}>
            {/* fetch products from commerce.js API */}
            {products.map((product) => ( // map each product as list of JSX elements
                // Grid Component - material-ui/core 
                // 12 = 1xN grid, 6 = 2xN grid, 4 = 3xN grid, 3 = 4xN grid
                <Grid item key={product.id} xs={12} sm={6} md={3} lg={2}>
                    {/* Product Component - from Product/Product */}
                    <Product product={product} onAddToCart={onAddToCart} />
                </Grid>
            ))}
        </Grid>
    </main>
    );
}

export default Products;