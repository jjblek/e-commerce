import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
    root: {
      padding: 12, 
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)"
    },
    media: {
      width:'100%',
      height: undefined,
      aspectRatio: 1,
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    cardContent: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    box: {
      height: "60px",
      display: "-webkit-box",
      boxOrient: "vertical",
      lineClamp: 2,
      wordBreak: "break-all",
      overflow: "hidden"
    },
    button: {
      opacity: '0.6',
      transition: '0.6s',
      borderRadius: '50%',
      '&:hover': {
        opacity: 1,
        transition: '0.6s',
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.secondary.light,
      }
    },
    popup:{
      maxWidth: '100%',
      padding: theme.spacing(3),
    },
    popupMedia:{
      display: 'flex',
      paddingBottom: 20
    },
    popupTitle:{

    },
    popupStock:{
      paddingRight: 16
    },
    popupText:{

    },
}));