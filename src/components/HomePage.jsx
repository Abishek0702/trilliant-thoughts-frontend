import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DialogBox from './DialogBox';
import DeletePopup from './DeletePopup';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';



function createData(id, name, calories, fat, carbs, protein) {
    return {
        id,
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const rows = [
    createData(1, 'Cupcake', 305, 3.7, 67, 4.3),
    createData(2, 'Donut', 452, 25.0, 51, 4.9),
    createData(3, 'Eclair', 262, 16.0, 24, 6.0),
    createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
];

export default function HomePage() {
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [users, setUsers] = useState('');
    const [DeleteUser, setDeleteUser] = useState(null);
    const [updateid, setUpdateid] = useState(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleClickOpen = (id) => {
        setOpenDialog(true);
        setUpdateid(id)
    };
    const handleClickOpenAdd = () => {
        setOpenDialog(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };


    const UserDelete = async (id) => {

        try {
            const response = await axios.delete(`http://localhost:5001/deleteusers/${id}`);
            if (response.data.result == true) {

                toast.success(response.data.message)

                setTimeout(() => {
                    getUsers()
                }, 2000);

            }
        } catch (error) {

            toast.error("Error deleting user")
        }
    };
    const handleClickDelete = (id) => {
        setOpenDelete(true);
        setDeleteUser(id);
    };

    const handleClickDeleteUser = () => {
        UserDelete(DeleteUser);
        setOpenDelete(false);
    };

    useEffect(() => {
        getUsers()
    }, []);
    const getUsers = () => {
        axios.get('http://localhost:5001/getuser')
            .then((response) => {

                if (response.data.result == true) {
                    const dataWithSerial = response.data.data.map((item, index) => ({
                        ...item,
                        serial: index + 1,
                    }));
                    setUsers(dataWithSerial);
                }
            })
            .catch((error) => {

            });
    };
    return (
        <>

            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} handleClickOpenAdd={handleClickOpenAdd} />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="">SNo</StyledTableCell>
                                    <StyledTableCell align="">UserName</StyledTableCell>
                                    <StyledTableCell align="">FirstName</StyledTableCell>
                                    <StyledTableCell align="">LastName</StyledTableCell>
                                    <StyledTableCell align="">Email</StyledTableCell>
                                    <StyledTableCell align="">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users && users.map((row) => {
                                    return (
                                        <StyledTableRow key={row.name}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.serial}
                                            </StyledTableCell>
                                            <StyledTableCell align="">{row.username}</StyledTableCell>
                                            <StyledTableCell align="">{row.firstname}</StyledTableCell>
                                            <StyledTableCell align="">{row.lastname}</StyledTableCell>
                                            <StyledTableCell align="">{row.email}</StyledTableCell>
                                            <StyledTableCell align="">
                                                <IconButton aria-label="edit">
                                                    <ModeEditIcon onClick={() => handleClickOpen(row.id)} />
                                                </IconButton>
                                                <IconButton aria-label="delete" sx={{ color: 'red' }}>
                                                    <DeleteIcon sx={{ color: 'red' }} onClick={() => handleClickDelete(row.id)} />
                                                </IconButton>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                                {!users &&
                                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                    <CircularProgress />
                                  </div>
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box >
            <DialogBox open={openDialog} handleClose={handleCloseDialog} getUsers={getUsers} updateid={updateid} />
            <DeletePopup handleCloseDelete={handleCloseDelete} openDelete={openDelete} handleClickDeleteUser={handleClickDeleteUser} />
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </>
    );
}

function EnhancedTableToolbar(props) {
    const { numSelected, handleClickOpenAdd } = props;

    return (
        <Toolbar
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                pl: { sm: 2 },
                pr: { xs: 1, sm: 2 },
            }}
        >
            <Typography
                variant="h6"
                id="tableTitle"
                component="div"
            >
                User Details
            </Typography>
            <Box>
                <Button variant="contained" color="success" onClick={handleClickOpenAdd} endIcon={<PersonAddIcon />}>
                    Add User
                </Button>
            </Box>
        </Toolbar>
    );
}
