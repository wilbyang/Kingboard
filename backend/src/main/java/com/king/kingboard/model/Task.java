package com.king.kingboard.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.king.kingboard.util.MultiFormatInstantDeserializer;

import java.time.Instant;

public class Task {
    private Long id;
    private String status;


    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "UTC")
    private Instant createdOn;
    private String name;
    private String description;
    private Integer delta;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Instant getCreatedOn() {
        Instant tmp = correctPossiblyMisinterpretedInstant(createdOn);
        return tmp;
    }

    public void setCreatedOn(Instant createdOn) {

        this.createdOn = createdOn;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDelta() {
        return delta;
    }

    public void setDelta(Integer delta) {
        this.delta = delta;
    }

    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", status='" + status + '\'' +
                ", createdOn=" + createdOn +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", delta=" + delta +
                '}';
    }


    public Instant correctPossiblyMisinterpretedInstant(Instant instant) {
        // Get the year from the instant
        int year = instant.atZone(java.time.ZoneOffset.UTC).getYear();

        // If the year is unreasonably far in the future (e.g., beyond 3000)
        // we likely interpreted milliseconds as seconds
        if (year > 3000) {
            // Convert back by treating the seconds value as milliseconds
            long millisValue = instant.getEpochSecond() * 1000 + instant.getNano() / 1000000;
            return Instant.ofEpochMilli(millisValue / 1000);
        }

        return instant;
    }
}
