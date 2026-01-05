package com.parkease.dto;

import java.time.LocalDateTime;

public class BookingRequest {

    private String slotId;
    private String slotCode;
    private String areaId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String vehicleType;
    private double amount;


    public double getAmount() {
        return amount;
    }


    public String getSlotId() { return slotId; }
    public String getSlotCode() { return slotCode; }

    public LocalDateTime getStartTime() { return startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public String getVehicleType() { return vehicleType; }

    public void setSlotId(String slotId) { this.slotId = slotId; }
    public void setSlotCode(String slotCode) { this.slotCode = slotCode; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }
    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getAreaId() {
        return this.areaId;
    }

    public void setAreaId(String areaId) {
        this.areaId = areaId;
    }

}
