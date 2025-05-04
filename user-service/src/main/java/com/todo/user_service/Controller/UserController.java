package com.todo.user_service.Controller;


import com.todo.user_service.Entity.User;
import com.todo.user_service.Requests.LoginRequest;
import com.todo.user_service.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping(path = "/signup")
    //@PostMapping
    public String registerUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @PostMapping(path="/login")
    //@PostMapping
    public String login(@RequestBody LoginRequest loginRequest) {
        return userService.isAuthenticated(loginRequest);
    }

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }

}
