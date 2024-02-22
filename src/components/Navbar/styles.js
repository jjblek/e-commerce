import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 0;

export default makeStyles((theme) => ({
  appBar: {
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  title: {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none',
    fontFamily: ['Dongle', 'sans-serif'], 
  },
  image: {
    height: "25px",
    margin: '5px',
  },
  button: {
    margin: '5px',
    transition: '0.6s',
    '&:hover': {
      opacity: 1,
      transition: '1s',
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.secondary.light
    }
  },
  avatar: { 
    width: 24,
    height: 24,
    backgroundColor: theme.palette.secondary.main
  },
  icon: {
    width: 24,
    height: 24,
    color: theme.palette.secondary.main
  },
  grow: {
    flexGrow: 200,
  },
}));