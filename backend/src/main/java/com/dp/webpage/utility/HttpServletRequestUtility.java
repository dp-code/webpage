package com.dp.webpage.utility;

import javax.servlet.http.HttpServletRequest;

public class HttpServletRequestUtility {
    public static String getPathSuffix(HttpServletRequest request, String rootPath) {
        return getPathSuffix(request.getRequestURI(), request.getContextPath() + rootPath + "/");
    }

    private static String getPathSuffix(String uri, String prefix) {
        if (uri.length() <= prefix.length()) return "";
        else return uri.split(prefix)[1];
    }
}
