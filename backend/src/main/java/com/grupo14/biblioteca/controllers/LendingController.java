package com.grupo14.biblioteca.controllers;

import com.grupo14.biblioteca.models.Book;
import com.grupo14.biblioteca.models.BookLending;
import com.grupo14.biblioteca.models.Lending;
import com.grupo14.biblioteca.repositories.BookRepository;
import com.grupo14.biblioteca.repositories.LendingRepository;

import java.util.ArrayList;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.data.relational.core.sql.FalseCondition;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@EnableAutoConfiguration
public class LendingController {
    private final LendingRepository repository;
    private final BookRepository bookRepository;

    LendingController(LendingRepository repository, BookRepository bookRepository) {
        this.repository = repository;
        this.bookRepository = bookRepository;
    }

    @GetMapping(
            value = "/api/lending",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    Iterable<BookLending> getLending(@RequestParam(defaultValue = "false") boolean onlyNotReturned,
                                     @RequestHeader("x-user-id") int userId
                                     ) {
        var allBooks = bookRepository.findAll();

        Iterable<Lending> lendings;
        if(onlyNotReturned) {
            lendings = repository.findLendingsNotReturned(userId);
        }
        else {
            lendings = repository.findByUserId(userId);
        }
        var result = new ArrayList<BookLending>();
        for(Lending lend: lendings) {
            var bookLend = new BookLending();
            bookLend.setLendingId(lend.getId());
            bookLend.setDateOut(lend.getDateOut());
            bookLend.setDateReturn(lend.getDateReturn());
            bookLend.setUserId(lend.getUserId());
            bookLend.setBookId(lend.getBookId());
            for(Book book: allBooks) {
                if(book.getId()== lend.getBookId()) {
                    bookLend.setTitle(book.getTitle());
                    bookLend.setAuthor(book.getAuthor());
                }
            }
            result.add(bookLend);
        }

        return result;
    }

    @GetMapping(
            value = "/api/lending/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    BookLending getLendingById(@PathVariable("id") int id) {
        Lending lending = repository.findById(id).orElse(null);
        if(lending == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }

        var allBooks = bookRepository.findAll();
        var result = new BookLending();
        result.setLendingId(lending.getId());
        result.setDateOut(lending.getDateOut());
        result.setDateReturn(lending.getDateReturn());
        result.setBookId(lending.getBookId());
        result.setUserId(lending.getUserId());
        for(Book book: allBooks) {
            if(book.getId()== lending.getBookId()) {
                result.setTitle(book.getTitle());
                result.setAuthor(book.getAuthor());
            }
        }
        return result;
    }

    @PostMapping(
        value = "/api/lending",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
)
    Lending postLending(@RequestBody Lending lending) {
        repository.save(lending);
        return lending;
    }

    @PutMapping(
            value = "/api/lending",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    Lending putLending(@RequestBody Lending lending) {
        Lending lendingAct = repository.findById(lending.getId()).orElse(null);
        if(lendingAct == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }
        repository.save(lending);
        return lending;
    }

    @DeleteMapping(
            value = "/api/lending/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    Lending deleteLending(@PathVariable("id") int id) {
        Lending lending = repository.findById(id).orElse(null);
        if(lending == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "entity not found"
            );
        }
        repository.deleteById(id);
        return lending;
    }
}

