package com.king.kingboard.controller;

import com.king.kingboard.model.Task;
import com.king.kingboard.service.TaskService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    
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
        return taskService.getFilteredData(search, status, pageable);
    }
} 