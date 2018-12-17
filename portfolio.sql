-- database name: portfolio

CREATE TABLE "tags" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(255) NOT NULL
);

CREATE TABLE "projects" (
    "id" SERIAL PRIMARY KEY,
    "name" varchar(255) NOT NULL,
    "description" varchar(2048),
    "thumbnail" varchar(2048), 
    "website" varchar(2048),
    "github" varchar(2048),
    "date_completed" date,
    "tag_id" INT REFERENCES "tags"
);

--- Inserts
INSERT INTO "public"."projects"("id","name","description","thumbnail","website","github","date_completed","tag_id")
VALUES
(13,E'Image Gallery',E'Image gallery that allows users to add captioned images and like other photos',E'https://i.imgur.com/il6IdPA.png',E'',E'https://github.com/J-Byron/weekend-4-gallery',E'2018-11-30',1),
(14,E'Feedback app',E'feedback form modeled after Prime\'s system',E'https://i.imgur.com/0wrpFow.png',E'',E'https://github.com/J-Byron/react-redux-feedback',E'2018-12-09',5),
(16,E'Todo list',E'This project is a full stack implementation of a todo list',E'https://i.imgur.com/3xWdRbA.png',E'',E'https://github.com/J-Byron/vega-todo-app-weekend3',E'2018-11-21',2);