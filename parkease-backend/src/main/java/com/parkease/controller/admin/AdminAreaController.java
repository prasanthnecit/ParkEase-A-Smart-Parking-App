package com.parkease.controller.admin;

import com.parkease.model.ParkingArea;
import com.parkease.repository.ParkingAreaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/areas")
public class AdminAreaController {

    private final ParkingAreaRepository areaRepository;

    public AdminAreaController(ParkingAreaRepository areaRepository) {
        this.areaRepository = areaRepository;
    }

    // CREATE AREA
    @PostMapping
    public ParkingArea createArea(@RequestBody ParkingArea area) {
        return areaRepository.save(area);
    }

    // LIST ALL AREAS
    @GetMapping
    public List<ParkingArea> getAllAreas() {
        return areaRepository.findAll();
    }

    // DELETE AREA
    @DeleteMapping("/{id}")
    public void deleteArea(@PathVariable String id) {
        areaRepository.deleteById(id);
    }
}
