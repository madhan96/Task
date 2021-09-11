import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getUsers } from '../services/request-services';
import { Paper, Button, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TablePagination } from '@material-ui/core'
import { useDispatch,useSelector } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import UserModal from '../modals/UserModal';
import DeleteModal from '../modals/DeleteModal';
const columns = [
    {
        id: 'id',
        label: 'Id',
        minWidth: 150,

        format: (value) => value.toLocaleString(),
    },
    { id: 'name', label: 'Name', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 150 },

    {
        id: 'status',
        label: 'Status',
        minWidth: 150,
        align: 'center',
    },
    {
        id: 'actions',
        key: 'actions',
        label: 'Actions',
        minWidth: 200,
        align: 'center',

    },
];
const Styles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        margin: "30px 30px 30px"
    },
    title: {
        marginBottom: theme.spacing(4)
    },
    addBtn: {
        marginBottom: theme.spacing(4)
    },
    tableroot: {
        width: '100%'
    },
    container: {
        maxHeight: 440,
    },

}));
export default  function UserMang() {
    const[page,setPage]=useState(0)
    const[rowsPerPage,setRowsPerPage]=useState(10)
    const[selectedUser,setSelectedUser]=useState({})
    const[open,setOpen]=useState(false)
    const[delopen,setDelopen]=useState(false)

    const { users }=useSelector((state) => {
        return {
            users: state.users.userList
        }
    });

    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getUsers());
    },[])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };
    const openAddUser = () => {
        setSelectedUser({});
        setOpen(true);
    }
    const closeUserModal = () => {
        setOpen(false);
        setSelectedUser({});
    }
    const closeDeleteModal = () => {
        setDelopen(false);
        setSelectedUser({});
    }
    const openEditUser = (user) => {
        setSelectedUser(user);
        setOpen(true);
    }
    const openDeleteUser = (user) => {
        setSelectedUser(user);
        setDelopen(true);
    }
    const classes  = Styles();
    return (
        <div className={classes.root}>
            <Typography
                align="left"
                variant="h3"
                className={classes.title}
            >
                User Table
            </Typography>
            <Button variant="contained" color="primary" className={classes.addBtn} onClick={(e) => { openAddUser() }}>
                ADD USER
            </Button>
            <Paper className={classes.tableroot}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={user.id}>
                                        {columns.map((column) => {
                                            if (column.id !== 'actions') {
                                                const value = user[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format ? column.format(value) : value}
                                                    </TableCell>
                                                );

                                            } else {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <IconButton
                                                            color="inherit"
                                                            onClick={(e) => { openEditUser(user) }}

                                                        >
                                                            <EditIcon color='primary' />
                                                        </IconButton>
                                                        <IconButton
                                                            color="inherit"
                                                            onClick={(e) => { openDeleteUser(user) }}

                                                        >
                                                            <DeleteIcon color='secondary' />
                                                        </IconButton>
                                                    </TableCell>
                                                );
                                            }
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <UserModal open={open} user={selectedUser} handleClose={closeUserModal} />
            <DeleteModal user={selectedUser} open={delopen} handleClose={closeDeleteModal} />
        </div>
    );



}
