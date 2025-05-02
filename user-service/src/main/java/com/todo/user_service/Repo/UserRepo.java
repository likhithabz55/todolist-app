package com.todo.user_service.Repo;
import com.todo.user_service.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepo extends JpaRepository<User, String> {

    boolean existsByEmail(String email);
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username);

}