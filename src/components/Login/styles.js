import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
toolbar: theme.mixins.toolbar,
  form: {
    paddingBottom: 50,
    marginBottom: theme.spacing(3),
    width: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
  },
  spacing: {
    margin: 10,
  },
  title: {
    color: theme.palette.secondary.main,
    fontFamily: ['Dongle', 'sans-serif'],
    paddingTop: 40,
  },
  text: {
    color: theme.palette.secondary.main,
    fontFamily: ['Dongle', 'sans-serif'],
  },
  icon: {
    margin: 10,
    transition: '0.6s',
    '&:hover': {
      opacity: 1,
      transition: '1s',
      backgroundColor: theme.palette.primary.light,
      color: theme.palette.secondary.light
    }
  },
  tabs: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
    width: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
  }
}));