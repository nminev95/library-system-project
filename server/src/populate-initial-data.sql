ALTER table books auto_increment = 1;
ALTER table users auto_increment = 1;
ALTER table roles auto_increment = 1;
ALTER table ban_status auto_increment = 1;
ALTER table reviews_votes auto_increment = 1;
ALTER table status auto_increment = 1;
ALTER table reviews auto_increment = 1;
ALTER table user_levels auto_increment = 1;
ALTER table book_ratings auto_increment = 1;

INSERT INTO `mydb`.`roles` (`type_of_user`) VALUES ('user');
INSERT INTO `mydb`.`roles` (`type_of_user`) VALUES ('admin');

INSERT INTO `mydb`.`user_levels` (`type`) VALUES ('Newbie');
INSERT INTO `mydb`.`user_levels` (`type`) VALUES ('Basic');
INSERT INTO `mydb`.`user_levels` (`type`) VALUES ('Member');
INSERT INTO `mydb`.`user_levels` (`type`) VALUES ('Regular');
INSERT INTO `mydb`.`user_levels` (`type`) VALUES ('Bookworm');

INSERT INTO `mydb`.`status` (`type`) VALUES ('Borrowed');
INSERT INTO `mydb`.`status` (`type`) VALUES ('Unlisted');
INSERT INTO `mydb`.`status` (`type`) VALUES ('Free');

INSERT INTO `mydb`.`reviews_votes` (`type_of_vote`) VALUES ('Like');
INSERT INTO `mydb`.`reviews_votes` (`type_of_vote`) VALUES ('Dislike');

INSERT INTO `mydb`.`book_ratings` (`rating_value`) VALUES ('1');
INSERT INTO `mydb`.`book_ratings` (`rating_value`) VALUES ('2');
INSERT INTO `mydb`.`book_ratings` (`rating_value`) VALUES ('3');
INSERT INTO `mydb`.`book_ratings` (`rating_value`) VALUES ('4');
INSERT INTO `mydb`.`book_ratings` (`rating_value`) VALUES ('5');

INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Harry Potter and the Chamber of Secrets', 'J. K. Rowling', 'The book follows Harry Potter and his second year at Hogwarts School of Witchcraft and Wizardry.', 'Fantasy', '1998', 'https://images-na.ssl-images-amazon.com/images/I/51uLvJlKpNL._SX321_BO1,204,203,200_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('The Hobbit', 'J. R. R. Tolkien', 'The hobbit tells a fantastic story of adventure, danger, friendship, and courage.', 'Fantasy', '1937', 'https://images-na.ssl-images-amazon.com/images/I/51uLvJlKpNL._SX321_BO1,204,203,200_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Women', 'Charles Bukowski', 'Women is centered on Henry Chinaski - the semi-autobiographical character of Bukowski and his later life, as a celebrated poet and writer, not as a dead-end lowlife.', 'Autobiographical novel', '1978', 'https://images-na.ssl-images-amazon.com/images/I/51HNHKPpPgL._SX326_BO1,204,203,200_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('The Wolf of Wall Street', 'Jordan Belfort', 'By day he made thousands of dollars a minute. By night he spent it as fast as he could. From the binge that sank a 170-foot motor yacht and ran up a $700,000 hotel tab, to the wife and kids waiting at home and the fast-talking, hard-partying young stockbrokers who called him king.', 'Autobiography', '2007', 'https://upload.wikimedia.org/wikipedia/en/thumb/8/85/The_wolf_of_wall_street_-_bookcover.jpg/220px-The_wolf_of_wall_street_-_bookcover.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 'The Great Gatsby tells the story of Jay Gatz (Gatsby) who falls in love with Daisy before going off to war.', 'Tragedy', '1925', 'https://images-na.ssl-images-amazon.com/images/I/41iers+HLSL._SX326_BO1,204,203,200_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('To Kill a Mockingbird', 'Harper Lee', 'Set in the small Southern town of Maycomb, Alabama, during the Depression, To Kill a Mockingbird follows three years in the life of 8-year-old Scout Finch.', 'Southern Gothic', '1960', 'https://images-na.ssl-images-amazon.com/images/I/51N5qVjuKAL._SX309_BO1,204,203,200_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('The Silence of the Lambs', 'Thomas Harris', 'As part of the search for a serial murderer nicknames "Buffalo Bill", FBI trainee Clarice Starling is given an assignment to visit a man - Dr. Hannibal Lecter at a high-security facility.', 'Horror', '1988', 'https://images-na.ssl-images-amazon.com/images/I/51bteLQSJ8L._SX306_BO1,204,203,200_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('The Shining', 'Stephen King', 'Jack Torrance has a new job at the Overlook Hotel is the perfect chance for a fresh start. As the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister.', 'Horror', '1977', 'https://images-na.ssl-images-amazon.com/images/I/51jSPyJ8v2L._SX302_BO1,204,203,200_.jpg');

