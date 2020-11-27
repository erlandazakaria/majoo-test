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

import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold'
  }
}));

const FinishedToDoList = () => {
  const classes = useStyles();
  const todo = useSelector((state) => state.todo);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [modalId, setModalId] = React.useState(0);
  return(
    <Paper className={classes.paper}>
      <Modal open={isModalOpen} handleClose={() => setModalOpen(false)} id={modalId} />
      <Typography variant="h6" color="primary" className={classes.title}>Finished To-Do List</Typography>
      <List>
      {_.chain(todo)
      .orderBy(['createdAt'], ['desc'])
      .value()
      .filter(s => s.status === 1)
      .map(t => {
        return (
          <ListItem
            button
            onClick={() => {setModalId(t.id); setModalOpen(true);}}
            key={`finishedTodo-${t.id}`}
          >
            <ListItemIcon>
              <RadioButtonCheckedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={t.title} />
          </ListItem>
        );
      })}
      </List>
    </Paper>
  );
}

export default FinishedToDoList;
