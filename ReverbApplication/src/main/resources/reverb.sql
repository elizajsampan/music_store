DROP DATABASE IF EXISTS music_store;
CREATE database music_store;

\c music_store;

CREATE SEQUENCE users_seq;
CREATE SEQUENCE songs_seq;
CREATE SEQUENCE cart_seq;
CREATE SEQUENCE purchases_seq;

DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id bigint primary key DEFAULT nextVal('users_seq'),
	user_id character varying(60) unique,
    username character varying(15) NOT NULL unique,
    password character varying(200) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(30) NOT NULL unique,
    phone character varying(20) NOT NULL,
    address character varying(50),
    role character varying(15)
);

DROP TABLE IF EXISTS songs;
CREATE TABLE songs (
	id bigint primary key DEFAULT nextVal('songs_seq'),
	song_id character varying(60) unique,
    title character varying(30) NOT NULL,
    artist character varying(30) NOT NULL,
    genre character varying(15) NOT NULL,
    price numeric NOT NULL,
    imageUrl character varying(200) NOT NULL,
    mp3Url character varying(500) NOT NULL,
    deleted boolean
);

DROP TABLE IF EXISTS cart;
CREATE TABLE cart (
	id bigint primary key DEFAULT nextVal('cart_seq'),
	cart_id character varying(60) unique,
    user_id character varying(60) references users (user_id) NOT NULL,
    song_id character varying(60) references songs (song_id) NOT NULL
);

DROP TABLE IF EXISTS purchases;
CREATE TABLE purchases (
	id bigint primary key DEFAULT nextVal('purchases_seq'),
	purchase_id character varying(60) unique,
	date_purchased date NOT NULL,
	acc_num character varying(60) unique,
	card_type character varying(60),
    user_id character varying(60) references users (user_id) NOT NULL,
    song_id character varying(60),
    title character varying(30),
    artist character varying(30),
    genre character varying(15),
    price numeric,
    imageUrl character varying(200),
    mp3Url character varying(500)
);

INSERT INTO songs VALUES (nextval('songs_seq'), '1', 'Marigold', 'Aimyon', 'J-music', 250.00, 'https://i.scdn.co/image/ab67616d0000b2733bc8c5a65f225815fa3844e1', 'https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/%E3%81%82%E3%81%84%E3%81%BF%E3%82%87%E3%82%93%20-%20%E3%83%9E%E3%83%AA%E3%83%BC%E3%82%B4%E3%83%BC%E3%83%AB%E3%83%89%E3%80%90OFFICIAL%20MUSIC%20VIDEO%E3%80%91.mp3?alt=media&token=5f46c9dd-3fbd-449f-a899-6b8573cb9b67', 'f');
INSERT INTO songs VALUES (nextval('songs_seq'), '2', 'Mean', 'Taylor Swift', 'Country', 200.00, 'https://i.scdn.co/image/ab67616d0000b273e11a75a2f2ff39cec788a015', 'https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/Taylor%20Swift%20-%20Mean.mp3?alt=media&token=5c4b946e-8e63-4781-a06c-63a6dd713a08', 'f');
INSERT INTO songs VALUES (nextval('songs_seq'), '3', 'Feel Special', 'Twice', 'K-pop', 200.00, 'https://i.scdn.co/image/ab67616d0000b2735f390ece0daec72a5cbe422c', 'https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/TWICE%20Feel%20Special%20M_V.mp3?alt=media&token=a4768660-4b79-4943-8b8e-e1323c8b60fe', 'f');
INSERT INTO songs VALUES (nextval('songs_seq'), '4', 'Shiny Star', 'Kyeongseo', 'K-pop', 230.00, 'https://i.scdn.co/image/ab67616d0000b273d5ee449561462667a80f3e8d', 'https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/KyoungSeo%20(%EA%B2%BD%EC%84%9C)%20-%20Shiny%20Star%20(2020)%20(%EB%B0%A4%ED%95%98%EB%8A%98%EC%9D%98%20%EB%B3%84%EC%9D%84%202020)%20(Color%20Coded%20Lyrics%20Han_Rom_Eng_%EA%B0%80%EC%82%AC).mp4?alt=media&token=566514ec-8d1d-41aa-b19c-8a83095878cc', 'f');
INSERT INTO songs VALUES (nextval('songs_seq'), '5', 'Crown', 'Tomorrow x Together', 'K-pop', 180.00, 'https://i.scdn.co/image/ab67616d0000b273e8393ab783e8052c2e961a51', 'https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/TXT%20-%20Crown%20(Audio).mp3?alt=media&token=6a7275a2-d166-4221-a8a5-74f46140e5ff', 'f');
INSERT INTO songs VALUES (nextval('songs_seq'), '6', 'Ashitamo', 'Shishamo', 'J-rock', 200.00, 'https://i.scdn.co/image/ab67616d0000b273b20bfc144e47ac51cf7cb505', 'https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/SHISHAMO%E3%80%8C%E6%98%8E%E6%97%A5%E3%82%82%E3%80%8D.mp4?alt=media&token=193c5994-e081-4d95-96bd-5cc09e6ce565', 'f');
INSERT INTO songs VALUES (nextval('songs_seq'), '7', 'Bad', 'Infinite', 'K-pop', 150.00, 'https://i.scdn.co/image/ab67616d00001e02d121e7b3d735b76016399371', 'https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/%EC%9D%B8%ED%94%BC%EB%8B%88%ED%8A%B8(INFINITE)%20_Bad_%20Official%20MV(2).mp4?alt=media&token=4f0dcb74-9811-4544-888f-dca0680b7e6e', 'f');
INSERT INTO songs VALUES (nextval('songs_seq'), '8', 'Days Gone By', 'Day6', 'K-music', 150.00, 'https://i.scdn.co/image/ab67616d0000b273b6b72c511b7a9821db135130', 'https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/DAY6%20_days%20gone%20by(%ED%96%89%EB%B3%B5%ED%96%88%EB%8D%98%20%EB%82%A0%EB%93%A4%EC%9D%B4%EC%97%88%EB%8B%A4)_%20M_V(3).mp4?alt=media&token=4b9e75d4-5a3a-42c2-946d-0d169ee6d54d', 'f');
INSERT INTO songs VALUES (nextval('songs_seq'), '9', 'Mascara', 'XG', 'J-pop', 150.00, 'https://i.scdn.co/image/ab67616d0000b2734fa03e1f5c02abd60c4e3d7e', 'https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/XG%20-%20MASCARA%20(Official%20Music%20Video).mp3?alt=media&token=79faab98-80f6-4ce4-a9c5-b2d3f18cfab4', 'f');