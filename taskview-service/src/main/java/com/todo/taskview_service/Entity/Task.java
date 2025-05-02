package com.todo.taskview_service.Entity;


import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import java.util.Date;
import java.text.SimpleDateFormat;

import jakarta.persistence.*;


@Entity
//@Table(name="Tasks")
@Table(name = "tasks", uniqueConstraints = {@UniqueConstraint(columnNames = {"username", "taskname"})})


public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String username;
    private String taskname;


    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date deadline;

    private String status;

    public Task(){

    }
    public Task(String username, String taskname, String deadline, String status,Long id) {
        this.username = username;
        this.taskname = taskname;
        try {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd"); // Use the correct date format
        this.deadline = sdf.parse(deadline);
        }
        catch (Exception e) {
        e.printStackTrace();
        }
        this.status = status;
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    public String getTaskname() {
        return taskname;
    }

    public void setTaskname(String taskname) {
        this.taskname = taskname;
    }

    public Date getDeadline() {
        return deadline;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public String getStatus() {return status;}

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "taskname : " + taskname + "status : " + status + "username" + username + "deadline : " + deadline;
    }
}
