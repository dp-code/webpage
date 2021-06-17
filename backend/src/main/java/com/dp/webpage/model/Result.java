package com.dp.webpage.model;

public class Result {
    public static final Result SUCCESS = new Result(true);
    public static final Result FAILURE = new Result(false);

    private final boolean success;

    public Result(final boolean success) {
        this.success = success;
    }

    public boolean isSuccess() {
        return success;
    }
}
