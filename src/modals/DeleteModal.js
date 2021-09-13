import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { DialogTitle, DialogContentText } from '@material-ui/core';
import {deleteUserInList} from '../actions/userdata'
import {
    Grid,
    Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';


const styles = makeStyles((theme) => ({
    root: {
        padding: "15px"
    },
    formInput: {
        marginBottom: "30px"
    },
    dialogContent: {
        overflowY: "visible"
    }

}));

export default function DeleteModal(props) {
    const dispatch=useDispatch()
    const deleteUser=()=>{
        dispatch(deleteUserInList(props.user));
        props.handleClose();
    }
    const handleSubmit = () => {
        deleteUser();
    }
    const classes = styles()
    return (
        <div>

            <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" >
                <div className={classes.root}>
                    <DialogTitle id="form-dialog-title">Delete Record
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>

                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete the record ?
                        </DialogContentText>

                    </DialogContent>
                    <DialogActions>
                        <Grid
                            container
                            justifyContent="space-between"
                        >
                            <Button variant="contained" onClick={handleSubmit} color="primary">
                                delete
                            </Button>
                            <Button variant="contained" onClick={props.handleClose} color="secondary">
                                Cancel
                            </Button>
                        </Grid>

                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );

}
