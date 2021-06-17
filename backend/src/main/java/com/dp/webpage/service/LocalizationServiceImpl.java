package com.dp.webpage.service;

import com.dp.webpage.utility.ResourceUtility;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class LocalizationServiceImpl implements LocalizationService {
    @Override
    public List<String> getSupportedLocales() {
        try {
            Map<String, Object> data = ResourceUtility.readJsonDataFile("json/locales.json");
            List<Map<String, Object>> locales = (List<Map<String, Object>>) data.get("locales");
            List<String> names = locales.stream()
                    .map(map -> map.get("name").toString())
                    .collect(Collectors.toList());
            return names;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public Map<String, Object> getLocaleInfo(final String locale) {
        try {
            Map<String, Object> data = ResourceUtility.readJsonDataFile("json/locales.json");
            return data;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No localization for " + locale);
        }
    }

    @Override
    public String localize(final String locale, final String key) {
        String localeFile = "json/localization_" + locale + ".json";
        Object value = readLocalization(locale, localeFile).get(key);
        if (value != null) return value.toString();
        else throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Localization value not found");
    }

    private Map<String, Object> readLocalization(final String locale, final String localeFile) {
        try {
            return ResourceUtility.readJsonDataFile(localeFile);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No localization for " + locale);
        }
    }
}
