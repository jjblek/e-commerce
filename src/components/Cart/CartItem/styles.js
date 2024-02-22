import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    backgroundColor: theme.palette.background.default,
    padding: 10,
},
  media: {
    width:'100%',
      height: undefined,
      aspectRatio: 1,
    
  },
  container: {
    maxWidth: '100%',
    
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    
  },
  cardActions: {
    justifyContent: 'space-between',
    
  },
  buttons: {
    display: 'flex',
    alignItems: 'left',
  },
}));