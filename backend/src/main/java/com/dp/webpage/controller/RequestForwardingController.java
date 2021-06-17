package com.dp.webpage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin(origins = "*")
public class RequestForwardingController {
    @RequestMapping(value = "/techstack")
    public String redirectTechstack() {
        return "forward:/";
    }

    @RequestMapping(value = "/contact")
    public String redirectContact() {
        return "forward:/";
    }

    @RequestMapping(value = "/imprint")
    public String redirectImprint() {
        return "forward:/";
    }
}
