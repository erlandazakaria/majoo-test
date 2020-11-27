import React from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const ListItemIconWithStyle = withStyles((theme) => ({
  root: {
    minWidth: '35px'
  },
}))(ListItemIcon);

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold'
  },
  empty: {
    textAlign: 'center'
  }
}));

const CurrentTodoList = () => {
  const classes = useStyles();
  const todo = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [modalId, setModalId] = React.useState(0);
  let currentTodo = _.chain(todo).orderBy(['createdAt'], ['asc']).value().filter(s => s.status === 0);

  return(
    <Paper className={classes.paper}>
      {isModalOpen && <Modal handleClose={() => setModalOpen(false)} id={modalId} />}
      <Typography variant="h6" color="primary" className={classes.title}>Current To-Do List</Typography>
      {currentTodo.length > 0 ? 
        <List>
        {currentTodo.map(t => {
          return (
            <ListItem 
              button 
              onClick={() => {setModalId(t.id); setModalOpen(true);}}
              key={`currentTodo-${t.id}`}
            >
              <ListItemIconWithStyle>
                <CheckBoxOutlineBlankIcon />
              </ListItemIconWithStyle>
              <ListItemText primary={t.title} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  color="secondary"
                  onClick={() => dispatch({
                    type: 'DONE_TODO',
                    payload: t.id
                  })}
                >
                  <CheckCircleIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => dispatch({
                    type: 'DELETE_TODO',
                    payload: t.id
                  })}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        </List>
      : <React.Fragment>
        <Typography variant="body1" className={classes.empty}>Yey! No To-Do List Left</Typography>
        <Typography variant="body1" className={classes.empty}>Let's find one</Typography>
      </React.Fragment>}
    </Paper>
  );
}

export default CurrentTodoList;
