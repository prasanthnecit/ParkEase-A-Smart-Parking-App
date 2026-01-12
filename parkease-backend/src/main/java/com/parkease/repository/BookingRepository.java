package com.parkease.repository;

import com.parkease.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

public interface BookingRepository
        extends MongoRepository<Booking, String> {

    List<Booking> findBySlotIdAndEndTimeAfterAndStartTimeBefore(
            String slotId,
            LocalDateTime start,
            LocalDateTime end
    );

    List<Booking> findBySlotId(String slotId);
    List<Booking> findByUserId(String userId);
    List<Booking> findBySlotIdIn(List<String> slotIds);

    long countByStartTimeLessThanEqualAndEndTimeGreaterThan(LocalDateTime now, LocalDateTime now1);

    List<Booking> findBySlotIdInAndStartTimeLessThanEqualAndEndTimeGreaterThan(List<String> slotIds, LocalDateTime now, LocalDateTime now1);


}
