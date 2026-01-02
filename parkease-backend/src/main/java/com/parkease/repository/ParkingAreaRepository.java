package com.parkease.repository;

import com.parkease.model.ParkingArea;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ParkingAreaRepository
        extends MongoRepository<ParkingArea, String> {

}
