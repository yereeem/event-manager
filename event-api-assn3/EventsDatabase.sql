CREATE TABLE IF NOT EXISTS `events` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `startdate` varchar(255) NOT NULL,
  `enddate`  varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `events` (`id`, `name`, `description`, `startdate`, `enddate`) 
VALUES (NULL, 'April Graduation', 'Graduation is a time to acknowledge and celebrate the success of our students in front of the most important people of all - their whanau, family and friends.',
'2024-04-16 08:30', '2024-04-16 11:30');

INSERT INTO `events` (`id`, `name`, `description`, `startdate`, `enddate`) 
VALUES (NULL, 'Health and Sports Careers Expo', 'Connect with employers at the Health and Sports Careers Expo and find out more about internships, graduate roles and other career opportunities!',
'2024-05-15 09:00', '2024-05-15 15:00');

INSERT INTO `events` (`id`, `name`, `description`, `startdate`, `enddate`)
VALUES (NULL, 'Open Day - Hamilton', 'Open Days are the perfect opportunity to see what the University of Waikato has to offer you.',
'2024-05-24 08:00', '2024-05-24 17:00');

INSERT INTO `events` (`id`, `name`, `description`, `startdate`, `enddate`)
VALUES (NULL, 'Latin American Film Festival', 'In its 22nd year the Latin America and Spain Film Festival (LASFF) is a cultural event that aims to bring together communities through the big screen.',
'2024-09-01 10:00', '2024-10-30 10:00');

INSERT INTO `events` (`id`, `name`, `description`, `startdate`, `enddate`)
VALUES (NULL, '2024 Blues Awards', 'The Blues Awards are one of the proudest traditions, recognising the highest sporting and artistic achievements.',
'2024-10-03 18:00', '2024-10-03 23:00');