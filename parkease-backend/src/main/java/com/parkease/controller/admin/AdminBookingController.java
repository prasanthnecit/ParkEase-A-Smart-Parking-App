package com.parkease.controller.admin;

import com.parkease.model.Booking;
import com.parkease.model.ParkingSlot;
import com.parkease.repository.BookingRepository;
import com.parkease.repository.ParkingSlotRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/bookings")
public class AdminBookingController {

    private final BookingRepository bookingRepository;
    private final ParkingSlotRepository slotRepository;

    public AdminBookingController(BookingRepository bookingRepository,
                                  ParkingSlotRepository slotRepository) {
        this.bookingRepository = bookingRepository;
        this.slotRepository = slotRepository;
    }

    // 1️⃣ All bookings
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // 2️⃣ Bookings by area
    @GetMapping("/area/{areaId}")
    public List<Booking> getBookingsByArea(@PathVariable String areaId) {

        List<String> slotIds = slotRepository.findByAreaId(areaId)
                .stream()
                .map(ParkingSlot::getId)
                .toList();

        return bookingRepository.findBySlotIdIn(slotIds);
    }
}
