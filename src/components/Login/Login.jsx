import React, { useState } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged, 
    createUserWithEmailAndPassword,signInWithEmailAndPassword, 
    signInWithRedirect, getRedirectResult, 
    GoogleAuthProvider, GithubAuthProvider } from '@firebase/auth';
import { useSnackbar } from 'notistack';
import { Tabs, Tab, TextField, Button, IconButton, Paper, Typography, Box, Link } from '@material-ui/core';
import { Google } from '@mui/icons-material';
import GitHubIcon from '@mui/icons-material/GitHub';
import useStyles from './styles';
import { useNavigate } from 'react-router-dom';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div {...other}>
        {value === index && <Box>{children}</Box>}
      </div>
    );
}

const Login = () => {

    const classes = useStyles();
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, setUser] = useState({});
    const [value, setValue] = useState(0);
    
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();
    
    const handleClick = (error) => {
        enqueueSnackbar(error, {
            variant: 'error',
            preventDuplicate: true,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },
        });
    };

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        console.log(user);
    });
    // register email + password
    const register = async () => {
        try { 
            const user = await createUserWithEmailAndPassword(
                auth, 
                registerEmail, 
                registerPassword
            )
            console.log(user);
            
        } catch (error) {
            if (!registerPassword) handleClick('Enter a password!');       
            if (!registerEmail) handleClick('Enter an e-mail address!');
            else if (error.code === 'auth/invalid-email') handleClick('Invalid e-mail!');
            else if (error.code === 'auth/email-already-in-use') handleClick('E-mail already exists!');
            if (error.code === 'auth/weak-password') handleClick('Password must be at least 6 characters!');       
        }
        };
    
    const login = async () => {
        try { 
            const user = await signInWithEmailAndPassword(
                auth, 
                loginEmail, 
                loginPassword
            ) 
            navigate('/profile');
            console.log(user);    
        } catch (error) {
            if (!loginPassword) handleClick('Enter a password!');
            if (!loginEmail) handleClick('Enter an e-mail address!');
            else if (error.code === 'auth/user-not-found') handleClick('E-mail not found!');
            else if (error.code === 'auth/email-already-in-use') handleClick('User already exists!');
            if (error.code === 'auth/wrong-password') handleClick('Password must be at least 6 characters!');        
        }
    };

    const googleLogin = async () => {
        try{
            // Sign in using a redirect.
            const provider = new GoogleAuthProvider();
            // Start a sign in process for an unauthenticated user.
            provider.addScope('profile');
            provider.addScope('email');
            await signInWithRedirect(auth, provider);
            // This will trigger a full page redirect away from your app

            // After returning from the redirect when your app initializes you can obtain the result
            const result = await getRedirectResult(auth);
            if (result) {
                // This is the signed-in user
                const user = result.user;
                // This gives you a Google Access Token.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                navigate('/profile');
                console.log(user, token);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const githubLogin = async () => {
        try{
            // Sign in using a redirect.
            const provider = new GithubAuthProvider();
            // Start a sign in process for an unauthenticated user.
            provider.addScope('repo');
            await signInWithRedirect(auth, provider);
            // This will trigger a full page redirect away from your app
            // After returning from the redirect when your app initializes you can obtain the result
            const result = await getRedirectResult(auth);
            if (result) {
                // This is the signed-in user
                const user = result.user;
                // This gives you a Github Access Token.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                navigate('/profile');
                console.log(user, token);
            }
        } catch (error) {
            console.log(error)
        }
    }
  

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

      
    return (
        <>
        <div className={classes.toolbar}/>
        <Box className={classes.tabs} position="relative">
            <Tabs value={value} onChange={handleChange} variant="fullWidth">
                <Tab label="Login" />
                <Tab label="Register" />
            </Tabs>
        </Box>
         
        <TabPanel value={value} index={1}>
        <Paper className={classes.form} align="center">
        <Typography className={classes.title} variant='h4'> 
            Register
        </Typography>
        <Typography className={classes.text} variant="subtitle1" onClick={handleChange}>Already have an account? Login.</Typography>
        
        <div>
            <TextField className={classes.spacing} 
                placeholder="Email..."
                variant='outlined'
                size='small' 
                onChange={(event) => {
                setRegisterEmail(event.target.value)
                }}
            />
        </div>

        <div>
            <TextField className={classes.spacing} 
                placeholder="Password..."
                variant='outlined'
                size='small' 
                onChange={(event) => {
                setRegisterPassword(event.target.value)
                }}
            />
        </div>
        
        <Button 
            className={classes.spacing} 
            size="medium" 
            type="button" 
            variant="contained" 
            color="primary"
            onClick={register}> 
            Register 
        </Button>
       
        </Paper>
        </TabPanel>
        <TabPanel value={value} index={0}>
        <Paper className={classes.form} align="center">
            <Typography className={classes.title} variant='h4'> 
                Login 
            </Typography>
            <Typography className={classes.text} variant="subtitle1">Don't have an account? Register.</Typography>
            <div>
                <TextField className={classes.spacing} 
                    variant='outlined'
                    size='small'
                    placeholder="Email..." 
                    onChange={(event) => {
                    setLoginEmail(event.target.value)}}/>
                </div>

                <div>            
                <TextField className={classes.spacing} 
                    variant='outlined'
                    size='small'
                    placeholder="Password..." 
                    onChange={(event) => {
                    setLoginPassword(event.target.value)}}/>
                </div>
               
                <Button 
                    className={classes.spacing} 
                    size="medium" 
                    type="button" 
                    variant="contained" 
                    color="primary"
                    onClick={login}> 
                    Login 
                </Button>
              
                <div>
                <Typography className={classes.text} variant='h6'>- OR -</Typography>
                <Typography className={classes.text} variant='h6'>Sign In With</Typography>      
               
                <IconButton
                    className={classes.icon} 
                    color="primary"
                    onClick={googleLogin}> 
                     <Google />
                </IconButton>
                
                        
                <IconButton
                    className={classes.icon} 
                    color="primary"
                    onClick={githubLogin}> 
                     <GitHubIcon />
                </IconButton>
                <div><Link className={classes.text} variant="subtitle1">Forgot Password?</Link></div>

            </div>
        </Paper>
        </TabPanel>
    </>
    )
}

export default Login;
