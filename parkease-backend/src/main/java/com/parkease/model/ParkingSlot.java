package com.parkease.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "parking_slots")
public class ParkingSlot {

    @Id
    private String id;

    private String areaId;     // parking premises ID
    private String slotCode;   // A1, A2, etc.

    private boolean active = true; // NEW: enable/disable slot

    public ParkingSlot() {}

    public ParkingSlot(String areaId, String slotCode) {
        this.areaId = areaId;
        this.slotCode = slotCode;
        this.active = true;
    }

    public String getId() { return id; }
    public String getAreaId() { return areaId; }
    public String getSlotCode() { return slotCode; }
    public boolean isActive() { return active; }

    public void setId(String id) { this.id = id; }
    public void setAreaId(String areaId) { this.areaId = areaId; }
    public void setSlotCode(String slotCode) { this.slotCode = slotCode; }
    public void setActive(boolean active) { this.active = active; }
}
