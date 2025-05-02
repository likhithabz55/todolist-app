package com.todo.taskview_service.Service;

import com.todo.taskview_service.Entity.Task;
import com.todo.taskview_service.Repo.TaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    TaskRepo taskRepo;

    public String createNewTask(Task task) {
        taskRepo.save(task);
        return "Task added successfully";
    }

    public String updateTask(Task task) {
        Optional<Task> existingTaskOpt = taskRepo.findByUsernameAndTaskname(task.getUsername(), task.getTaskname());
        System.out.println(task.getId());
        if (existingTaskOpt.isPresent()) {
            Task existingTask = existingTaskOpt.get();
            existingTask.setStatus(task.getStatus());  // Update the status
            existingTask.setDeadline(task.getDeadline());  // Update the deadline
            System.out.println("updating " + existingTask.getTaskname()+"task status : "+existingTask.getStatus());
            taskRepo.save(existingTask);
            return "Task updated successfully";
        }
        throw new RuntimeException("Task not found");
    }

    public List<Task> findByStatusInAndUsername(List<String> statuses, String username) {
        return taskRepo.findByStatusInAndUsername(statuses, username);

    }

    public List<Task> findByUsernameAndStatus(String username, String status) {
        return taskRepo.findByUsernameAndStatus(username, status);

    }

}