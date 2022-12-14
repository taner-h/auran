import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import moment from "moment";
import React, { useEffect, useState } from "react";
import DashboardNavBar from "./DashboardNavBar";
import FlightAddDialog from "./FlightAddDialog";
import FlightEditDialog from "./FlightEditDialog";
import NavBar from "./NavBar";
import { StyledTableCell, StyledTableRow } from "./StyledTable";

const mdTheme = createTheme();

export default function Flights(props) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [flights, setFlights] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFlightToDelete, setSelectedFlightToDelete] = useState(null);
  const [selectedFlightToEdit, setSelectedFlightToEdit] = useState(null);
  const [flightAddDialogOpen, setFlightAddDialogOpen] = useState(false);
  const [flightEditDialogOpen, setFlightEditDialogOpen] = useState(false);
  const [flightChange, setFlightChange] = useState(0);

  const [info, setInfo] = useState({
    airplanes: [],
    airports: [],
  });

  // const handleOpenFlightEditDialog = (flightId) => {
  //   setFlight(flights.filter(flight => flight.id == flightId));
  //   setFlightAddDialogOpen(true);
  // };

  const handleOpenFlightAddDialog = () => {
    setFlightAddDialogOpen(true);
  };

  const handleCloseFlightAddDialog = () => {
    setFlightAddDialogOpen(false);
  };

  const handleOpenFlightEditDialog = (flightId) => {
    setSelectedFlightToEdit(
      flights.filter((flight) => flight.id == flightId)[0]
    );
    setFlightEditDialogOpen(true);
  };

  const handleCloseFlightEditDialog = () => {
    setSelectedFlightToEdit(null);
    setFlightEditDialogOpen(false);
  };

  const handleClickOpenDialog = (id) => {
    setOpenDialog(true);
    setSelectedFlightToDelete(id);
  };

  const handleClickCloseDialog = () => {
    setOpenDialog(false);
    setSelectedFlightToDelete(null);
  };

  const getInfo = async () => {
    try {
      // console.log(sortBy)

      const airplaneResponse = await fetch(
        `http://localhost:8080/airplane?pageSize=100`,
        {
          method: "GET",
        }
      );
      // console.log(response)
      const airplaneJson = await airplaneResponse.json();
      // console.log(jsonRes)
      // console.log(flights)
      // console.log(jsonRes);

      const airportResponse = await fetch(
        `http://localhost:8080/airport?pageSize=100`,
        {
          method: "GET",
        }
      );
      // console.log(response)
      const airportJson = await airportResponse.json();
      // console.log(jsonRes)
      setInfo({
        airplanes: airplaneJson.content,
        airports: airportJson.content,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const getFlights = async () => {
    try {
      // console.log(sortBy)

      const response = await fetch(
        `http://localhost:8080/flight?page=${page - 1}`,
        { method: "GET" }
      );
      // console.log(response)
      const jsonRes = await response.json();
      // console.log(jsonRes)
      setFlights(jsonRes.content);
      setTotalPage(jsonRes.totalPages);

      // console.log(flights)
      // console.log(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteFlight = async (id) => {
    try {
      // console.log(sortBy)

      await fetch(`http://localhost:8080/flight/${id}`, {
        method: "DELETE",
      });
      setFlights(
        flights.filter(function (a) {
          return a.id != id;
        })
      );
      setOpenDialog(false);
      setSelectedFlightToDelete(null);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getFlights();
    // console.log(info.airplanes.length);
    // console.log(info.airports.length);
    // setFlightChange(false);
    if (info.airplanes.length === 0 && info.airports.length === 0) getInfo();
  }, [page, flightChange]);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        {/*<CssBaseline />*/}
        <DashboardNavBar
          isLogged={props.isLogged}
          setIsLogged={props.setIsLogged}
          setUsername={props.setUsername}
          setUserRoles={props.setUserRoles}
        />
        <Box
          component="main"
          sx={{
            backgroundColor: "#eceff4",
            //  (theme) =>
            //   theme.palette.mode === 'light'
            //     ? theme.palette.grey[100]
            //     : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 12, mb: 8 }}>
            <Typography
              variant="h3"
              // align="left"
              sx={{ fontWeight: "500", mb: 3 }}
              color="#292d3e"
            >
              Flights
            </Typography>

            <Typography
              variant="h6"
              // align="left"
              sx={{ fontWeight: "400", mb: 3 }}
              color="#292d3e"
            >
              Add, delete or edit flights.
            </Typography>

            <TableContainer component={Paper}>
              <Table aria-label="flights table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Flight Code</StyledTableCell>
                    <StyledTableCell align="center">From</StyledTableCell>
                    <StyledTableCell align="center">To</StyledTableCell>
                    <StyledTableCell align="center">Takeoff</StyledTableCell>
                    <StyledTableCell align="center">Duration</StyledTableCell>
                    <StyledTableCell align="center">
                      Price (E/B)
                    </StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flights.map((flight) => (
                    <StyledTableRow
                      key={flight.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {flight.code}
                      </TableCell>
                      <TableCell align="center">
                        {flight.sourceAirport.name}
                      </TableCell>
                      <TableCell align="center">
                        {flight.destinationAirport.name}
                      </TableCell>
                      <TableCell align="center">
                        {moment(flight.takeoff).format("DD/MM/YYYY HH:mm")}
                      </TableCell>
                      <TableCell align="center">{flight.duration}</TableCell>
                      <TableCell align="center">
                        {flight.economyPrice}$/{flight.businessPrice}$
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          size="large"
                          key={flight.id}
                          edge="end"
                          aria-label="delete flight"
                          aria-haspopup="true"
                          onClick={() => handleClickOpenDialog(flight.id)}
                          // color="inherit"
                          sx={{ color: "#292d3e" }}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          size="large"
                          edge="end"
                          aria-label="account of current user"
                          aria-haspopup="true"
                          onClick={() => handleOpenFlightEditDialog(flight.id)}
                          color="inherit"
                          sx={{ color: "#292d3e" }}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Dialog
              open={openDialog}
              onClose={handleClickCloseDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                Are you sure you want to delete this flight?
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="dialog-delete-flight">
                  All tickets that belong to this flight will also be deleted.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClickCloseDialog}>Cancel</Button>
                <Button
                  onClick={() => handleDeleteFlight(selectedFlightToDelete)}
                  autoFocus
                >
                  Proceed
                </Button>
              </DialogActions>
            </Dialog>
            {flightAddDialogOpen && (
              <FlightAddDialog
                flightAddDialogOpen={flightAddDialogOpen}
                handleCloseFlightAddDialog={handleCloseFlightAddDialog}
                setFlightChange={setFlightChange}
                flightChange={flightChange}
                info={info}
                // flight={flight}
                // setFlight={setFlight}
              />
            )}
            {flightEditDialogOpen && (
              <FlightEditDialog
                flightEditDialogOpen={flightEditDialogOpen}
                handleCloseFlightEditDialog={handleCloseFlightEditDialog}
                selectedFlightToEdit={selectedFlightToEdit}
                setFlightChange={setFlightChange}
                flightChange={flightChange}
                info={info}
                // flight={flight}
                // setFlight={setFlight}
              />
            )}
            <Pagination
              count={totalPage}
              page={page}
              sx={{
                color: "#2e3440",
                justifyContent: "center",
                display: "flex",
                mt: 4,
              }}
              onChange={(event, value) => {
                setPage(value);
              }}
            />
          </Container>
          <Fab
            sx={{
              backgroundColor: "#292d3e",
              right: 40,
              bottom: 40,
              position: "fixed",
            }}
            color="primary"
            aria-label="add"
            onClick={handleOpenFlightAddDialog}
          >
            <AddIcon />
          </Fab>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
