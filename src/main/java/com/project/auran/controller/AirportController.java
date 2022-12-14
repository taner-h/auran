package com.project.auran.controller;

import com.project.auran.model.Airport;
import com.project.auran.service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping(path = "airport")
public class AirportController {
    
    private final AirportService airportService;

    @Autowired
    public  AirportController(AirportService airportService){
        this.airportService = airportService;
    }

    @GetMapping
    public Page<Airport> getAllAirports(@RequestParam(defaultValue = "0") Integer page,
                                        @RequestParam(defaultValue = "10") Integer pageSize,
                                        @RequestParam(defaultValue = "id") String sortBy){
        return airportService.getAllAirports(page, pageSize, sortBy);
    }

    @GetMapping(path = "{airportId}")
    public Airport getAirport(@PathVariable Long airportId){
        return airportService.getAirport(airportId);
    }


    @PostMapping
    public Airport addAirport(@RequestParam Long cityId,
                              @RequestBody Airport airport){
        return airportService.addAirport(cityId, airport);
    }

    @PutMapping(path = "{airportId}")
    public Airport updateAirport(@PathVariable Long airportId,
                                 @RequestParam (required = false) String name,
                                 @RequestParam (required = false) String code,
                                 @RequestParam (required = false) Long cityId){
        return airportService.updateAirport(airportId, name, code, cityId);
    }

    @ResponseStatus(value = HttpStatus.NO_CONTENT)
    @DeleteMapping(path = "{airportId}")
    public void deleteAirport(@PathVariable Long airportId){
        airportService.deleteAirport(airportId);
    }



}
