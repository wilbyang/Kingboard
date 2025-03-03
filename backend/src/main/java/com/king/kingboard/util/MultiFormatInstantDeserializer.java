package com.king.kingboard.util;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.time.Instant;
import java.time.format.DateTimeParseException;

public class MultiFormatInstantDeserializer extends JsonDeserializer<Instant> {
    private static final Logger logger = LoggerFactory.getLogger(MultiFormatInstantDeserializer.class);
    private static final long EPOCH_MILLIS_THRESHOLD = 100000000000L; // Year ~1973
    
    @Override
    public Instant deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        String value = parser.getValueAsString();
        
        if (value == null || value.isEmpty()) {
            return null;
        }

        // Try parsing as ISO-8601 first
        try {
            return Instant.parse(value);
        } catch (DateTimeParseException e) {
            // Not an ISO-8601 string, try numeric parsing
            try {
                long numericValue = Long.parseLong(value);
                return parseNumericTimestamp(numericValue);
            } catch (NumberFormatException nfe) {
                throw new IOException("Unable to parse Instant from value: " + value, nfe);
            }
        }
    }

    private Instant parseNumericTimestamp(long value) {
        // If value is greater than threshold, assume it's milliseconds
        // Otherwise, assume it's seconds
        if (Math.abs(value) >= EPOCH_MILLIS_THRESHOLD) {
            return Instant.ofEpochMilli(value);
        } else {
            return Instant.ofEpochSecond(value);
        }
    }
}
