-- Création des tables et séquences
CREATE TABLE public.advertisements (
    id integer NOT NULL,
    title character varying(255),
    description text,
    views integer,
    img_path character varying(255),
    is_active boolean DEFAULT true,
    last_update timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    companies_id integer
);

CREATE SEQUENCE public.advertisements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.advertisements_id_seq OWNED BY public.advertisements.id;
ALTER TABLE ONLY public.advertisements ALTER COLUMN id SET DEFAULT nextval('public.advertisements_id_seq'::regclass);

CREATE TABLE public.applications (
    id integer NOT NULL,
    user_id integer,
    advertisement_id integer NOT NULL,
    application_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    description text,
    is_answered boolean DEFAULT false,
    first_name character varying(255),
    last_name character varying(255),
    email character varying(255),
    tel character varying(20),
    cv_path character varying(255)
);

CREATE SEQUENCE public.applications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.applications_id_seq OWNED BY public.applications.id;
ALTER TABLE ONLY public.applications ALTER COLUMN id SET DEFAULT nextval('public.applications_id_seq'::regclass);

CREATE TABLE public.companies (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    website character varying(255),
    contact character varying(255),
    address character varying(255),
    city character varying(255),
    num_siret character varying(255) NOT NULL,
    user_id integer
);

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;
ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);

CREATE TABLE public.history (
    id integer NOT NULL,
    is_recontacted boolean,
    is_emailed boolean,
    advertisement_id integer,
    user_id integer,
    last_update timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE SEQUENCE public.history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.history_id_seq OWNED BY public.history.id;
ALTER TABLE ONLY public.history ALTER COLUMN id SET DEFAULT nextval('public.history_id_seq'::regclass);

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    tel character varying(20),
    role character varying(50) DEFAULT 'USER',
    is_admin boolean DEFAULT false NOT NULL,
    got_license boolean,
    password character varying(255) NOT NULL,
    profile_desc text,
    address character varying(255),
    profile_picture_path character varying(255),
    cv_path character varying(255),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    sex character varying(55)
);

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);

-- Insertion des données
INSERT INTO public.advertisements (id, title, description, views, img_path, is_active, last_update, companies_id) VALUES
(8, 'Développeur Full-Stack H/F', 'Rejoignez SEPTEO en tant que développeur Full-Stack ! Nous recherchons un profil passionné par JavaScript et les architectures modernes. CDI, télétravail partiel, Paris.', 42, '/uploads/ads/septeo_dev_fullstack.jpg', true, '2025-10-17 10:57:29.358011+02', 2),
(9, 'Stage : Intégration Web', 'Stage de 6 mois pour participer à la refonte de nos interfaces utilisateur. Maîtrise de HTML/CSS et JavaScript requise. Gratification + tickets restaurant.', 12, '/uploads/ads/septeo_stage_integration.jpg', true, '2025-10-17 10:57:29.358011+02', 3),
(10, 'Consultant Cloud AWS', 'Capgemini recrute un consultant Cloud certifié AWS pour accompagner nos clients dans leur transformation digitale. Poste basé à Paris ou Lyon.', 89, '/uploads/ads/capgemini_cloud_aws.jpg', true, '2025-10-17 10:57:29.358011+02', 3),
(11, 'Data Analyst', 'Offre d''alternance pour un(e) étudiant(e) en data science. Mission : analyse de données et visualisation. Rémunération attractive.', 35, '/uploads/ads/capgemini_alternance_data.jpg', true, '2025-10-17 10:57:29.358011+02', 3),
(12, 'Chef de Projet Digital', 'Nous cherchons un Chef de Projet expérimenté pour piloter nos projets digitaux. Maîtrise des méthodologies Agile indispensable.', 67, '/uploads/ads/capgemini_chef_projet.jpg', true, '2025-10-17 10:57:29.358011+02', 3),
(7, 'Technicien Réseau Électrique H/F', 'EDF recrute des techniciens réseau pour renforcer ses équipes en Île-de-France. Missions : maintenance, dépannage et modernisation des infrastructures électriques. CDI, permis B requis.', 156, '/uploads/ads/edf_technicien_reseau.jpg', false, '2025-10-17 10:57:29.358011+02', 1);

INSERT INTO public.companies (id, name, website, contact, address, city, num_siret, user_id) VALUES
(3, 'Capgemini', 'https://www.capgemini.com', 'contact@capgemini.com', '456 Avenue des Champs-Élysées', 'Paris', '34567890123456', 3),
(1, 'EDF', 'https://www.edf.fr/', 'contact@edf.fr', '123 rue d''edf', 'Paris', '552 081 317', 1),
(2, 'SEPTEO', 'https://www.septeo.fr', 'contact@septeo.fr', '123 Rue de Paris', NULL, '82435678900012', 2);

INSERT INTO public.users (id, first_name, last_name, email, tel, role, is_admin, got_license, password, profile_desc, address, profile_picture_path, cv_path, created_at, sex) VALUES
(10, 'Thibault', 'Feat', 'thibault.feat@epitech.eu', NULL, 'user', true, true, '$2b$10$oWC4t9rTzDvqg9HYudmiNe6hOK7x91jtjc7PuPyN.wDzqxmAMiJqS', NULL, NULL, NULL, NULL, '2025-10-16 14:12:54.372241+02', NULL),
(6, 'Marie', 'Martin', 'marie.martin@example.com', '0254938663', 'user', false, NULL, 'sF2d5nZWZL', 'Développeuse Frontend passionnée par React.', '456 Rue de Lyon', '/images/marie_martin.jpg', '/cv/marie_martin.pdf', '2025-10-16 14:11:03.458955+02', NULL),
(1, 'Jean', 'Christophe', 'jc@edf.fr', '0923434224', 'company', false, true, '$2b$10$oWC4t9rTzDvqg9HYudmiNe6hOK7x91jtjc7PuPyN.wDzqxmAMiJqS', 'RH', '457 Rue de Lyon', NULL, NULL, '2025-10-17 09:58:31.011334+02', 'male'),
(2, 'Jean', 'Dupont', 'jean.dupont@septeo.fr', '+33123456789', 'manager', true, true, '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrXbOvrZz8N5Z8z7vY6JQz5Q7Z8Y9K', 'Responsable technique chez SEPTEO, spécialisé en développement web.', '123 Rue de Paris, 75000 Paris', '/uploads/profiles/jean_dupont.jpg', '/uploads/cvs/jean_dupont_cv.pdf', '2025-10-17 10:14:27.98289+02', NULL),
(3, 'Marie', 'Martin', 'marie.martin@capgemini.com', '+33654321098', 'consultant', false, true, '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrXbOvrZz8N5Z8z7vY6JQz5Q7Z8Y9K', 'Consultante senior en transformation digitale chez Capgemini.', '456 Avenue des Champs-Élysées, 75008 Paris', '/uploads/profiles/marie_martin.jpg', '/uploads/cvs/marie_martin_cv.pdf', '2025-10-17 10:14:27.98289+02', NULL),
(11, 'Thibault', 'fq,egkl', 'caca@prout.com', NULL, 'admin', false, NULL, '$2b$10$t4VysvVA7P84hNK9bEwPp.R2jtkJ20i8FPxClex13o6apvK9fDz/O', NULL, NULL, NULL, NULL, '2025-10-17 17:26:21.009677+02', NULL),
(7, 'Pierre', 'Bernard', 'pierre.bernard@example.com', '0176592098', 'user', false, NULL, 'QXlV7rkrDL', 'Expert en bases de données. (ou pas)', '789 Rue de Marseille', '/images/pierre_bernard.jpg', '/cv/pierre_bernard.pdf', '2025-10-16 14:11:03.458955+02', NULL);

-- Définir les contraintes de clé primaire et étrangère
ALTER TABLE ONLY public.advertisements
    ADD CONSTRAINT advertisements_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.history
    ADD CONSTRAINT history_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.advertisements
    ADD CONSTRAINT advertisements_companies_id_fkey FOREIGN KEY (companies_id) REFERENCES public.companies(id);

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_advertisement_id_fkey FOREIGN KEY (advertisement_id) REFERENCES public.advertisements(id);

ALTER TABLE ONLY public.applications
    ADD CONSTRAINT applications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

ALTER TABLE ONLY public.history
    ADD CONSTRAINT history_advertisement_id_fkey FOREIGN KEY (advertisement_id) REFERENCES public.advertisements(id);

ALTER TABLE ONLY public.history
    ADD CONSTRAINT history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);

-- Définir les valeurs des séquences
SELECT pg_catalog.setval('public.advertisements_id_seq', 12, true);
SELECT pg_catalog.setval('public.applications_id_seq', 1, false);
SELECT pg_catalog.setval('public.companies_id_seq', 3, true);
SELECT pg_catalog.setval('public.history_id_seq', 1, false);
SELECT pg_catalog.setval('public.users_id_seq', 11, true);
