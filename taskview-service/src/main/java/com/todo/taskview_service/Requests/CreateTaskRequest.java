package com.todo.taskview_service.Requests;


import java.util.Date;

public class CreateTaskRequest {
    private String username;
    private String taskname;
    private String status;
    private Date deadline;

    public CreateTaskRequest(String username, String taskname, String status, Date deadline) {
        this.username = username;
        this.taskname = taskname;
        this.status = status;
        this.deadline = deadline;;
    }

    public CreateTaskRequest() {}

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
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public Date getDeadline() {
        return deadline;
    }
    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }
}
