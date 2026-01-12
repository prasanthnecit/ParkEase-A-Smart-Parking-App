package com.parkease.controller.admin;


import com.parkease.model.Booking;
import com.parkease.model.ParkingSlot;
import com.parkease.repository.BookingRepository;
import com.parkease.repository.ParkingAreaRepository;
import com.parkease.repository.ParkingSlotRepository;
import org.springframework.web.bind.annotation.*;


import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/admin/stats")
public class AdminStatsController {

    private final BookingRepository bookingRepository;
    private final ParkingSlotRepository slotRepository;
    private final ParkingAreaRepository areaRepository;

    public AdminStatsController(BookingRepository bookingRepository,
                                ParkingSlotRepository slotRepository,
                                ParkingAreaRepository areaRepository) {
        this.bookingRepository = bookingRepository;
        this.slotRepository = slotRepository;
        this.areaRepository = areaRepository;
    }

    // 1️⃣ OVERALL STATS
    @GetMapping("/overview")
    public Map<String, Object> overview() {

        LocalDateTime now = LocalDateTime.now();

        long totalBookings = bookingRepository.count();
        long activeBookings =
                bookingRepository
                        .countByStartTimeLessThanEqualAndEndTimeGreaterThan(now, now);

        long totalSlots = slotRepository.count();
        long activeSlots = slotRepository.countByActiveTrue();
        long inactiveSlots = slotRepository.countByActiveFalse();

        return Map.of(
                "totalBookings", totalBookings,
                "activeBookings", activeBookings,
                "totalSlots", totalSlots,
                "activeSlots", activeSlots,
                "inactiveSlots", inactiveSlots
        );
    }

    // 2️⃣ AREA OCCUPANCY
    @GetMapping("/areas")
    public List<Map<String, Object>> areaStats() {

        LocalDateTime now = LocalDateTime.now();

        return areaRepository.findAll().stream().map(area -> {

            List<String> slotIds =
                    slotRepository.findByAreaId(area.getId())
                            .stream()
                            .map(ParkingSlot::getId)
                            .toList();

            long totalSlots = slotIds.size();

            long occupiedSlots =
                    bookingRepository
                            .findBySlotIdInAndStartTimeLessThanEqualAndEndTimeGreaterThan(
                                    slotIds, now, now
                            )
                            .stream()
                            .map(Booking::getSlotId)
                            .distinct()
                            .count();

            Map<String, Object> map = new HashMap<>();
            map.put("areaId", area.getId());
            map.put("areaName", area.getName());
            map.put("totalSlots", totalSlots);
            map.put("occupiedSlots", occupiedSlots);

            return map;
        }).toList();
    }

}

