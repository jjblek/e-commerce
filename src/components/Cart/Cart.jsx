import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import CartItem from './CartItem/CartItem';
import useStyles from './styles';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart}) => {
    
    const classes = useStyles();
    
    // if Cart is Empty, display notice and link to products
    const EmptyCart = () => (
        <Container className={classes.container}>
        <Typography variant="subtitle1">{"Your shopping cart is empty, "} 
        <Link to="/" className={classes.Link}>add some items</Link>!
        </Typography>
        </Container>
        
    );
    
    // if Cart is Filled, display cart items
    const FilledCart = () => (
        <div>
            {/* Grid Component - node_modules/material-ui/core */}
            <Grid container spacing={2}> {cart.line_items.map((item) => (
                // map each line item (cart attribute from commerce.js) as a list of JSX elements
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                    {/* Cart Item Component - components/Cart/CartItem/CartItem */}
                    <CartItem item={item} 
                    onUpdateCartQty={handleUpdateCartQty} 
                    onRemoveFromCart={handleRemoveFromCart} />
                </Grid> 
            ))}
            </Grid>

            {/* div to display subtotal + empty cart and checkout buttons */}
            <div className={classes.cartDetails}>   
                {/* Display Subtotal */}
                <Typography className={classes.title} variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                {/* div for buttons */}
                <div>
                    {/* button for empty cart */}
                    <Button className={classes.emptyButton} 
                        size="medium" 
                        type="button" 
                        variant="contained" 
                        color="secondary" 
                        onClick={handleEmptyCart}>Empty Cart
                    </Button>
                    
                    {/* button for checkout */}
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} 
                        size="medium" 
                        type="button" 
                        variant="contained" 
                        color="primary">Checkout
                    </Button>
                </div>
            </div>
        </div>
    );

    if(!cart.line_items) return 'Loading...'                   
    
    // Cart Layout               
    return (
        // Wrap everything in a container component 
        <Container>
            {/* push content under navbar */}
            <div className={classes.toolbar} />
            {/* display message */}
            <Typography 
                className={classes.title} 
                variant="h4" 
                gutterBottom>Shopping Cart
            </Typography>
            {/* if cart is empty then show EmptyCart else show FilledCart */}
            { !cart.line_items.length ? <EmptyCart /> : <FilledCart /> }
        </Container>
    );
}

export default Cart