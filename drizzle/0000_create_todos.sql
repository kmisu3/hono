CREATE TABLE `todos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(100) NOT NULL,
	`completed` boolean NOT NULL DEFAULT false,
	CONSTRAINT `todos_id` PRIMARY KEY(`id`)
);
