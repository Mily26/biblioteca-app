package com.grupo14.biblioteca.repositories;

import com.grupo14.biblioteca.models.Book;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends CrudRepository<Book, Integer> {

}
