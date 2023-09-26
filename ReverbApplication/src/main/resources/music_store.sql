--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: cart_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

DROP DATABASE IF EXISTS music_store;
CREATE database music_store;

\c music_store;

CREATE SEQUENCE public.cart_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cart_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart (
    id bigint DEFAULT nextval('public.cart_seq'::regclass) NOT NULL,
    cart_id character varying(60),
    user_id character varying(60) NOT NULL,
    song_id character varying(60) NOT NULL
);


ALTER TABLE public.cart OWNER TO postgres;

--
-- Name: purchases_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.purchases_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.purchases_seq OWNER TO postgres;

--
-- Name: purchases; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.purchases (
    id bigint DEFAULT nextval('public.purchases_seq'::regclass) NOT NULL,
    purchase_id character varying(60),
    date_purchased date NOT NULL,
    acc_num character varying(60),
    card_type character varying(60),
    user_id character varying(60) NOT NULL,
    song_id character varying(60),
    title character varying(30),
    artist character varying(30),
    genre character varying(15),
    price numeric,
    imageurl character varying(200),
    mp3url character varying(500)
);


ALTER TABLE public.purchases OWNER TO postgres;

--
-- Name: songs_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.songs_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.songs_seq OWNER TO postgres;

--
-- Name: songs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.songs (
    id bigint DEFAULT nextval('public.songs_seq'::regclass) NOT NULL,
    song_id character varying(60),
    title character varying(30) NOT NULL,
    artist character varying(30) NOT NULL,
    genre character varying(15) NOT NULL,
    price numeric NOT NULL,
    imageurl character varying(200) NOT NULL,
    mp3url character varying(500) NOT NULL,
    deleted boolean
);


ALTER TABLE public.songs OWNER TO postgres;

--
-- Name: users_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_seq OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint DEFAULT nextval('public.users_seq'::regclass) NOT NULL,
    user_id character varying(60),
    username character varying(15) NOT NULL,
    password character varying(200) NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    email character varying(30) NOT NULL,
    phone character varying(20) NOT NULL,
    address character varying(50),
    role character varying(15)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart (id, cart_id, user_id, song_id) FROM stdin;
\.


--
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.purchases (id, purchase_id, date_purchased, acc_num, card_type, user_id, song_id, title, artist, genre, price, imageurl, mp3url) FROM stdin;
\.


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.songs (id, song_id, title, artist, genre, price, imageurl, mp3url, deleted) FROM stdin;
1	1	Marigold	Aimyon	J-music	250.00	https://i.scdn.co/image/ab67616d0000b2733bc8c5a65f225815fa3844e1	https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/%E3%81%82%E3%81%84%E3%81%BF%E3%82%87%E3%82%93%20-%20%E3%83%9E%E3%83%AA%E3%83%BC%E3%82%B4%E3%83%BC%E3%83%AB%E3%83%89%E3%80%90OFFICIAL%20MUSIC%20VIDEO%E3%80%91.mp3?alt=media&token=5f46c9dd-3fbd-449f-a899-6b8573cb9b67	f
2	2	Mean	Taylor Swift	Country	200.00	https://i.scdn.co/image/ab67616d0000b273e11a75a2f2ff39cec788a015	https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/Taylor%20Swift%20-%20Mean.mp3?alt=media&token=5c4b946e-8e63-4781-a06c-63a6dd713a08	f
3	3	Feel Special	Twice	K-pop	200.00	https://i.scdn.co/image/ab67616d0000b2735f390ece0daec72a5cbe422c	https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/TWICE%20Feel%20Special%20M_V.mp3?alt=media&token=a4768660-4b79-4943-8b8e-e1323c8b60fe	f
4	4	Shiny Star	Kyeongseo	K-pop	230.00	https://i.scdn.co/image/ab67616d0000b273d5ee449561462667a80f3e8d	https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/KyoungSeo%20(%EA%B2%BD%EC%84%9C)%20-%20Shiny%20Star%20(2020)%20(%EB%B0%A4%ED%95%98%EB%8A%98%EC%9D%98%20%EB%B3%84%EC%9D%84%202020)%20(Color%20Coded%20Lyrics%20Han_Rom_Eng_%EA%B0%80%EC%82%AC).mp4?alt=media&token=566514ec-8d1d-41aa-b19c-8a83095878cc	f
5	5	Crown	Tomorrow x Together	K-pop	180.00	https://i.scdn.co/image/ab67616d0000b273e8393ab783e8052c2e961a51	https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/TXT%20-%20Crown%20(Audio).mp3?alt=media&token=6a7275a2-d166-4221-a8a5-74f46140e5ff	f
6	6	Ashitamo	Shishamo	J-rock	200.00	https://i.scdn.co/image/ab67616d0000b273b20bfc144e47ac51cf7cb505	https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/SHISHAMO%E3%80%8C%E6%98%8E%E6%97%A5%E3%82%82%E3%80%8D.mp4?alt=media&token=193c5994-e081-4d95-96bd-5cc09e6ce565	f
7	7	Bad	Infinite	K-pop	150.00	https://i.scdn.co/image/ab67616d00001e02d121e7b3d735b76016399371	https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/%EC%9D%B8%ED%94%BC%EB%8B%88%ED%8A%B8(INFINITE)%20_Bad_%20Official%20MV(2).mp4?alt=media&token=4f0dcb74-9811-4544-888f-dca0680b7e6e	f
8	8	Days Gone By	Day6	K-music	150.00	https://i.scdn.co/image/ab67616d0000b273b6b72c511b7a9821db135130	https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/DAY6%20_days%20gone%20by(%ED%96%89%EB%B3%B5%ED%96%88%EB%8D%98%20%EB%82%A0%EB%93%A4%EC%9D%B4%EC%97%88%EB%8B%A4)_%20M_V(3).mp4?alt=media&token=4b9e75d4-5a3a-42c2-946d-0d169ee6d54d	f
9	9	Mascara	XG	J-pop	150.00	https://i.scdn.co/image/ab67616d0000b2734fa03e1f5c02abd60c4e3d7e	https://firebasestorage.googleapis.com/v0/b/my-project-ac135.appspot.com/o/XG%20-%20MASCARA%20(Official%20Music%20Video).mp3?alt=media&token=79faab98-80f6-4ce4-a9c5-b2d3f18cfab4	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, user_id, username, password, first_name, last_name, email, phone, address, role) FROM stdin;
1	1	admin01	$2a$10$6u//tRbpxdiYX0IiMd6ufeFXhCmTcEolfr8oI/LG0kVbqqVdho0lC	Admin	One	admin01@reverb.com	09123456789	Makati City	admin
2	2	admin02	$2a$10$1.hpUj0B1kWCr9O5OFJoDO5AReR8nLKnn.aoKM26SimXtM8UxGMsu	Admin	Two	admin02@reverb.com	09234567891	Quezon City	admin
\.


--
-- Name: cart_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_seq', 1, false);


--
-- Name: purchases_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.purchases_seq', 1, false);


--
-- Name: songs_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.songs_seq', 9, true);


--
-- Name: users_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_seq', 2, true);


--
-- Name: cart cart_cart_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_cart_id_key UNIQUE (cart_id);


--
-- Name: cart cart_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_pkey PRIMARY KEY (id);


--
-- Name: purchases purchases_acc_num_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_acc_num_key UNIQUE (acc_num);


--
-- Name: purchases purchases_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_pkey PRIMARY KEY (id);


--
-- Name: purchases purchases_purchase_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_purchase_id_key UNIQUE (purchase_id);


--
-- Name: songs songs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pkey PRIMARY KEY (id);


--
-- Name: songs songs_song_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_song_id_key UNIQUE (song_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_user_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_user_id_key UNIQUE (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: cart cart_song_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_song_id_fkey FOREIGN KEY (song_id) REFERENCES public.songs(song_id);


--
-- Name: cart cart_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart
    ADD CONSTRAINT cart_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: purchases purchases_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

