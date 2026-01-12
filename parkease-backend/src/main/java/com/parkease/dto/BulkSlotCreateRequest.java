package com.parkease.dto;

import java.util.List;

public class BulkSlotCreateRequest {

    private String areaId;
    private List<String> slotCodes;

    public String getAreaId() {
        return areaId;
    }

    public List<String> getSlotCodes() {
        return slotCodes;
    }

    public void setAreaId(String areaId) {
        this.areaId = areaId;
    }

    public void setSlotCodes(List<String> slotCodes) {
        this.slotCodes = slotCodes;
    }
}
