package com.grupo14.biblioteca.repositories;

import com.grupo14.biblioteca.models.Lending;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LendingRepository extends CrudRepository<Lending,Integer> {
    @Query("SELECT id, user_id, book_id, date_out, date_return FROM lendings WHERE date_return IS NULL and user_id = :user_id")
    List<Lending> findLendingsNotReturned(@Param("user_id") int userId);

    List<Lending> findByUserId(int userId);
}
