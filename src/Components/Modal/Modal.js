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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    height: '50vh'
  }
}));

const Modal = ({open, handleClose, id}) => {
  const classes = useStyles();
  const state = useSelector((state) => state.todo);
  const todo = state.filter(s => s.id === id);
  const [isUpdate, setUpdate] = React.useState(false);

  const onClose = () => {
    handleClose();
    setUpdate(false);
  }

  if(todo && todo[0] && isUpdate) {
    return(
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth="md"
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        className={classes.modal}
      >
        <DialogTitle id={`dialog-${id}-title`}>{todo[0].title}</DialogTitle>
        <DialogContent>
          <DialogContentText id={`dialog-${id}-description`}>
            {todo[0].description}
          </DialogContentText>
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
        open={open}
        fullWidth={true}
        maxWidth="md"
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        className={classes.modal}
      >
        <DialogTitle id={`dialog-${id}-title`}>{todo[0].title}</DialogTitle>
        <DialogContent>
          <DialogContentText id={`dialog-${id}-description`}>
            {todo[0].description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setUpdate(true)} color="primary">
            Update
          </Button>
          {todo[0].status === 0 && <Button onClick={onClose} variant="outlined" color="primary">
            Delete
          </Button>}
        </DialogActions>
      </Dialog>
    );
  } else {
    return(
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
      >
        <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Disagree
          </Button>
          <Button onClick={onClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Modal;
