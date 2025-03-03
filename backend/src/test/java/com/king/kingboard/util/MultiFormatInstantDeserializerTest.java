package com.king.kingboard.util;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import java.io.IOException;
import java.time.Instant;
import java.util.stream.Stream;

import static org.junit.jupiter.api.Assertions.*;

class MultiFormatInstantDeserializerTest {

    private MultiFormatInstantDeserializer deserializer;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        deserializer = new MultiFormatInstantDeserializer();
        objectMapper = new ObjectMapper();
    }

    private static Stream<Arguments> validDateFormats() {
        return Stream.of(
            // ISO-8601 format
            Arguments.of(
                "\"2018-11-23T13:26:01.000Z\"",
                Instant.parse("2018-11-23T13:26:01.000Z")
            ),
            // Epoch milliseconds
            Arguments.of(
                "1542976575000",
                Instant.ofEpochMilli(1542976575000L)
            ),
            // Epoch seconds
            Arguments.of(
                "1542976575",
                Instant.ofEpochSecond(1542976575L)
            )
        );
    }

    @ParameterizedTest(name = "Should parse {0} correctly")
    @MethodSource("validDateFormats")
    void shouldParseValidFormats(String input, Instant expected) throws IOException {
        JsonParser parser = objectMapper.getFactory().createParser(input);
        parser.nextToken();

        Instant result = deserializer.deserialize(parser, null);

        assertEquals(expected, result);
    }

    @Test
    @DisplayName("Should handle null input")
    void shouldHandleNullInput() throws IOException {
        JsonParser parser = objectMapper.getFactory().createParser("null");
        parser.nextToken();

        Instant result = deserializer.deserialize(parser, null);

        assertNull(result);
    }

    @Test
    @DisplayName("Should handle empty string")
    void shouldHandleEmptyString() throws IOException {
        JsonParser parser = objectMapper.getFactory().createParser("\"\"");
        parser.nextToken();

        Instant result = deserializer.deserialize(parser, null);

        assertNull(result);
    }

    @Test
    @DisplayName("Should throw exception for invalid format")
    void shouldThrowExceptionForInvalidFormat() {
        assertThrows(IOException.class, () -> {
            JsonParser parser = objectMapper.getFactory().createParser("\"invalid-date\"");
            parser.nextToken();
            deserializer.deserialize(parser, null);
        });
    }

    @Test
    @DisplayName("Should handle zero timestamp")
    void shouldHandleZeroTimestamp() throws IOException {
        JsonParser parser = objectMapper.getFactory().createParser("0");
        parser.nextToken();

        Instant result = deserializer.deserialize(parser, null);

        assertEquals(Instant.EPOCH, result);
    }

    @Test
    @DisplayName("Should handle negative timestamps")
    void shouldHandleNegativeTimestamps() throws IOException {
        // Test with negative seconds
        JsonParser parser = objectMapper.getFactory().createParser("-1542976575");
        parser.nextToken();
        Instant result = deserializer.deserialize(parser, null);
        assertEquals(-1542976575L, result.getEpochSecond());

        // Test with negative milliseconds
        parser = objectMapper.getFactory().createParser("-1542976575000");
        parser.nextToken();
        result = deserializer.deserialize(parser, null);
        assertEquals(-1542976575000L, result.toEpochMilli());
    }
} 