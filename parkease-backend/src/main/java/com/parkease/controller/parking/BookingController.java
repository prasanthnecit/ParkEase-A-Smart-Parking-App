package com.parkease.controller.parking;

import com.parkease.dto.BookingRequest;
import com.parkease.model.Booking;
import com.parkease.repository.BookingRepository;
import com.parkease.util.SecurityUtil;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @PostMapping
    public String bookSlot(@RequestBody BookingRequest request) {

        List<Booking> conflicts =
                bookingRepository
                        .findBySlotIdAndEndTimeAfterAndStartTimeBefore(
                                request.getSlotId(),
                                request.getStartTime(),
                                request.getEndTime()
                        );

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Slot already booked for this time");
        }

        String userIdentifier = SecurityUtil.getCurrentUserIdentifier();

        Booking booking = new Booking(
                userIdentifier,
                request.getSlotId(),
                request.getSlotCode(),
                request.getStartTime(),
                request.getEndTime(),
                request.getVehicleType(),
                request.getAmount()
        );
        //System.out.println(request.getAmount());
        bookingRepository.save(booking);

        return "Booking confirmed";
    }

    @GetMapping
    public List<Booking> getMyBookings() {

        String userEmail = SecurityUtil.getCurrentUserIdentifier();
        List<Booking> l=new ArrayList<>(bookingRepository.findByUserId(userEmail));

        return bookingRepository.findByUserId(userEmail);
    }
}
