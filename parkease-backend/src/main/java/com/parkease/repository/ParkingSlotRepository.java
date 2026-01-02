package com.parkease.repository;

import com.parkease.model.ParkingSlot;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ParkingSlotRepository
        extends MongoRepository<ParkingSlot, String> {

    List<ParkingSlot> findByAreaId(String areaId);
    boolean existsByAreaIdAndSlotCode(String areaId, String slotCode);

    long countByActiveTrue();

    long countByActiveFalse();
}
