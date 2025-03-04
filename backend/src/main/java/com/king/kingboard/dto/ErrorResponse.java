package com.king.kingboard.dto;

public class ErrorResponse {
    private int status;
    private String error;
    private String detail;

    public ErrorResponse(int status, String error, String detail) {
        this.status = status;
        this.error = error;
        this.detail = detail;
    }

    // Getter 方法（必须有，否则无法序列化为 JSON）
    public int getStatus() { return status; }
    public String getError() { return error; }
    public String getDetail() { return detail; }
}

