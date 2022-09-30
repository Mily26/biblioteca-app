package com.grupo14.biblioteca.controllers;

import com.grupo14.biblioteca.models.Book;
import com.grupo14.biblioteca.repositories.BookRepository;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@EnableAutoConfiguration
public class BookController {
    private final BookRepository repository;
    BookController(BookRepository repository) {
        this.repository = repository;
    }

    @GetMapping(
            value = "/api/book",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    Iterable<Book> getBook() {
        return repository.findAll();
    }

    @GetMapping(
            value = "/api/book/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    Book getBookById(@PathVariable("id") int id) {
        Book book = repository.findById(id).orElse(null);
        if(book == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }
        return book;
    }
    @PostMapping(
            value = "/api/book",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    Book postBook(@RequestBody Book book) {
        repository.save(book);
        return book;
    }

    @PutMapping(
            value = "/api/book",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    Book putBook(@RequestBody Book book) {
        Book bookAct = repository.findById(book.getId()).orElse(null);
        if(bookAct == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }
        repository.save(book);
        return book;
    }
    @DeleteMapping(
            value = "/api/book/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    Book deleteBook(@PathVariable("id") int id) {
        Book book = repository.findById(id).orElse(null);
        if(book == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }
        repository.deleteById(id);
        return book;
    }

}
