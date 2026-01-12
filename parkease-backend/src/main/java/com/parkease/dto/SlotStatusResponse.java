package com.parkease.dto;

import java.time.LocalDateTime;

public class SlotStatusResponse {

    private final String slotId;
    private final String slotCode;
    private final String status; // AVAILABLE / BOOKED

    private final LocalDateTime bookedFrom;
    private final LocalDateTime bookedTo;

    public SlotStatusResponse(String slotId,
                              String slotCode,
                              String status,
                              LocalDateTime bookedFrom,
                              LocalDateTime bookedTo) {
        this.slotId = slotId;
        this.slotCode = slotCode;
        this.status = status;
        this.bookedFrom = bookedFrom;
        this.bookedTo = bookedTo;
    }

    public String getSlotId() { return slotId; }
    public String getSlotCode() { return slotCode; }
    public String getStatus() { return status; }
    public LocalDateTime getBookedFrom() { return bookedFrom; }
    public LocalDateTime getBookedTo() { return bookedTo; }
}
