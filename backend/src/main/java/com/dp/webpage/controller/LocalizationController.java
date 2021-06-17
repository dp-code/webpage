package com.dp.webpage.controller;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping(path = "/localization")
public class LocalizationController extends BaseController {
    @GetMapping(path = "/supported-locales", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<String> getSupportedLocales(HttpServletRequest request) {
        logger.info(String.format("LocalizationController.getSupportedLocales called from ", request.getRemoteAddr()));
        return localizationService.getSupportedLocales();
    }

    @GetMapping(path = "/locale-info/{locale}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<Map<String, Object>> getLocaleInfo(@PathVariable() final String locale, HttpServletRequest request) {
        logger.info(String.format("LocalizationController.getLocaleInfo called from ", request.getRemoteAddr()));
        Map<String, Object> localeInfo = localizationService.getLocaleInfo(locale);
        String usedLocale = getUsedLocale(localeInfo, locale);
        List<Map<String, Object>> locales = (List<Map<String, Object>>) localeInfo.get("locales");
        return locales.stream().map(map -> localize(map, usedLocale)).collect(Collectors.toList());
    }

    @GetMapping(path = "/localize/{locale}/{key}", produces = MediaType.TEXT_PLAIN_VALUE)
    @ResponseBody
    public String getLocalization(
            @PathVariable() final String locale,
            @PathVariable() final String key,
            HttpServletRequest request
    ) {
        logger.info(String.format("LocalizationController.getLocalization called from ", request.getRemoteAddr()));
        Map<String, Object> localeInfo = localizationService.getLocaleInfo(locale);
        String usedLocale = getUsedLocale(localeInfo, locale);
        return localizationService.localize(usedLocale, key);
    }

    private String getUsedLocale(Map<String, Object> localeInfo, String locale) {
        List<Map<String, Object>> locales = (List<Map<String, Object>>) localeInfo.get("locales");
        List<String> names = locales.stream()
                .map(map -> map.get("name").toString())
                .collect(Collectors.toList());
        return names.contains(locale) ? locale : localeInfo.get("default").toString();
    }
}
