CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(255) NOT NULL,
  `date` DATE NOT NULL,
  `author` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `edit` varchar(255) NOT NULL,
  `lang` varchar(255) NOT NULL,
  `pages` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `copies` varchar(255) NOT NULL,
  `stock` int NOT NULL,
  `available` int NOT NULL
);
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(30) NOT NULL,
  `last_name_p` varchar(30) NOT NULL,
  `last_name_m` varchar(30) NOT NULL,
  `address` varchar(250) DEFAULT NULL,
  `phone` varchar(25) DEFAULT NULL,
  `sanctions` int DEFAULT '0',
  `sanc_money` int NOT NULL DEFAULT '0',
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL
);
CREATE TABLE `lendings` (
  `id` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `date_out` DATE NOT NULL,
  `date_return` DATE,
  constraint fk_lendings_users foreign key(user_id)
  references users(id),
  constraint fk_lendings_books foreign key(book_id)
  references books(id)
);