package com.king.kingboard.controller;

import com.king.kingboard.model.Task;
import com.king.kingboard.service.TaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private static final Logger logger = LoggerFactory.getLogger(TaskController.class);
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public Page<Task> getData(
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String status,
        Pageable pageable
    ) {
        logger.info("Fetching tasks - search={}, status={}, page={}, size={}", 
            search, status, pageable.getPageNumber(), pageable.getPageSize());
        
        Page<Task> result = taskService.getFilteredTasks(search, status, pageable);
        
        logger.info("Returned tasks - totalElements={}, totalPages={}", 
            result.getTotalElements(), result.getTotalPages());
        
        return result;
    }
} 