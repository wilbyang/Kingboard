package com.king.kingboard.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.king.kingboard.model.Task;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    public static final String DATA_URL = "https://storage.googleapis.com/king-airnd-recruitment-sandbox-data/data.json";
    private static final Logger logger = LoggerFactory.getLogger(TaskService.class);
    
    private final RestTemplate restTemplate;
    
    private final ObjectMapper objectMapper;

    public TaskService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public Page<Task> getFilteredTasks(String name, String status, Pageable pageable) {
        List<Task> allItems = fetchTasks();
        
        List<Task> filteredItems = allItems.stream()
            .filter(item -> (!StringUtils.hasLength(name) || item.getName().toLowerCase().contains(name.toLowerCase()))
                && (!StringUtils.hasLength(status) || item.getStatus().equals(status)))
            .collect(Collectors.toList());
        
        int start = (int) pageable.getOffset() - pageable.getPageSize();
        if (start > filteredItems.size()) {
            return new PageImpl<>(Collections.emptyList(), pageable, 0);
        }        

        int end = Math.min((start + pageable.getPageSize()), filteredItems.size());
        
        
        return new PageImpl<>(
            filteredItems.subList(start, end), pageable, filteredItems.size()
        );
    }

    @Cacheable(cacheNames = "tasks")
    public List<Task> fetchTasks() {
        JsonNode response = restTemplate.getForObject(DATA_URL, JsonNode.class);
        List<Task> items = new ArrayList<>();
        
        if (response != null && response.has("output")) {
            response.get("output").forEach(item -> {
                items.add(objectMapper.convertValue(item, Task.class));
            });
        }
        logger.debug("Fetched {} items from origin", items.size());
        return items;
    }
} 