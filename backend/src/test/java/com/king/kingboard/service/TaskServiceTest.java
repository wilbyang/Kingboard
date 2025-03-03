package com.king.kingboard.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.king.kingboard.model.Task;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

class TaskServiceTest {

    @Mock
    private RestTemplate restTemplate;

    private ObjectMapper objectMapper;
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        taskService = new TaskService(restTemplate, objectMapper);
    }

    @Test
    void shouldHandleDateFormatCorrectly() throws JsonProcessingException {
        // Prepare test data
        String jsonResponse = """
            {
                "output": [{
                    "id": 6690,
                    "status": "COMPLETED",
                    "createdOn": "2018-11-23T14:06:25.000Z",
                    "name": "test_task",
                    "description": "Test description",
                    "delta": 1770
                }]
            }
            """;
        
        JsonNode mockResponse = objectMapper.createObjectNode()
            .set("output", objectMapper.createArrayNode()
                .add(((ObjectNode) objectMapper.readTree(jsonResponse).get("output").get(0))));
        
        when(restTemplate.getForObject(TaskService.DATA_URL, JsonNode.class))
            .thenReturn(mockResponse);

        // Execute
        Page<Task> result = taskService.getFilteredData(null, null, PageRequest.of(0, 10));

        // Verify
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        Task task = result.getContent().get(0);
        assertEquals(6690L, task.getId());
        assertEquals("COMPLETED", task.getStatus());
        assertNotNull(task.getCreatedOn());
        assertEquals("test_task", task.getName());
        assertEquals(1770, task.getDelta());
    }
} 