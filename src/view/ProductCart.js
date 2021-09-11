import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {products} from '../storage/store';
import { Divider, Grid, Typography, MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ProductCard from '../components/ProductCard';

const Styles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3)

    },
    content: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4)
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

}));

export default function ProductCart(props){

    const [page,setPage]=useState(0);
    const [productsPerPage,setProductsPerPage]=useState(5);

    const handleChange = (event, value) => {
        setPage(--value );
    };
    const handleNopChange = (event) => {
        setProductsPerPage(event.target.value);
    };

    const classes=Styles();
    
    return (

        <div className={classes.root}>

            <div className={classes.content}>
                <Grid
                    container
                    spacing={3}
                >
                    {products.slice(page * productsPerPage, page * productsPerPage + productsPerPage).map(product => (
                        <Grid
                            container
                            justifyContent="center"
                            item
                            key={product.id}
                            lg={4}
                            md={6}
                            xs={12}
                        >
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </div>

            <Divider />
            <Grid
                container
                justifyContent="center"
                alignItems="center">
                <Typography>Products per page:</Typography>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Per-Page</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={productsPerPage}
                        onChange={handleNopChange}
                        label="Per-Page"
                    >

                        <MenuItem value={5}>Five</MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={15}>Fifteen</MenuItem>
                    </Select>
                </FormControl>
                <Pagination count={products.length % productsPerPage === 0 ? Math.floor(products.length / productsPerPage) : Math.floor(products.length / productsPerPage) + 1} page={page + 1} onChange={handleChange} />
            </Grid>

        </div>
    );

}
