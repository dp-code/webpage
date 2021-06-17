package com.dp.webpage.service;

import java.util.List;
import java.util.Map;

public interface LocalizationService {
    List<String> getSupportedLocales();

    Map<String, Object> getLocaleInfo(final String locale);

    String localize(final String locale, final String key);
}
