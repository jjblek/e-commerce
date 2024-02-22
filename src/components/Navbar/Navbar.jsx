import React, {useState} from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography, Avatar } from '@material-ui/core';
import { MenuRounded, ShoppingCart, Brightness4, Brightness7 } from '@material-ui/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from '@firebase/auth';
import logo from '../../assets/ecom370logo.png';
import useStyles from './styles';
import { auth } from '../Login/firebaseConfig';
// prop = cart attribute total_items from commerce.js 
const Navbar = ({ totalItems, changeTheme, isDarkTheme }) => {
    
    const classes = useStyles();
    // location hook for pathname
    const location = useLocation();
    const [userPic, setUserPic] = useState('');
    const navigate = useNavigate();
   
    onAuthStateChanged(auth, (currentUser) => {
        setUserPic(currentUser?.providerData[0].photoURL);
    });

    function handleClick() {
        if (auth.currentUser !== null) navigate('/profile');
        else navigate('/login');
    }
    
    return (
        <div>
            {/* AppBar (Navbar) Component - /material-ui/core */}
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                {/* Toolbar Component - /material-ui/core */}
                <Toolbar>
                    {/* Logo + Shop Name */}
                    <Typography className={classes.title} 
                        title={'Home'} component={Link} to="/"  
                        variant="h4" color="secondary" >
                        <img src={logo} alt="ecom370" className={classes.image} />
                        ecom370
                    </Typography>

                    {/* Hamburger Menu */}
                    <IconButton className={classes.button}>
                        <MenuRounded className={classes.icon}/>
                    </IconButton>

                    <div className={classes.grow} />
                    
                    {/* Dark Mode Button */}
                    {
                    isDarkTheme ?
                    <IconButton title={'Dark Mode'} className={classes.button} onClick={changeTheme}>
                        <Brightness7/>
                    </IconButton> : 
                    <IconButton title={'Light Mode'} className={classes.button} onClick={changeTheme}>
                        <Brightness4/>
                    </IconButton>
                    }

                    {/* Profile Button */}
                    <IconButton className={classes.button} onClick={handleClick}>
                            <Avatar className={classes.avatar} src={userPic}/>
                    </IconButton>

                    {/* only show if pathname = home route */}
                    {(location.pathname === '/' || location.pathname === '/login' || location.pathname === '/profile') && (
                        // right div: cart icon and badge 
                        <div >
                            {/* Icon Button Component - /material-ui/core */}
                            <IconButton className={classes.button} component={Link} to="/cart" title={'Cart'} aria-label="Show cart items" color="secondary">
                                {/* Badge Component - /material-ui/core */}
                                <Badge className={classes.badge} badgeContent={totalItems} color="primary" >
                                {/* Shopping Cart Icon - /material-ui/icons */}
                                <ShoppingCart className={classes.icon}/>
                                </Badge>
                            </IconButton>
                        </div>
                    )} 

                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar