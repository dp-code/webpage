package com.dp.webpage.utility;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResourceUtility {
    public static String readStringFile(final String filename) throws Exception {
        ClassPathResource cpr = new ClassPathResource(filename);
        return convertInputStreamToString(cpr.getInputStream());
    }

    public static Map<String, Object> readJsonDataFile(final String filename) throws Exception {
        ClassPathResource cpr = new ClassPathResource(filename);
        return new ObjectMapper().readValue(cpr.getInputStream(), HashMap.class);
    }

    public static List<Map<String, Object>> readJsonListFile(final String filename) throws Exception {
        ClassPathResource cpr = new ClassPathResource(filename);
        return new ObjectMapper().readValue(cpr.getInputStream(), new TypeReference<List<Map<String, Object>>>() {
        });
    }

    private static String convertInputStreamToString(InputStream is) throws IOException {
        ByteArrayOutputStream result = new ByteArrayOutputStream();
        byte[] buffer = new byte[128];
        int length;
        while ((length = is.read(buffer)) != -1) {
            result.write(buffer, 0, length);
        }
        return result.toString(StandardCharsets.UTF_8.name());
    }
}
