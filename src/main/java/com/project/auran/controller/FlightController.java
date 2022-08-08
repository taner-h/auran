package com.project.auran.controller;

import com.project.auran.model.Flight;
import com.project.auran.service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("flight")
public class FlightController {

    private final FlightService flightService;

    @Autowired
    public FlightController(FlightService flightService){
        this.flightService = flightService;
    }

//    @PostMapping
//    public Flight addFlight(@RequestParam Long airplaneId,
//                            @RequestParam Long destId,
//                            @RequestParam Long srcId,
//                            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime takeoff,
//                            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime eta,
//                            @RequestBody Flight flight){
//        return flightService.addFlight(airplaneId, destId, srcId, flight, takeoff, eta);
//    }

    @PostMapping
    public Flight addFlight(@RequestParam Long airplaneId,
                            @RequestParam Long destId,
                            @RequestParam Long srcId,
                            @RequestBody Flight flight){
        return flightService.addFlight(airplaneId, destId, srcId, flight);
    }

    @GetMapping
    public List<Flight> getAllFlights(){
        return flightService.getAllFlights();
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "{flightId}")
    public void deleteFlight(@PathVariable Long flightId){
        flightService.deleteFlight(flightId);
    }


    @GetMapping(path = "{flightId}")
    public Flight getFlight(@PathVariable Long flightId){
        return flightService.getFlight(flightId);
    }



}