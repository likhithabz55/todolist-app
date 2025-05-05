package com.todo.taskview_service.Controller;

import com.todo.taskview_service.Entity.Task;
//import com.todo.user_service.Entity.User;
//import com.todo.user_service.Requests.LoginRequest;
import com.todo.taskview_service.Requests.CreateTaskRequest;
import com.todo.taskview_service.Service.TaskService;
//import com.todo.user_service.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.data.util.TypeUtils.type;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    TaskService taskService;

    @PostMapping(path = "/addTask")
    public String addTask(@RequestBody Task task) {
        return taskService.createNewTask(task);
    }

    @PostMapping(path = "/updateTask")
    public String updateTask(@RequestBody Task task) {
        try {
            System.out.println("task received : " + task.getUsername() );
            return taskService.updateTask(task);

           // return new ResponseEntity<>(updatedTask, HttpStatus.OK);
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    @GetMapping(path = "/viewTasks")
    public ResponseEntity<List<Task>> getIncompleteTasks(@RequestParam String username,
                                                         @RequestParam(required = false) String status) {
         List<Task> tasks;
         if(status == null ) {
             tasks = taskService.findByStatusInAndUsername(List.of("Not Started", "In Progress"), username);
         }
         else if (status.equals("All")) {
             tasks = taskService.findByStatusInAndUsername(List.of("Not Started", "In Progress","Completed"), username);
         }
         else {
             tasks = taskService.findByUsernameAndStatus(username, status);
         }
         return ResponseEntity.ok(tasks);
    }
}
