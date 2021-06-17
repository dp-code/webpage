package com.dp.webpage.controller;

import com.dp.webpage.utility.ResourceUtility;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import java.util.AbstractMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping(path = "/json")
public class JsonDataController extends BaseController {
    @Value("${url.base}")
    private String urlBase;

    private static final String fileNamePattern = "json/%s.json";

    @GetMapping(path = "/list/{locale}/{key}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Map<String, Object>> getJsonList(
            @PathVariable() final String locale,
            @PathVariable() final String key,
            HttpServletRequest request
    ) {
        logger.info(String.format("JsonDataController.getJsonList called from ", request.getRemoteAddr()));
        try {
            List<Map<String, Object>> data = ResourceUtility.readJsonListFile(String.format(fileNamePattern, key));
            return data.stream()
                    .map(obj -> localize(obj, locale))
                    .map(obj -> updateUrl(obj))
                    .collect(Collectors.toList());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, key + " not Found");
        }
    }

    private Map<String, Object> updateUrl(Map<String, Object> map) {
        return map.entrySet().stream()
                .map(entry -> {
                    String key = entry.getKey();
                    Object value = entry.getValue();
                    if (value.getClass() == String.class && ((String) value).contains("~url.base~")) {
                        value = ((String) value).replaceAll("~url.base~", urlBase);
                    }
                    return new AbstractMap.SimpleEntry<>(key, value);
                })
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }
}
