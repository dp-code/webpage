package com.dp.webpage.controller;

import com.dp.webpage.utility.ResourceUtility;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping(path = "/html")
public class HtmlController extends BaseController {
    private static final String fileNamePattern = "html/%s-%s.html";

    @GetMapping(path = "/{locale}/{key}", produces = MediaType.TEXT_HTML_VALUE)
    @ResponseBody
    public String getData(
            @PathVariable() final String locale,
            @PathVariable() final String key,
            HttpServletRequest request
    ) {
        logger.info(String.format("HtmlController.getData called from ", request.getRemoteAddr()));
        try {
            return ResourceUtility.readStringFile(String.format(fileNamePattern, key, locale));
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, key + " " + locale + " not Found");
        }
    }
}
