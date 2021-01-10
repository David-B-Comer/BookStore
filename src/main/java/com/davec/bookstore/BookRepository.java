package com.davec.bookstore;

import org.springframework.data.repository.CrudRepository;
import java.awt.print.Book;

public interface BookRepository extends CrudRepository<Book, Long> {
}
