import React, {useState, useEffect, createRef } from 'react';
import { createTheme, CssBaseline, IconButton } from '@material-ui/core';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { commerce } from './lib/commerce';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Checkout from './components/CheckoutForm/Checkout/Checkout';
import Login from './components/Login/Login';
import Profile from './components/Login/Profile';
import { SnackbarProvider } from 'notistack';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import { ThemeProvider } from "@material-ui/styles";
import { blue, deepPurple, grey } from "@material-ui/core/colors";

const light = {
    palette: {
        type: "light",
        primary: {
            main: deepPurple[400],
            light: deepPurple[200],
          },
          secondary: {
            main: grey[600],
            light: grey[50],
          },
          info: {
            main: grey[50],
            dark: grey[800]
          },
          success: {
            main: blue[400],
          },
    }
}

const dark = {
    palette: {
        type: "dark",
        primary: {
            main: deepPurple[400],
            light: deepPurple[200],
          },
          secondary: {
            main: grey[50],
            light: grey[800],
          },
          info: {
            main: grey[50],
            dark: grey[800]
          },
          success: {
            main: blue[400],
          },
    }
}

const App = (user, userPic) => {
    
    // Set states
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const [isDarkTheme, setIsDarkTheme] = useState(false);

    // This function is triggered when the Switch component is toggled
    const changeTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };
    
    // List all categories
    // commerce.categories.list().then(categories => console.log(categories.data));
    
    // Retrieve all categories
    // const categorySlug = 'electronics'
    // commerce.categories.retrieve(categorySlug, { type: 'slug' }).then(category => console.log(category));
    
    const fetchProducts = async () => {
        // get products and set to list state
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    //const refreshProducts = async () => {
    //    const newProducts = await commerce.products.refresh();
    //    setCart(newProducts);
    //}

    const fetchCategories = async () => {
        // get categories and set to list state
        const { data } = await commerce.categories.list();
        setCategories(data);
    }

    const fetchCart = async () => {
        // get cart and set to state
        setCart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart)
    }
    
    const handleEmptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    }

    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }
    
    const handleCaptureCheckout = async (checkoutTokenID, newOrder) => {
        try{
            const incomingOrder = await commerce.checkout.capture(checkoutTokenID, newOrder);
            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    // useEffect hook to fetch products and cart
    useEffect(() => {
        fetchProducts();
        fetchCategories();
        fetchCart();
    }, []); // dependency list set to empty, only runs on start

    // override snackbar styles
    const useStyles = makeStyles(({palette}) => ({
        overriddenSuccess: { backgroundColor: palette.primary.main + "!important", },
        overriddenError: { backgroundColor: palette.secondary.main + "!important", },
    }));

    // use styles
    const classes = useStyles();
    
    // add action to all snackbars
    const notistackRef = createRef();
    const onClickDismiss = key => () => { 
    notistackRef.current.closeSnackbar(key);
    }

    return (
        <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
        <CssBaseline/>
        <SnackbarProvider
        hideIconVariant={false} 
        ref={notistackRef}
        action={(key) => (
            <IconButton
                color="info.main"
                size="small"
                aria-label="close"
                onClick={onClickDismiss(key)}>
            <Close />
            </IconButton>
        )}
        classes={{
            variantSuccess: classes.overriddenSuccess,
            variantError: classes.overriddenError,
        }}
        >
        <Router>
            <div>
                {/* Navbar Component - components/Navbar/Navbar.jsx */}
                <CssBaseline />
                <Navbar totalItems={cart.total_items}
                        changeTheme={changeTheme}
                        isDarkTheme={isDarkTheme}
                />
                {/* multiple routes */}
                <Routes>
                    <Route>
                    {/* home/products route */}
                    <Route path="/" 
                        // Products Component - components/Products/Products.jsx
                        element={<Products products={products} categories={categories}
                        onAddToCart={handleAddToCart} />}/>
                    {/* cart route */}    
                    <Route exact path="/cart" 
                        // Cart Component - components/Cart/Cart.jsx
                        element={<Cart cart={cart} 
                        handleUpdateCartQty={handleUpdateCartQty} 
                        handleRemoveFromCart={handleRemoveFromCart} 
                        handleEmptyCart={handleEmptyCart} />}/>  
                    </Route>

                    <Route path="/checkout" 
                        element={<Checkout cart={cart} order={order} 
                        onCaptureCheckout={handleCaptureCheckout} 
                        error={errorMessage}/>}>
                    </Route>
                
                    <Route path="/login" 
                        element={<Login />}>
                    </Route>

                    <Route path="/profile" 
                        element={<Profile user={user} userPic={userPic}/>}>
                    </Route>
                </Routes>
            </div>
        </Router>
        </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App
