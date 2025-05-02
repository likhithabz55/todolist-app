package com.todo.taskview_service.Repo;

//import com.todo.user_service.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.todo.taskview_service.Entity.Task;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface TaskRepo extends JpaRepository<Task, Long> {

    //public List<Task> findByCompletedTrue(String username);
    //public List<Task> findByCompletedFalse(String username);
    //public List<Task> getTasks(String username);

    public Task save(Task task);

    //public Task updateTask(Task task);

    public List<Task> findByStatusInAndUsername(List<String> statuses, String username);

    Optional<Task> findByUsernameAndTaskname(String username, String taskname);

    public List<Task> findByUsernameAndStatus(String username, String status);
}

