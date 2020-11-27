import React from 'react';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import Modal from '../Modal';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

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
              <ListItemIcon>
                <CheckBoxOutlineBlankIcon />
              </ListItemIcon>
              <ListItemText primary={t.title} />
            </ListItem>
          );
        })}
        </List>
      : <Typography variant="h6" className={classes.empty}>No To-Do List Left!</Typography>}
    </Paper>
  );
}

export default CurrentTodoList;
