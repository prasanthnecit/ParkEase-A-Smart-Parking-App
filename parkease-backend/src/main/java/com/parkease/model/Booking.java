package com.parkease.model;

import com.parkease.repository.ParkingAreaRepository;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "bookings")
public class Booking {
    private ParkingAreaRepository parkingArea;

    @Id
    private String id;

    private String userId;
    private String slotId;
    private String slotCode;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private String vehicleType;

    private double amount;


    public Booking() {}

    public Booking(String userId, String slotId,String slotCode,
                   LocalDateTime startTime,
                   LocalDateTime endTime,
                   String vehicleType,Double amount) {
        this.userId = userId;
        this.slotId = slotId;
        this.slotCode=slotCode;
        this.startTime = startTime;
        this.endTime = endTime;
        this.vehicleType = vehicleType;
        this.amount=amount;
    }



    // Getters & Setters
    public String getId() { return id; }
    public String getUserId() { return userId; }
    public String getSlotId() { return slotId; }
    public LocalDateTime getStartTime() { return startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public String getVehicleType() { return vehicleType; }
    public double getAmount() {
        return amount;
    }

    public void setId(String id) { this.id = id; }
    public void setUserId(String userId) { this.userId = userId; }
    public void setSlotId(String slotId) { this.slotId = slotId; }
    public void setSlotCode(String slotCode) { this.slotCode = slotCode; }

    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public void setVehicleType(String vehicleType) { this.vehicleType = vehicleType; }


    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getSlotCode() {
        return slotCode;
    }
}
