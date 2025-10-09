-- PostgreSQL database dump corrected

SET statement_timeout = 0;

SET lock_timeout = 0;

SET idle_in_transaction_session_timeout = 0;

SET client_encoding = 'UTF8';

SET standard_conforming_strings = on;

SELECT pg_catalog.set_config ('search_path', '', false);

SET check_function_bodies = false;

SET xmloption = content;

SET client_min_messages = warning;

SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: advertisement_keywords; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.advertisement_keywords (
    advertisement_id integer NOT NULL,
    keyword_id integer NOT NULL
);

ALTER TABLE public.advertisement_keywords OWNER TO admin;

--
-- Name: advertisements; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.advertisements (
    id integer NOT NULL,
    name character varying(255),
    description text,
    views integer,
    img_path character varying(255),
    is_active boolean,
    companies_id integer
);

ALTER TABLE public.advertisements OWNER TO admin;

--
-- Name: advertisements_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.advertisements_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.advertisements_id_seq OWNER TO admin;

ALTER SEQUENCE public.advertisements_id_seq OWNED BY public.advertisements.id;

--
-- Name: companies; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    name character varying(255),
    website character varying(255),
    contact character varying(255),
    address character varying(255),
    city character varying(255),
    user_id integer
);

ALTER TABLE public.companies OWNER TO admin;

--
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.companies_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.companies_id_seq OWNER TO admin;

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;

--
-- Name: history; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.history (
    id integer NOT NULL,
    is_recontacted boolean,
    is_emailed boolean,
    advertisement_id integer,
    user_id integer,
    last_update timestamp without time zone
);

ALTER TABLE public.history OWNER TO admin;

--
-- Name: history_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.history_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.history_id_seq OWNER TO admin;

ALTER SEQUENCE public.history_id_seq OWNED BY public.history.id;

--
-- Name: key_words; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.key_words (
    id integer NOT NULL,
    word character varying(255),
    category character varying(255)
);

ALTER TABLE public.key_words OWNER TO admin;

--
-- Name: key_words_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.key_words_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.key_words_id_seq OWNER TO admin;

ALTER SEQUENCE public.key_words_id_seq OWNED BY public.key_words.id;

--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    tel character varying(20),
    role character varying(50),
    got_license boolean,
    password character varying(255),
    profile_desc text,
    address character varying(255),
    profile_picture_path character varying(255),
    cv_path character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.users OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq AS integer START
WITH
    1 INCREMENT BY 1 NO MINVALUE NO MAXVALUE CACHE 1;

ALTER SEQUENCE public.users_id_seq OWNER TO admin;

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;

--
-- Name: advertisements id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.advertisements
ALTER COLUMN id
SET DEFAULT nextval(
    'public.advertisements_id_seq'::regclass
);

--
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.companies
ALTER COLUMN id
SET DEFAULT nextval(
    'public.companies_id_seq'::regclass
);

--
-- Name: history id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.history
ALTER COLUMN id
SET DEFAULT nextval(
    'public.history_id_seq'::regclass
);

--
-- Name: key_words id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.key_words
ALTER COLUMN id
SET DEFAULT nextval(
    'public.key_words_id_seq'::regclass
);

--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
ALTER COLUMN id
SET DEFAULT nextval(
    'public.users_id_seq'::regclass
);

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO
    public.users (
        id,
        first_name,
        last_name,
        email,
        tel,
        role,
        got_license,
        password,
        profile_desc,
        address,
        profile_picture_path,
        cv_path,
        created_at
    )
VALUES (
        1,
        'Jean',
        'Dupont',
        'jean.dupont@example.com',
        '0612345678',
        'candidat',
        true,
        'motdepasse123',
        'Développeur fullstack avec 5 ans d''expérience.',
        '123 Rue de Paris, Paris',
        '/images/jean_dupont.jpg',
        '/cvs/jean_dupont.pdf',
        '2025-10-09 15:18:03.49302+02'
    ),
    (
        2,
        'Marie',
        'Martin',
        'marie.martin@example.com',
        '0687654321',
        'candidat',
        false,
        'motdepasse456',
        'Développeuse frontend passionnée par React.',
        '456 Rue de Lyon, Lyon',
        '/images/marie_martin.jpg',
        '/cvs/marie_martin.pdf',
        '2025-10-09 15:18:03.49302+02'
    ),
    (
        3,
        'Pierre',
        'Bernard',
        'pierre.bernard@example.com',
        '0611223344',
        'recruteur',
        true,
        'motdepasse789',
        'Recruteur spécialisé en tech.',
        '789 Rue de Marseille, Marseille',
        '/images/pierre_bernard.jpg',
        NULL,
        '2025-10-09 15:18:03.49302+02'
    ),
    (
        4,
        'Sophie',
        'Durand',
        'sophie.durand@example.com',
        '0655667788',
        'candidat',
        true,
        'motdepasseabc',
        'Ingénieure DevOps certifiée AWS.',
        '321 Rue de Toulouse, Toulouse',
        '/images/sophie_durand.jpg',
        '/cvs/sophie_durand.pdf',
        '2025-10-09 15:18:03.49302+02'
    );

--
-- Data for Name: companies; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO
    public.companies (
        id,
        name,
        website,
        contact,
        address,
        city,
        user_id
    )
VALUES (
        1,
        'TechCorp',
        'https://techcorp.fr',
        'contact@techcorp.fr',
        '123 Avenue des Champs, Paris',
        'Paris',
        3
    ),
    (
        2,
        'WebSolutions',
        'https://websolutions.fr',
        'contact@websolutions.fr',
        '456 Rue de la République, Lyon',
        'Lyon',
        4
    ),
    (
        3,
        'DevInnov',
        'https://devinnov.fr',
        'contact@devinnov.fr',
        '789 Boulevard Saint-Germain, Paris',
        'Paris',
        3
    );

--
-- Data for Name: advertisements; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO
    public.advertisements (
        id,
        name,
        description,
        views,
        img_path,
        is_active,
        companies_id
    )
VALUES (
        1,
        'Développeur Fullstack',
        'Recherche développeur fullstack pour projet innovant.',
        150,
        '/images/annonce_fullstack.jpg',
        true,
        1
    ),
    (
        2,
        'Ingénieur DevOps',
        'Offre pour ingénieur DevOps expérimenté.',
        200,
        '/images/annonce_devops.jpg',
        true,
        2
    ),
    (
        3,
        'Stage Frontend',
        'Stage de 6 mois en développement frontend.',
        80,
        '/images/annonce_stage.jpg',
        true,
        3
    ),
    (
        4,
        'Alternance Backend',
        'Alternance en développement backend.',
        120,
        '/images/annonce_alternance.jpg',
        false,
        1
    );

--
-- Data for Name: key_words; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO
    public.key_words (id, word, category)
VALUES (1, 'JavaScript', 'Langage'),
    (2, 'Python', 'Langage'),
    (3, 'React', 'Framework'),
    (4, 'Node.js', 'Framework'),
    (5, 'Fullstack', 'Compétence'),
    (6, 'Backend', 'Compétence'),
    (7, 'Frontend', 'Compétence'),
    (8, 'DevOps', 'Compétence'),
    (9, 'SQL', 'Langage'),
    (10, 'TypeScript', 'Langage'),
    (11, 'Java', 'Langage'),
    (12, 'C++', 'Langage'),
    (13, 'AWS', 'Cloud'),
    (14, 'Docker', 'Outils'),
    (15, 'Kubernetes', 'Outils'),
    (16, 'Linux', 'Système');

--
-- Data for Name: advertisement_keywords; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO
    public.advertisement_keywords (advertisement_id, keyword_id)
VALUES (1, 1),
    (1, 3),
    (1, 5),
    (2, 7),
    (2, 12),
    (2, 13),
    (3, 3),
    (3, 6),
    (4, 2),
    (4, 6);

--
-- Data for Name: history; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO
    public.history (
        id,
        is_recontacted,
        is_emailed,
        advertisement_id,
        user_id,
        last_update
    )
VALUES (
        1,
        false,
        true,
        1,
        1,
        '2025-10-01 10:00:00'
    ),
    (
        2,
        true,
        true,
        2,
        2,
        '2025-10-02 11:00:00'
    ),
    (
        3,
        false,
        false,
        3,
        1,
        '2025-10-03 09:00:00'
    ),
    (
        4,
        true,
        false,
        4,
        4,
        '2025-10-04 14:00:00'
    );

--
-- Name: advertisements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval ( 'public.advertisements_id_seq', 4, true );

--
-- Name: companies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval ( 'public.companies_id_seq', 3, true );

--
-- Name: history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval ( 'public.history_id_seq', 4, true );

--
-- Name: key_words_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval ( 'public.key_words_id_seq', 16, true );

--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval ( 'public.users_id_seq', 4, true );

--
-- Name: advertisement_keywords advertisement_keywords_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.advertisement_keywords
ADD CONSTRAINT advertisement_keywords_pkey PRIMARY KEY (advertisement_id, keyword_id);

--
-- Name: advertisements advertisements_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.advertisements
ADD CONSTRAINT advertisements_pkey PRIMARY KEY (id);

--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.companies
ADD CONSTRAINT companies_pkey PRIMARY KEY (id);

--
-- Name: history history_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.history
ADD CONSTRAINT history_pkey PRIMARY KEY (id);

--
-- Name: key_words key_words_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.key_words
ADD CONSTRAINT key_words_pkey PRIMARY KEY (id);

--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
ADD CONSTRAINT users_pkey PRIMARY KEY (id);

--
-- Name: advertisement_keywords advertisement_keywords_advertisement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.advertisement_keywords
ADD CONSTRAINT advertisement_keywords_advertisement_id_fkey FOREIGN KEY (advertisement_id) REFERENCES public.advertisements (id);

--
-- Name: advertisement_keywords advertisement_keywords_keyword_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.advertisement_keywords
ADD CONSTRAINT advertisement_keywords_keyword_id_fkey FOREIGN KEY (keyword_id) REFERENCES public.key_words (id);

--
-- Name: advertisements advertisements_companies_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.advertisements
ADD CONSTRAINT advertisements_companies_id_fkey FOREIGN KEY (companies_id) REFERENCES public.companies (id);

--
-- Name: companies companies_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.companies
ADD CONSTRAINT companies_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (id);

--
-- Name: history history_advertisement_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.history
ADD CONSTRAINT history_advertisement_id_fkey FOREIGN KEY (advertisement_id) REFERENCES public.advertisements (id);

--
-- Name: history history_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.history
ADD CONSTRAINT history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users (id);

-- PostgreSQL database dump complete