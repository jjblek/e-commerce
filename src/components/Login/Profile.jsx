import React, { useState } from 'react'
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { auth } from './firebaseConfig';
import { Button, Paper, Typography } from '@material-ui/core';
import useStyles from './styles';
import { Avatar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const classes = useStyles();
    
    const [user, setUser] = useState({});
    const [userPic, setUserPic] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userProvider, setUserProvider] = useState('');
    
    const navigate = useNavigate();
    
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setUserPic(currentUser?.providerData[0].photoURL);
        setUserEmail(currentUser?.providerData[0].email);
        setUserProvider(currentUser?.providerData[0].providerId);
        console.log(user);
    });

    const logout = async () => {
        await signOut(auth);
        navigate('/');
    };
    return (
        <>
        <div className={classes.toolbar}/>
        <Paper className={classes.form} align="center">
            <Typography className={classes.title} variant='h5'> 
                 User Logged In:
            </Typography>
            
            <Typography className={classes.title} variant='h6'>{userEmail + ' is signed in with ' + userProvider}</Typography>
            <Avatar src={userPic}/>
            
            <Button 
                className={classes.spacing} 
                size="medium" 
                type="button" 
                variant="contained" 
                color="primary" 
                onClick={logout}> 
                Sign Out 
            </Button>
            
        </Paper>
        </>
    )
}

export default Profile;
