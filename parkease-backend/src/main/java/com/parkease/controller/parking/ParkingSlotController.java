package com.parkease.controller.parking;

import com.parkease.dto.SlotStatusResponse;
import com.parkease.model.Booking;
import com.parkease.model.ParkingSlot;
import com.parkease.repository.BookingRepository;
import com.parkease.repository.ParkingSlotRepository;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class ParkingSlotController {

    private final ParkingSlotRepository slotRepository;
    private final BookingRepository bookingRepository;

    public ParkingSlotController(
            ParkingSlotRepository slotRepository,
            BookingRepository bookingRepository
    ) {
        this.slotRepository = slotRepository;
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/{areaId}")
    public List<SlotStatusResponse> getSlotsWithStatus(
            @PathVariable String areaId) {

        List<ParkingSlot> slots =
                slotRepository.findByAreaId(areaId);

        LocalDateTime now = LocalDateTime.now();

        return slots.stream().map(slot -> {

            List<Booking> activeBookings =
                    bookingRepository
                            .findBySlotIdAndEndTimeAfterAndStartTimeBefore(
                                    slot.getId(), now, now
                            );

            if (activeBookings.isEmpty()) {
                return new SlotStatusResponse(
                        slot.getId(),
                        slot.getSlotCode(),
                        "AVAILABLE",
                        null,
                        null
                );
            } else {
                Booking b = activeBookings.get(0);
                return new SlotStatusResponse(
                        slot.getId(),
                        slot.getSlotCode(),
                        "BOOKED",
                        b.getStartTime(),
                        b.getEndTime()
                );
            }
        }).toList();
    }
}
