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

INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Harry Potter and the Chamber of Secrets', 'J. K. Rowling', 'The book follows Harry Potter and his second year at Hogwarts School of Witchcraft and Wizardry.', 'Fantasy', '1998', 'https://images-na.ssl-images-amazon.com/images/I/91HHqVTAJQL.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('The Hobbit', 'J. R. R. Tolkien', 'The hobbit tells a fantastic story of adventure, danger, friendship, and courage.', 'Fantasy', '1937', 'https://images-na.ssl-images-amazon.com/images/I/51uLvJlKpNL._SX321_BO1,204,203,200_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Women', 'Charles Bukowski', 'Women is centered on Henry Chinaski - the semi-autobiographical character of Bukowski and his later life, as a celebrated poet and writer, not as a dead-end lowlife.', 'Autobiographical novel', '1978', 'https://images-na.ssl-images-amazon.com/images/I/51HNHKPpPgL._SX326_BO1,204,203,200_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('The Wolf of Wall Street', 'Jordan Belfort', 'By day he made thousands of dollars a minute. By night he spent it as fast as he could. From the binge that sank a 170-foot motor yacht and ran up a $700,000 hotel tab, to the wife and kids waiting at home and the fast-talking, hard-partying young stockbrokers who called him king.', 'Autobiography', '2007', 'https://upload.wikimedia.org/wikipedia/en/thumb/8/85/The_wolf_of_wall_street_-_bookcover.jpg/220px-The_wolf_of_wall_street_-_bookcover.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 'The Great Gatsby tells the story of Jay Gatz (Gatsby) who falls in love with Daisy before going off to war.', 'Tragedy', '1925', 'https://images-na.ssl-images-amazon.com/images/I/41iers+HLSL._SX326_BO1,204,203,200_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('To Kill a Mockingbird', 'Harper Lee', 'Set in the small Southern town of Maycomb, Alabama, during the Depression, To Kill a Mockingbird follows three years in the life of 8-year-old Scout Finch.', 'Southern Gothic', '1960', 'https://images-na.ssl-images-amazon.com/images/I/51N5qVjuKAL._SX309_BO1,204,203,200_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('The Silence of the Lambs', 'Thomas Harris', 'As part of the search for a serial murderer nicknames "Buffalo Bill", FBI trainee Clarice Starling is given an assignment to visit a man - Dr. Hannibal Lecter at a high-security facility.', 'Horror', '1988', 'https://images-na.ssl-images-amazon.com/images/I/51bteLQSJ8L._SX306_BO1,204,203,200_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('The Shining', 'Stephen King', 'Jack Torrance has a new job at the Overlook Hotel is the perfect chance for a fresh start. As the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister.', 'Horror', '1977', 'https://images-na.ssl-images-amazon.com/images/I/51jSPyJ8v2L._SX302_BO1,204,203,200_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Three Deuces Down', 'Keith Donnelly',  "Donald Youngblood is a rich, bored ex-Wall Street whiz kid that returns to his East Tennessee hometown and on a whim gets a Private Investigator 's license. Billy Two Feathers is a full-blooded Cherokee Indian, ex-convict and Don's best friend.", 'Mystery', '2014', 'https://images-na.ssl-images-amazon.com/images/I/71C0t-LO1YL.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Hollywood Park', 'Mikel Jollett', 'A Gen-X This Boy’s Life...Music and his fierce brilliance boost Jollett; a visceral urge to leave his background behind propels him to excel... In the end, Jollett shakes off the past to become the captain of his own soul.', 'Autobiography', '2020', 'https://images-na.ssl-images-amazon.com/images/I/41xtU0NfgML._SX327_BO1,204,203,200_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('After Life', 'Alice Marie Johnson', 'Foreword by Kim Kardashian WestThe true-life story of the woman whose life sentence for non-violent drug trafficking was commuted by President Donald Trump thanks to the efforts of Kim Kardashian West—an inspiring memoir of faith, hope, mercy, and gratitude.', 'Autobiography', '2019', 'https://images-na.ssl-images-amazon.com/images/I/71WP3mXAQfL.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Me', 'Elton John', 'Elton John reveals the truth about his extraordinary life, from his rollercoaster lifestyle as shown in the film Rocketman, to becoming a living legend.Christened Reginald Dwight, he was a shy boy with Buddy Holly glasses who grew up in the London suburb of Pinner and dreamed of becoming a pop star.', 'Autobiography', '2019', 'https://images-na.ssl-images-amazon.com/images/I/81Ot3GUSecL.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Written with Regret', 'Aly Martinez', 'Every little girl dreams of the fairytale. The one where the white knight rushes in to save her from the clutches of evil. They fall in love, have babies, and live happily ever after.', 'Tragedy', '2019', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1558469288l/45890020.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Magic Lessons', 'Alice Hoffman ', 'In an unforgettable novel that traces a centuries-old curse to its source, beloved author Alice Hoffman unveils the story of Maria Owens, accused of witchcraft in Salem, and matriarch of a line of the amazing Owens women and men featured in Practical Magic and The Rules of Magic.', 'Fantasy', '2019', 'https://images-na.ssl-images-amazon.com/images/I/91EMREHg1KL.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Black Sun', 'Rebecca Roanhorse', 'In the holy city of Tova, the winter solstice is usually a time for celebration and renewal, but this year it coincides with a solar eclipse, a rare celestial event proscribed by the Sun Priest as an unbalancing of the world.', 'Fantasy', '2019', 'https://simonandschusterpublishing.com/black-sun/images/77633-Black-Sun-Enamel-Pin-and-Backer-Card.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Fight Club', 'Chuck Palahniuk', "This classic satire book explores the different representations and expectations around American masculinity, and it's also just a really fun book to read if you love humor, action, and feel like venting about consumerism. ", 'Satire', '2005', 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTdQ2wicN556xbhcGEdyINsH_p2wNehnnwNQ&usqp=CAU');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Catch-22', 'Joseph Heller', 'Catch-22 follows Captain John Yossarian, an American bombardier during the second World War. He and his men are thrown into absurd situations while stationed on a Mediterranean island and the book chronicles their desperate attempts to stay alive. ', 'Satire', '1961', 'https://images-na.ssl-images-amazon.com/images/I/41krrWH5uKL._AC_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ("Gulliver's Travels", 'Jonathan Swift', "Gulliver's Travels is the original Goldie Locks. Lemuel Gulliver is a surgeon and sea captain who wants to travel to the world's uncharted territories and become famous. He encounters three islands, all of which have vastly different and tyrannical governments.", 'Satire', '1726', 'https://www.mydomaine.com/thmb/JoynF0oDYcZxpfPsO-9xRCLOrQY=/500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/9781402743399_p0_v1_s600x595-2c261b8c529644769914e65fd0595156.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('The Chronicles of Narnia', 'C.S. Lewis', 'Journeys to the end of the world, fantastic creatures, and epic battles between good and evil—what more could any reader ask for in one book? The book that has it all is The Lion, the Witch and the Wardrobe, written in 1949 by Clive Staples Lewis.', 'Fantasy', '1949', 'https://images-na.ssl-images-amazon.com/images/I/51K6iSgqUqL._SX329_BO1,204,203,200_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Eragon',  'Christopher Paolini', 'When Eragon finds a polished blue stone in the forest, he thinks it is the lucky discovery of a poor farm boy; perhaps it will buy his family meat for the winter. But when the stone brings a dragon hatchling, Eragon soon realizes he has stumbled upon a legacy nearly as old as the Empire itself.','Fantasy', '2005', 'https://images-na.ssl-images-amazon.com/images/I/91JrDpvTiML.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('The Black Prism', 'William Goldman', 'Guile is the Prism, the most powerful man in the world. He is high priest and emperor, a man whose power, wit, and charm are all that preserves a tenuous peace. Yet Prisms never last, and Guile knows exactly how long he has left to live.','Fantasy', '2005', 'https://wendyvancamp.files.wordpress.com/2016/02/the-princess-bride-book-cover-2.jpg?w=640');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Plain Bad Heroines', 'Emily M. Danforth', 'Our story begins in 1902, at The Brookhants School for Girls. Flo and Clara, two impressionable students, are obsessed with each other and with a daring young writer named Mary MacLane, the author of a scandalous bestselling memoir.' ,'Horror', '2020', 'https://images-na.ssl-images-amazon.com/images/I/512WVuEDCWL._SY445_QL70_ML2_.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Eventide', 'Sarah Goodman', 'What happens when the most beautiful girl in the world marries the handsomest prince of all time and he turns out to be...well...a lot less than the man of her dreams?','Mystery', '2020', 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1594620656l/49247298.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('Cold as Ice', 'Allison Brennan', 'Two years ago, FBI Agent Lucy Kincaid put psychopath Elise Hansen Hunt in juvenile detention for her role in an organized crime syndicate. Now eighteen, Elise has been released with a clean slate, and plans to take her revenge by making Lucy’s life hell.','Mystery', '2020', 'https://www.allisonbrennan.com/wp-content/uploads/2020/02/ColdasIce.jpg');
INSERT INTO `mydb`.`books` (`title`, `author`, `description`, `genre`, `year`, `imageUrl`) VALUES ('The Master and Margarita', 'Mikhail Bulgakov,', 'One hot spring, the devil arrives in Moscow, accompanied by a retinue that includes a beautiful naked witch and an immense talking black cat with a fondness for chess and vodka. The visitors quickly wreak havoc in a city that refuses to believe in either God or Satan.','Satire', '1996', 'https://images-na.ssl-images-amazon.com/images/I/41NSZENdbFL._SX322_BO1,204,203,200_.jpg');





INSERT INTO `mydb`.`users` ( `username`, `password`, `email`,`register_date`) VALUES ('Nikky', '12345', 'test@abv.bg', '2020-10-19');
INSERT INTO `mydb`.`users` ( `username`, `password`, `email`,`register_date`) VALUES ('Maria', '123456', 'test2@abv.bg', '2020-10-19');
INSERT INTO `mydb`.`users` ( `username`, `password`, `email`,`register_date`) VALUES ('Test', '1234567', 'test3@abv.bg', '2020-10-19');
INSERT INTO `mydb`.`users` ( `username`, `password`, `email`,`register_date`) VALUES ('Ivan', '12345678', 'test4@abv.bg', '2020-11-01');
  
INSERT INTO `mydb`.`reviews` ( `content`, `book_Id`, `user_Id`) VALUES ('The best book I have ever read!', '3', '1');
INSERT INTO `mydb`.`reviews` ( `content`, `book_Id`, `user_Id`) VALUES ('I like it!', '3', '2');

INSERT INTO `mydb`.`reviews_have_votes` ( `review_Id`, `vote_Id`, `user_Id`) VALUES ('1','1', '1');
INSERT INTO `mydb`.`reviews_have_votes` ( `review_Id`, `vote_Id`, `user_Id`) VALUES ('2','2', '2');


INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('1','3', '1');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('2','4', '1');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('3','5', '2');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('4','3', '1');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('5','4', '2');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('6','5', '1');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('7','4', '3');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('8','3', '1');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('9','4', '1');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('10','3', '1');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('11','2', '2');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('12','3', '1');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('13','5', '3');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('14','4', '1');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('15','4', '2');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('16','3', '1');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('17','5', '3');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('18','3', '1');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('19','4', '2');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('20','5', '1');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('21','5', '3');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('22','3', '1');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('23','5', '3');
INSERT INTO `mydb`.`books_has_book_ratings` ( `book_to_be_rated_Id`, `rating_Id`, `user_Id`) VALUES ('24','3', '1');



            