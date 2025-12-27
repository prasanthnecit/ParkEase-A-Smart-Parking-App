package com.parkease.config;

import com.parkease.model.ParkingArea;
import com.parkease.model.ParkingSlot;
import com.parkease.repository.ParkingAreaRepository;
import com.parkease.repository.ParkingSlotRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initData(
            ParkingAreaRepository areaRepo,
            ParkingSlotRepository slotRepo) {

        return args -> {

            if (areaRepo.count() > 0) return;

            ParkingArea mall1 =
                    areaRepo.save(new ParkingArea("Phoenix Mall", "Chennai"));
            ParkingArea mall2 =
                    areaRepo.save(new ParkingArea("Forum Mall", "Bangalore"));
            ParkingArea mall3 =
                    areaRepo.save(new ParkingArea("Express Avenue", "Chennai"));
            ParkingArea mall4 =
                    areaRepo.save(new ParkingArea("City Center", "Hyderabad"));

            createSlots(mall1.getId(), slotRepo, 10);
            createSlots(mall2.getId(), slotRepo, 12);
            createSlots(mall3.getId(), slotRepo, 15);
            createSlots(mall4.getId(), slotRepo, 10);
        };
    }

    private void createSlots(String areaId,
                             ParkingSlotRepository repo,
                             int count) {
        for (int i = 1; i <= count; i++) {
            repo.save(new ParkingSlot(areaId, "A" + i));
        }
    }
}
