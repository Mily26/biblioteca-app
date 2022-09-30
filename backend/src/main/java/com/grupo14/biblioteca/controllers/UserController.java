package com.grupo14.biblioteca.controllers;

import com.grupo14.biblioteca.models.Login;
import com.grupo14.biblioteca.models.User;
import com.grupo14.biblioteca.repositories.UserRepository;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@EnableAutoConfiguration
public class UserController {
    private final UserRepository repository;
    UserController(UserRepository repository) {
        this.repository = repository;
    }

    @GetMapping(
            value = "/api/user",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    Iterable<User> getUser() { return repository.findAll();}

    @GetMapping(
            value = "/api/user/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    User getUserById(@PathVariable("id") int id) {
        User user = repository.findById(id).orElse(null);
        if(user == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }
        return user;
    }

    @PostMapping(
            value = "/api/user",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    User postUser(@RequestBody User user) {
        repository.save(user);
        return user;
    }

    @PutMapping(
            value = "/api/user",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    User putUser(@RequestBody User user) {
        User userAct = repository.findById(user.getId()).orElse(null);
        if(userAct == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }
        repository.save(user);
        return user;
    }

    @DeleteMapping(
            value = "/api/user/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    User deleteUser(@PathVariable("id") int id) {
        User user = repository.findById(id).orElse(null);
        if(user == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }
        repository.deleteById(id);
        return user;
    }
    @PostMapping(
            value = "/api/login",
            produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    User login(@RequestBody Login login) {
        User user = repository.findByEmail(login.getEmail());
        if(user == null) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "access denied"
            );
        }
        if(!Objects.equals(user.getPassword(), login.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "access denied"
            );
        }
        return user;
    }
}
