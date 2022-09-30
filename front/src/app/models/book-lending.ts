export interface BookLending {
    lendingId: number;
    userId: number;
    bookId: number;
    dateOut: string;
    dateReturn: string;
    author: string;
    title: string;
}