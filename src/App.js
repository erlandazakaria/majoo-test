import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    textAlign: 'center',
    height: '50px'
  },
  appBarSpacer: theme.mixins.toolbar,
  title: {
    flexGrow: 1,
    lineHeight: '50px'
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  }
}));


function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.todo);
  console.log(state)

  React.useState(async () => {
    const initialData = await axios({
      method: 'get',
      url: 'https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list'
    });
    dispatch({
      type: 'FETCH_TODO',
      payload: initialData.data
    })
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          Erlanda's To - Do List
        </Typography>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                PAPER
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export default App;
