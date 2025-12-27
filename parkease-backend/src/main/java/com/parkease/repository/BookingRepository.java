package com.parkease.repository;

import com.parkease.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BookingRepository
        extends MongoRepository<Booking, String> {

    List<Booking> findBySlotIdAndEndTimeAfterAndStartTimeBefore(
            String slotId,
            LocalDateTime start,
            LocalDateTime end
    );

    List<Booking> findBySlotId(String slotId);
}
