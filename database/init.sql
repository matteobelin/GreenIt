-- Adminer 4.8.1 PostgreSQL 13.20 (Debian 13.20-1.pgdg120+1) dump

DROP TABLE IF EXISTS "articles";
DROP SEQUENCE IF EXISTS articles_id_seq;
CREATE SEQUENCE articles_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."articles" (
    "id" integer DEFAULT nextval('articles_id_seq') NOT NULL,
    "nom" character varying(255) NOT NULL,
    "description" text NOT NULL,
    "img_url" character varying(255) NOT NULL,
    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "articles" ("id", "nom", "description", "img_url") VALUES
(18,	'Alpha Centauri',	'Alpha Centauri est un système stellaire triple qui inclut Proxima Centauri, l''étoile la plus proche de notre système solaire, à environ 4,37 années-lumière de la Terre.',	'Alpha_Centauri'),
(3,	'Terre',	'La Terre, troisième planète du système solaire, est principalement composée d''eau et de roches. Elle abrite une grande diversité de vies grâce à son atmosphère et à son climat varié, avec des océans, des montagnes, des déserts et des forêts.',	'Terre'),
(4,	'Mars',	'Mars, la quatrième planète du système solaire, est une planète rouge avec une atmosphère fine composée principalement de dioxyde de carbone. Elle possède des volcans géants et des canyons profonds.',	'Mars'),
(5,	'Vénus',	'Vénus, la deuxième planète du système solaire, possède une atmosphère épaisse de dioxyde de carbone et une température de surface extrêmement élevée. Elle est souvent appelée la sœur de la Terre.',	'Vénus'),
(6,	'Jupiter',	'Jupiter, la plus grande planète du système solaire, est une géante gazeuse avec des bandes de nuages distinctes et une grande tache rouge, une tempête géante. Elle possède également de nombreuses lunes.',	'Jupiter'),
(7,	'Saturne',	'Saturne, célèbre pour ses anneaux, est une géante gazeuse avec une atmosphère composée principalement d''hydrogène et d''hélium. Ses anneaux sont composés de glace et de roche.',	'Saturne'),
(8,	'Uranus',	'Uranus, une géante de glace, a un axe de rotation fortement incliné, ce qui fait qu''elle tourne presque sur son côté. Elle est composée principalement d''eau, d''ammoniac et de méthane.',	'Uranus'),
(9,	'Neptune',	'Neptune est la planète la plus éloignée du Soleil, une géante de glace avec des vents extrêmement rapides. Elle est principalement composée de gaz comme l''hydrogène et l''hélium, et de glaces comme l''eau et le méthane.',	'Neptune'),
(10,	'Mercure',	'Mercure est la planète la plus proche du Soleil. Sa surface est couverte de cratères et elle a une température extrêmement élevée le jour et très froide la nuit.',	'Mercure'),
(11,	'Pluton',	'Pluton, classée comme une planète naine, se situe dans la ceinture de Kuiper. Elle est principalement composée de glace et de roches et possède une atmosphère temporaire.',	'Pluton'),
(12,	'Haumea',	'Haumea est une planète naine située dans la ceinture de Kuiper. Elle possède une forme allongée en raison de sa rotation rapide et est composée principalement de glace.',	'Haumea'),
(13,	'Makemake',	'Makemake est une autre planète naine de la ceinture de Kuiper, découverte en 2005. Elle est composée principalement de glace et est plus grande que Haumea.',	'Makemake'),
(14,	'Eris',	'Eris est une planète naine située au-delà de Pluton, dans la région du disque épars. Elle est l''une des plus grandes planètes naines et est recouverte de glace.',	'Eris'),
(15,	'Cérès',	'Cérès, la plus grande planète naine du système solaire, est située dans la ceinture d''astéroïdes entre Mars et Jupiter. Elle est composée de glace et de roches.',	'Cérès'),
(16,	'Aldébaran',	'Aldébaran est une étoile géante rouge située dans la constellation du Taureau. C''est l''une des étoiles les plus brillantes visibles dans le ciel.',	'Aldébaran'),
(17,	'Sirius',	'Sirius est l''étoile la plus brillante du ciel nocturne, située dans la constellation du Grand Chien. Elle est en réalité un système binaire constitué de Sirius A et Sirius B.',	'Sirius'),
(19,	'Rigel',	'Rigel est une supergéante bleue située dans la constellation d''Orion. C''est l''une des étoiles les plus lumineuses du ciel.',	'Rigel'),
(20,	'Betelgeuse',	'Betelgeuse est une supergéante rouge située dans la constellation d''Orion. Elle est proche de la fin de sa vie et pourrait bientôt exploser en supernova.',	'Betelgeuse'),
(21,	'Vega',	'Vega est une étoile de type A située dans la constellation de la Lyre. Elle est l''une des étoiles les plus brillantes du ciel et était utilisée comme référence pour la luminosité des étoiles.',	'Vega'),
(22,	'Capella',	'Capella est un système binaire d''étoiles situé dans la constellation du Cocher. C''est l''une des étoiles les plus lumineuses du ciel.',	'Capella'),
(23,	'Arcturus',	'Arcturus est une géante rouge située dans la constellation du Bouvier. C''est l''étoile la plus brillante de cette constellation et l''une des plus proches de la Terre.',	'Arcturus'),
(24,	'Canopus',	'Canopus est une supergéante blanche située dans la constellation de la Carène. C''est la deuxième étoile la plus brillante du ciel nocturne.',	'Canopus'),
(25,	'Antarès',	'Antarès est une supergéante rouge située dans la constellation du Scorpion. Elle est l''une des étoiles les plus brillantes et les plus massives de notre galaxie.',	'Antarès'),
(27,	'Polaris',	'Polaris, l''étoile du Pôle Nord, est située dans la constellation de la Petite Ourse. Elle sert de référence pour déterminer la direction du nord.',	'Polaris'),
(28,	'Altair',	'Altair est une étoile située dans la constellation de l''Aigle. Elle est une étoile de type A et fait partie de l''aiguillon du Triangle d''été.',	'Altair'),
(29,	'Procyon',	'Procyon est une étoile située dans la constellation du Petit Chien. Elle est l''une des étoiles les plus brillantes du ciel et fait partie de l''aiguillon du Triangle d''hiver.',	'Procyon'),
(30,	'Spica',	'Spica est une étoile située dans la constellation de la Vierge. C''est l''étoile la plus brillante de cette constellation.',	'Spica'),
(31,	'Regulus',	'Regulus est une étoile située dans la constellation du Lion. Elle est la plus brillante de cette constellation et est en fait un système binaire.',	'Regulus'),
(26,	'Proxima Centauri',	'Proxima Centauri est l''étoile la plus proche du système solaire, située à environ 4,24 années-lumière. C''est une naine rouge.',	'Proxima_Centauri');

DROP TABLE IF EXISTS "users";
DROP SEQUENCE IF EXISTS users_id_seq;
CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."users" (
    "id" integer DEFAULT nextval('users_id_seq') NOT NULL,
    "mail" character varying(255) NOT NULL,
    "password" character varying(255) NOT NULL,
    "is_admin" boolean NOT NULL,
    CONSTRAINT "users_mail_key" UNIQUE ("mail"),
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
) WITH (oids = false);


-- 2025-03-17 14:44:08.671293+00
