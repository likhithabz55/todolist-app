package com.todo.user_service.Service;

import com.todo.user_service.Entity.User;
import com.todo.user_service.Repo.UserRepo;
import com.todo.user_service.Requests.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public String addUser(User user) {
        if(userRepo.existsByUsername(user.getUsername())){
            return "User already exists";
        }
        if(userRepo.existsByEmail(user.getEmail())){
            return "Email already exists";
        }
        if(user.getPassword() == null){
            return "Password Should not be empty";
        }
        userRepo.save(user);
        return "User added";
    }

    public String isAuthenticated(LoginRequest loginRequest) {
        Optional<User> user = userRepo.findByUsername(loginRequest.getUsername());
        if(user.isPresent()) {
            if(user.get().getPassword().equals(loginRequest.getPassword())) {
                return "User Authenticated";
            }
            else{
                return "Password is incorrect";
            }
        }
        else{
            return "User not found";
        }
    }

}
