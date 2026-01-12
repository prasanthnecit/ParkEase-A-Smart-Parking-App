package com.parkease.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "parking_areas")
public class ParkingArea {

    @Id
    private String id;

    private String name;
    private String location;

    public ParkingArea() {}

    public ParkingArea(String name, String location) {
        this.name = name;
        this.location = location;
    }
    // Getters & Setters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLocation() {
        return location;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
