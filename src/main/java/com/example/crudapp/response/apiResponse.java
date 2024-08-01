package com.example.crudapp.response;


public class apiResponse {
    private String message;
    private Object result;

    public apiResponse(String message, Object result) {
        this.message = message;
        this.result = result;
    }

    // Getters and setters
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getResult() {
        return result;
    }

    public void setResult(Object result) {
        this.result = result;
    }
}
