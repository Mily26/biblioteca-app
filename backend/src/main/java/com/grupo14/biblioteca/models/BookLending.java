package com.grupo14.biblioteca.models;

import java.util.Date;

public class BookLending {
    private int lendingId;
    public int getLendingId() {
        return lendingId;
    }
    public void setLendingId(int lendingId) {
        this.lendingId = lendingId;
    }
    private String title;
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    private String author;
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author = author;
    }
    private Date dateOut;
    public Date getDateOut() {
        return dateOut;
    }
    public void setDateOut(Date dateOut) {
        this.dateOut = dateOut;
    }
    private Date dateReturn;
    public Date getDateReturn() {
        return dateReturn;
    }
    public void setDateReturn(Date dateReturn) {
        this.dateReturn = dateReturn;
    }
    private int bookId;
    private int userId;

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
