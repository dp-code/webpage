package com.dp.webpage.controller;

import com.dp.webpage.service.LocalizationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.AbstractMap;
import java.util.Map;
import java.util.stream.Collectors;

public class BaseController {
    Logger logger = LoggerFactory.getLogger(BaseController.class);

    @Autowired
    LocalizationService localizationService;

    Map<String, Object> localize(Map<String, Object> map, String locale) {
        return map.entrySet().stream()
                .map(entry -> {
                    String key = entry.getKey();
                    Object value = entry.getValue();
                    if (entry.getKey().equals("title") || entry.getKey().equals("text")) {
                        value = localizationService.localize(locale, value.toString());
                    }
                    return new AbstractMap.SimpleEntry<>(key, value);
                })
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));
    }
}
