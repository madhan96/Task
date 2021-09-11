import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Grid,
    Divider,
    TextField
} from '@material-ui/core';
import { addCartData } from '../actions/productdata';
import { useDispatch, useSelector } from 'react-redux';

const Styles = makeStyles((theme) => ({
    root: {
        position: 'relative',

        width: 350,
        padding: '5px 10px 5px'
    },
    imageContainer: {
        height: 180,
        width: '100%',
        margin: '0 auto',
        border: `1px solid #eeeeee`,
        borderRadius: '5px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    priceIcon: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        position: 'relative',
        background: '#f4f3f2',
        border: '1px solid #fcfcfc',
        padding: '10px 10px 10px'
    },
}));
export default function ProductCard(props) {

    const [inputValue,setinputValue]=useState(0)
    const dispatch = useDispatch();
    const classes = Styles();
    const { product }=props;
    const { cartList } = useSelector((state) => {
        return {
            cartList: state.selectedProducts
        }
    });

    const updateCart = (value) => {
        dispatch(addCartData({
            quantity: value,
            price_per_unit: props.product.price,
            price: value * Number.parseInt(props.product.price),
            product_id: props.product.id,
            product_name: props.product.product_name,
            image: props.product.image
        }));
    }
    const setValue = (val) => {
        if (val === '' || val === 0) {
            setinputValue(val);
        } 
        updateCart(val);        
    }

    return (
    <Card

        className={classes.root}
    >
        <CardContent>
            <div className={classes.imageContainer}>
                <img
                    alt="Product"
                    className={classes.image}
                    src={'http://localhost:3000/default/default-image.png'}
                />
            </div>
            <Typography
                align="center"
                // gutterBottom
                variant="h5"
            >
                {product.product_name}
            </Typography>
            <Typography
                align="center"
                variant="h6"
            >
                {product.brand}
            </Typography>
        </CardContent>
        <Divider />
        <CardActions>
            <div className={classes.priceIcon}>
                <Typography
                    align="left"
                    variant="h6"
                >
                    {`Price: Rs.${product.price}`}
                </Typography>

                <Grid
                    container
                    alignItems="center"
                    direction="column"
                >
                    <Grid
                        item
                        className={classes.addProduct}
                    >

                        <TextField
                            variant="outlined"
                            size="small"
                            type="number"
                            inputProps={{
                                min: 0,
                                max:20
                              }}
                            value={cartList[product.id] ? cartList[product.id].quantity : inputValue}
                            onChange={(e) => { setValue(e.target.value) }}
                        />

                    </Grid>
                </Grid>

            </div>
        </CardActions>
    </Card>);

}

