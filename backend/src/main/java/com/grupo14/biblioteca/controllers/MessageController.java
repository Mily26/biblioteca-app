package com.grupo14.biblioteca.controllers;

import com.grupo14.biblioteca.models.Message;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@EnableAutoConfiguration
public class MessageController {
    @GetMapping("/api/message")
    Message getMessage() {
        Message hello = new Message();
        hello.setText("Hello world");

        return hello;
    }

}
