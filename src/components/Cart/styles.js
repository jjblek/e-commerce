import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    fontFamily: ['Dongle', 'sans-serif'],
    paddingBottom: 10,
    color: theme.palette.secondary.main
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
  },
  link: {
    textDecoration: 'none',
  },
  cartDetails: {
    display: 'flex',
    marginTop: '10%',
    width: '100%',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  image: {
    marginTop: theme.spacing(3),
    maxWidth: '100%'
  },
  container: {
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
  },
}));