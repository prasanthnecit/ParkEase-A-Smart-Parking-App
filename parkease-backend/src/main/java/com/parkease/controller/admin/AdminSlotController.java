package com.parkease.controller.admin;

import com.parkease.dto.BulkSlotCreateRequest;
import com.parkease.dto.SlotStatusUpdateRequest;
import com.parkease.model.ParkingSlot;
import com.parkease.repository.ParkingSlotRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/admin/slots")
public class AdminSlotController {

    private final ParkingSlotRepository slotRepository;

    public AdminSlotController(ParkingSlotRepository slotRepository) {
        this.slotRepository = slotRepository;
    }

    // 1️⃣ BULK CREATE SLOTS
    @PostMapping("/bulk")
    public String createSlots(@RequestBody BulkSlotCreateRequest request) {

        List<ParkingSlot> slotsToSave = new ArrayList<>();

        for (String code : request.getSlotCodes()) {

            boolean exists = slotRepository
                    .existsByAreaIdAndSlotCode(request.getAreaId(), code);

            if (exists) {
                throw new RuntimeException(
                        "Slot already exists: " + code
                );
            }

            slotsToSave.add(
                    new ParkingSlot(request.getAreaId(), code)
            );
        }

        slotRepository.saveAll(slotsToSave);
        return "Slots created successfully";
    }

    // 2️⃣ DELETE SLOT
    @DeleteMapping("/{slotId}")
    public String deleteSlot(@PathVariable String slotId) {
        slotRepository.deleteById(slotId);
        return "Slot deleted";
    }

    // 3️⃣ ENABLE / DISABLE SLOT
    @PutMapping("/{slotId}/status")
    public String updateSlotStatus(
            @PathVariable String slotId,
            @RequestBody SlotStatusUpdateRequest request) {

        ParkingSlot slot = slotRepository.findById(slotId)
                .orElseThrow(() -> new RuntimeException("Slot not found"));

        slot.setActive(request.isActive());
        slotRepository.save(slot);

        return "Slot status updated";
    }

    // 4️⃣ LIST SLOTS BY AREA
    @GetMapping("/area/{areaId}")
    public List<ParkingSlot> getSlotsByArea(@PathVariable String areaId) {
        return slotRepository.findByAreaId(areaId);
    }
}
