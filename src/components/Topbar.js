import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';
const styles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    flexGrow: {
        flexGrow: 1
    },
    iconBtn: {
        marginRight: '20px'
    }
}));
export default function TopBar() {
    const moveToCart = (e) => {
        window.location.href = './bill'
    }
    const moveToShop = (e) => {
        window.location.href = './dashboard'
    }
    const moveToUser = (e) => {
        window.location.href = './user'
    }


    const classes  = styles();
    return (
        <div>
            <AppBar className={classes.root}>
                <Toolbar>
                    <div className={classes.flexGrow} />
                    <div
                        className={classes.iconBtn}
                    >
                        <IconButton
                            color="inherit"
                            size="medium"                            
                            onClick={moveToShop}
                        >
                            <ShoppingCartIcon fontSize="large" />
                        </IconButton>
                    </div>
                    <div
                        className={classes.iconBtn}
                    >
                        <IconButton
                            color="inherit"
                            size="medium"
                            onClick={moveToCart}

                        >
                            <ReceiptIcon fontSize="large" />
                        </IconButton>
                    </div>

                    <div
                        className={classes.iconBtn}
                    >
                        <IconButton
                            color="inherit"
                            size="medium"                            
                            onClick={moveToUser}
                        >
                            <PersonIcon fontSize="large" />
                        </IconButton>
                    </div>


                </Toolbar>
            </AppBar>
            
        </div>
    );

}

