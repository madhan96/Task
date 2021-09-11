import { useState,useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    Grid,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    MenuItem
} from '@material-ui/core';
import { createUser, editUser } from '../services/service-calls';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    root: {
        padding: "15px"
    },
    formInput: {
        marginBottom: "30px"
    },
    dialogContent: {
        overflowY: "visible"
    },
    dialogHeader: {
        '& h2': { width: "500px" }
    }
}));
const genders=[
    {
        label:'MALE',
        value:'male'
    },
    {
        label:'FEMALE',
        value:'female'
    }
]

export default function  UserModal(props){
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [gender,setGender]=useState("male");
    const [status,setStatus]=useState("inactive");

    useEffect(()=>{
        if(Object.keys(props.user).length > 0){
            setName(props.user.name);
            setEmail(props.user.email);
            setGender(props.user.gender);
            setStatus(props.user.status);
        }
        return ()=>{
            setName("");
            setEmail("");
            setGender("male");
            setStatus("inactive");
        }
    },[props.user]);
    const handleClose = () => {
        props.handleClose();
    };

    const handleSubmitData = (event) => {
        if (!Object.keys(props.user).length > 0) {
            if ((name == "") || (email == "")) {
                return alert('The fields User Name,Email cannot be empty');
            }
        }
        if (Object.keys(props.user).length > 0) {
            editUser(props.user.id,{  name,email,status,gender,id: props.user.id }, () => { window.location.reload(); }, handleClose);
        } else createUser({ name,email,status,gender }, () => { window.location.reload(); }, handleClose);
    }
    const handleSwitchChange = (event) => {
        event.target.checked?(setStatus("active")):(setStatus("inactive"))
    }

    const classes  = styles();
    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title" >
                <div className={classes.root}>
                    <DialogTitle className={classes.dialogHeader} id="form-dialog-title">{Object.keys(props.user).length > 0 ? 'Update User' : 'Add User'}
                    </DialogTitle>
                    <DialogContent className={classes.dialogContent}>

                        <Grid
                            container
                            spacing={4}
                        >
                            <Grid
                                item
                                sm={6}
                            >
                                <TextField className={classes.formInput} fullWidth label="UserName" name="name" value={name}
                                    onChange={(event)=>{setName(event.target.value.trim())}}
                                />
                                <TextField
                                    select
                                    label="Gender"
                                    value={gender}
                                    onChange={(event)=>{setGender(event.target.value.trim())}}
                    
                                    >
                                    {genders.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>


                            </Grid>

                            <Grid
                                item
                                sm={6}
                            >
                                <TextField className={classes.formInput} fullWidth label="Email" name="email" value={email}
                                    onChange={(event)=>{setEmail(event.target.value.trim())}}
                                />


                                <FormControlLabel
                                    control={<Switch
                                        checked={status=="active"?true:false}
                                        onChange={handleSwitchChange}
                                        color="primary"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />}
                                    label="Active"
                                    className={classes.formInput}
                                />

                            </Grid>

                        </Grid>

                    </DialogContent>
                    <DialogActions>
                        <Grid
                            container
                            justifyContent="space-between"
                        >
                            <Button variant="contained" onClick={handleSubmitData} color="primary">
                                Save
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

