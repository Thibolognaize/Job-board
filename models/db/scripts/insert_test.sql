-- Insertion des données dans la table key_words
INSERT INTO
    key_words (word, category)
VALUES ('JavaScript', 'Programmation'),
    ('Python', 'Programmation'),
    ('Java', 'Programmation'),
    ('React', 'Framework'),
    ('Node.js', 'Framework'),
    ('Full-Stack', 'Compétence'),
    ('Frontend', 'Compétence'),
    ('Backend', 'Compétence'),
    ('SQL', 'Base de données'),
    (
        'PostgreSQL',
        'Base de données'
    ),
    ('Docker', 'DevOps'),
    ('AWS', 'Cloud'),
    ('Azure', 'Cloud'),
    ('Linux', 'Système'),
    ('Windows', 'Système'),
    ('Agile', 'Méthodologie'),
    ('Scrum', 'Méthodologie'),
    ('Git', 'Outils'),
    ('CI/CD', 'DevOps'),
    ('TypeScript', 'Programmation');

-- Insertion des données dans la table users
INSERT INTO
    users (
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
        cv_path
    )
VALUES (
        'Jean',
        'Dupont',
        'jean.dupont@example.com',
        '0366461985',
        'admin',
        TRUE,
        'BnbZ4An0mv',
        'Développeur Full-Stack avec 5 ans d''expérience.',
        '123 Rue de Paris',
        '/images/jean_dupont.jpg',
        '/cv/jean_dupont.pdf'
    ),
    (
        'Marie',
        'Martin',
        'marie.martin@example.com',
        '0254938663',
        'user',
        FALSE,
        'sF2d5nZWZL',
        'Développeuse Frontend passionnée par React.',
        '456 Rue de Lyon',
        '/images/marie_martin.jpg',
        '/cv/marie_martin.pdf'
    ),
    (
        'Pierre',
        'Bernard',
        'pierre.bernard@example.com',
        '0176592098',
        'user',
        TRUE,
        'QXlV7rkrDL',
        'Expert en bases de données.',
        '789 Rue de Marseille',
        '/images/pierre_bernard.jpg',
        '/cv/pierre_bernard.pdf'
    ),
    (
        'Sophie',
        'Durand',
        'sophie.durand@example.com',
        '0111477753',
        'user',
        FALSE,
        'Up57bbNcCc',
        'Chef de projet Agile certifiée.',
        '101 Rue de Bordeaux',
        '/images/sophie_durand.jpg',
        '/cv/sophie_durand.pdf'
    ),
    (
        'Luc',
        'Petit',
        'luc.petit@example.com',
        '0137269104',
        'user',
        TRUE,
        'M1RVmroADB',
        'DevOps et Cloud Specialist.',
        '112 Rue de Toulouse',
        '/images/luc_petit.jpg',
        '/cv/luc_petit.pdf'
    );

-- Insertion des données dans la table companies
INSERT INTO
    companies (
        name,
        website,
        contact,
        address,
        city,
        num_siret,
        user_id
    )
VALUES (
        'TechCorp',
        'https://techcorp.example.com',
        'contact@techcorp.example.com',
        '123 Rue de Paris',
        'Paris',
        '12345678901234',
        1
    ),
    (
        'WebSolutions',
        'https://websolutions.example.com',
        'contact@websolutions.example.com',
        '456 Rue de Lyon',
        'Lyon',
        '98765432109876',
        2
    ),
    (
        'DataSystems',
        'https://datasystems.example.com',
        'contact@datasystems.example.com',
        '789 Rue de Marseille',
        'Marseille',
        '45678912304567',
        3
    );

-- Insertion des données dans la table advertisements
INSERT INTO
    advertisements (
        title,
        description,
        views,
        img_path,
        companies_id
    )
VALUES (
        'Développeur Full-Stack',
        'Nous recherchons un développeur Full-Stack pour rejoindre notre équipe dynamique.',
        0,
        '/images/techcorp_ad1.jpg',
        1
    ),
    (
        'Expert React',
        'Recherche d''un expert React pour un projet innovant.',
        0,
        '/images/websolutions_ad1.jpg',
        2
    ),
    (
        'Administrateur Base de Données',
        'Poste d''administrateur de bases de données PostgreSQL.',
        0,
        '/images/datasystems_ad1.jpg',
        3
    ),
    (
        'Ingénieur DevOps',
        'Offre pour un ingénieur DevOps expérimenté.',
        0,
        '/images/techcorp_ad2.jpg',
        1
    );

-- Insertion des données dans la table advertisement_keywords
-- Insertion des données dans la table advertisement_keywords
INSERT INTO
    advertisement_keywords (advertisement_id, keyword_id)
VALUES (1, 1),
    (1, 5),
    (1, 6),
    (2, 4),
    (2, 1),
    (3, 9),
    (3, 10);

-- Insertion des données dans la table history
INSERT INTO
    history (
        is_recontacted,
        is_emailed,
        advertisement_id,
        user_id
    )
VALUES (TRUE, FALSE, 1, 2),
    (FALSE, TRUE, 2, 1),
    (TRUE, TRUE, 3, 3),
    (FALSE, FALSE, 4, 4);