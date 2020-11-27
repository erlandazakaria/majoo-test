import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    height: '50vh'
  },
  input: {
    width: '50%'
  },
  description: {
    marginTop: theme.spacing(2)
  }
}));

const Modal = ({handleClose, id}) => {
  const classes = useStyles();
  const state = useSelector((state) => state.todo);
  const dispatch = useDispatch();
  const todo = state.filter(s => s.id === id);
  const [isUpdate, setUpdate] = React.useState(false);

  const onClose = () => {
    handleClose();
    setUpdate(false);
  }

  if(todo && todo[0] && isUpdate) {
    return(
      <Dialog
        open={true}
        fullWidth={true}
        maxWidth="md"
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        className={classes.modal}
      >
        <DialogTitle id={`dialog-${id}-update-title`}>Update To-Do</DialogTitle>
        <DialogContent>
          <div>
            <TextField 
              id="update-title"
              label="Title"
              className={classes.input}
              defaultValue={todo[0].title}
            />
          </div>
          <div className={classes.description}>
            <TextField
              id="update-description"
              multiline
              rowsMax={4}
              label="Description"
              className={classes.input}
              defaultValue={todo[0].description}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  } else if (todo && todo[0] && !isUpdate) {
    return(
      <Dialog
        open={true}
        fullWidth={true}
        maxWidth="md"
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        className={classes.modal}
      >
        <DialogTitle id={`dialog-${id}-view-title`}>{todo[0].title}</DialogTitle>
        <DialogContent>
          <DialogContentText id={`dialog-${id}-description`}>
            {todo[0].description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setUpdate(true)} color="primary">
            Update
          </Button>
          {todo[0].status === 0 &&
            <Button 
              variant="outlined"
              color="primary"
              onClick={() => {
                dispatch({
                  type: "DELETE_TODO",
                  payload: todo[0].id
                });
                onClose();
              }}
            >
            Delete
          </Button>}
        </DialogActions>
      </Dialog>
    );
  } else {
    return(
      <Dialog
        open={true}
        fullWidth={true}
        maxWidth="md"
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        className={classes.modal}
      >
        <DialogTitle id="alert-dialog-slide-title">Add New To-Do</DialogTitle>
        <DialogContent>
          <div>
            <TextField 
              id="new-title"
              label="Title"
              className={classes.input} 
            />
          </div>
          <div className={classes.description}>
            <TextField
              id="new-description"
              multiline
              rowsMax={4}
              label="Description"
              className={classes.input}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button 
            variant="contained"
            color="primary"
            onClick={() => {
              if(document.getElementById('new-title').value !== ''
                && document.getElementById('new-description').value !== '') {
                  dispatch({
                    type: 'ADD_TODO',
                    payload: {
                      id: state[state.length-1].id + 1,
                      title: document.getElementById('new-title').value,
                      description: document.getElementById('new-description').value,
                      status: 0,
                      createdAt: moment().format('YYYY-MM-DD HH:mm')
                    }
                  })
                  onClose();
              }
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Modal;
