package com.dp.webpage.controller;

import com.dp.webpage.model.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Controller
@CrossOrigin(origins = "*")
@RequestMapping(path = "/messages")
public class MessageController extends BaseController {
    private static final String fileNamePattern = "%s%s.html";
    private static final String dateTimePattern = "yyyy-MM-dd-hh-mm-ss-SSS";

    @Value("${directory.messages}")
    private String messageFolder = "D:\\";

    @PostMapping(path = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public Result sendMessage(@RequestBody String body, HttpServletRequest request) {
        try {
            logger.info(String.format("Receiving message from %s", request.getRemoteAddr()));
            String filename = String.format(fileNamePattern, messageFolder, getDateTime());
            writeToFile(filename, body);
            return Result.SUCCESS;
        } catch (Exception e) {
            logger.error(e.getMessage());
            return Result.FAILURE;
        }
    }

    private String getDateTime() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(dateTimePattern));
    }

    private void writeToFile(String filename, String data) throws Exception {
        FileOutputStream fos = new FileOutputStream(filename);
        byte[] bytes = data.getBytes(StandardCharsets.UTF_8.name());
        fos.write(bytes);
        fos.close();
    }
}
