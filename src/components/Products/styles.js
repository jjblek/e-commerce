import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  root: {
    flexGrow: 1,
  },
  searchBar: {
    marginTop: 40,
    marginBottom: 20,
    display: "flex",
  },
  select: {
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0
  },
  search: {
    [`& fieldset`]:{
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
    }
  }


}));