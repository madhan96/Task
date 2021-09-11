import React, { useEffect,useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch,useSelector } from 'react-redux';
import { Paper, Button, Grid, Typography, Divider, IconButton } from '@material-ui/core';
import { addCartData } from '../actions/productdata';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import CloseIcon from '@material-ui/icons/Close';

const Styles = makeStyles((theme) => ({
    total: {
        marginBottom: theme.spacing(4)
    },
    btmDiv: {
        marginBottom: theme.spacing(4)
    },
    topBar: {
        padding: '16px 16px'
    },
    cartList: {
        padding: '16px 16px'
    },
    imageContainer: {
        height: 160,
        width: '250px',
        margin: '0 auto',
        border: `1px solid #eeeeee`,
        borderRadius: '5px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px 10px'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    Btn: {
        marginBottom: theme.spacing(4),
        marginRight: theme.spacing(4)
    }
}));
export default function Cart(props){
    const[total,setTotal]=useState(0)

    const {cartList}=useSelector((state) => {
        return {
            cartList: state.selectedProducts,  
        }
    });

    const dispatch = useDispatch(); 

    // useEffect(()=>{
    //     setTotal(Object.values(cartList).reduce((accumulator, currentValue) => accumulator + currentValue.price, 0));
    // },[]
    // )
    useEffect(()=>{
        if (total !== Object.values(cartList).reduce((accumulator, currentValue) => accumulator + currentValue.price, 0))
            setTotal(Object.values(cartList).reduce((accumulator, currentValue) => accumulator + currentValue.price, 0));
  
    },[cartList]
    )
    const deleteCartItem = (cart) => {
        dispatch(addCartData({ ...cart, quantity: 0 }));
    }

    const increaseQuantity = (cart) => {
        dispatch(addCartData({ ...cart, quantity: cart.quantity + 1, price: cart.price_per_unit * (cart.quantity + 1) }));
    }
    const decQuant = (cart) => {
        dispatch(addCartData({ ...cart, quantity: cart.quantity - 1, price: cart.price_per_unit * (cart.quantity - 1) }));
    }

    
    const classes  = Styles();
    return (
        <Paper>
            <div className={classes.topBar}>
                <Grid
                    container
                >
                    <Grid
                        item
                        lg={4}
                        md={4}
                        xs={4}
                        sm={4}
                    >
                    </Grid>
                    <Grid
                        item
                        lg={3}
                        md={3}
                        xs={3}
                        sm={3}
                    >
                        <Typography
                            align="center"
                            variant="h6"
                        >
                            Name
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={true}
                    >
                        <Typography
                            align="center"
                            variant="h6"
                        >
                            Price
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={true}
                    >
                        <Typography
                            align="center"
                            variant="h6"
                        >
                            Quantity
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={true}
                    >
                        <Typography
                            align="center"
                            variant="h6"
                        >
                            Total
                        </Typography>
                    </Grid>

                </Grid>
            </div>
            <Divider />


            {
                Object.values(cartList).map((cart, ind) => {
                    return (
                        <div key={ind} className={classes.cartList}>
                            <Grid
                                container
                                alignItems="center"
                            >
                                <Grid
                                    item
                                    container
                                    alignItems="center"
                                    lg={4}
                                    md={4}
                                    xs={4}
                                    sm={4}
                                >
                                    <IconButton
                                        color="inherit"
                                        onClick={(e) => { deleteCartItem(cart) }}

                                    >
                                        <CloseIcon color='secondary' />
                                    </IconButton>

                                    <div className={classes.imageContainer}>
                                        <img
                                            alt="cartItem"
                                            className={classes.image}
                                            src={'http://localhost:3000/default/default-image.png'}
                                        />
                                    </div>
                                </Grid>
                                <Grid
                                    item
                                    lg={3}
                                    md={3}
                                    xs={3}
                                    sm={3}
                                >
                                    <Typography
                                        align="center"
                                        variant="h6"
                                    >
                                        {cart.product_name}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={true}
                                >
                                    <Typography
                                        align="center"
                                        variant="h6"
                                    >
                                        {cart.price_per_unit}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={true}
                                >
                                    
                                    <Grid
                                        container
                                        alignItems="center"

                                    >
                                        <Grid
                                            item

                                        >
                                            <IconButton
                                                color="primary"
                                                onClick={(e) => { decQuant(cart) }}

                                            >
                                                <RemoveCircleIcon fontSize="large" />
                                            </IconButton>
                                            <Typography
                                                variant="h6"
                                                align="center"
                                            >{cart.quantity}</Typography>
                                            <IconButton
                                                color="primary"
                                                onClick={(e) => { increaseQuantity(cart) }}

                                            >
                                                <AddCircleIcon fontSize="large" />
                                            </IconButton>

                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid
                                    item
                                    xs={true}
                                >
                                    <Typography
                                        align="center"
                                        variant="h6"
                                    >
                                        {cart.price}
                                    </Typography>
                                </Grid>

                            </Grid>
                        </div>
                    );
                })
            }

            <Divider className={classes.btmDiv} />
            <div>
                <Grid
                    container
                    className={classes.total}
                >
                    <Grid item xs={4} /> <Grid item xs={3} /> <Grid item xs={true} />
                    <Grid
                        item
                        xs={true}
                    >
                        <Typography
                            align="center"
                            variant="h6"
                        >
                            Total :
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        xs={true}
                    >
                        <Typography
                            align="center"
                            variant="h6"
                        >
                            {`Rs.${total}`}
                        </Typography>
                    </Grid>

                </Grid>
                <Grid

                    container
                    justify='flex-end'
                >

                    <Button
                        className={classes.Btn}
                        variant="contained"
                        color="primary"
                        onClick={()=>{}}
                    >
                        Check Out
                    </Button>

                </Grid>

            </div>
        </Paper>
    )
            
}
