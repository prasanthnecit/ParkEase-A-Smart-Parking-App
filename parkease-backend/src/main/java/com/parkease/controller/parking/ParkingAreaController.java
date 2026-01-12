package com.parkease.controller.parking;

import com.parkease.model.ParkingArea;
import com.parkease.repository.ParkingAreaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parking-areas")
public class ParkingAreaController {

    private final ParkingAreaRepository repository;

    public ParkingAreaController(ParkingAreaRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ParkingArea> getAllAreas() {
        return repository.findAll();
    }
}
