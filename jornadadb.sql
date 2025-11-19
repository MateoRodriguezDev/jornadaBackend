

-- CREATE TABLE "public"."Jornadas" (
--     "id" int4 NOT NULL DEFAULT nextval('"Jornadas_id_seq"'::regclass),
--     "nameLocation" varchar(255),
--     "startingDate" timestamptz,
--     "finishingDate" timestamptz,
--     "dateStarted" timestamptz,
--     "dateFinished" timestamptz,
--     "state" varchar(255) DEFAULT 'Pendiente'::character varying,
--     "firstImgURL" varchar(255),
--     "lastImgURL" varchar(255),
--     "lat" numeric(10,7),
--     "long" numeric(10,7),
--     "deletedAt" timestamptz,
--     "userId" int4,
--     "createdAt" timestamptz NOT NULL,
--     "updatedAt" timestamptz NOT NULL,
--     CONSTRAINT "Jornadas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON UPDATE CASCADE,
--     PRIMARY KEY ("id")
-- );


-- CREATE TABLE "public"."Users" (
--     "id" int4 NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
--     "email" varchar(255),
--     "firstName" varchar(255),
--     "lastName" varchar(255),
--     "degree" varchar(255),
--     "password" varchar(255),
--     "role" varchar(255) DEFAULT 'client'::character varying,
--     "deletedAt" timestamptz,
--     "createdAt" timestamptz NOT NULL,
--     "updatedAt" timestamptz NOT NULL,
--     PRIMARY KEY ("id")
-- );

INSERT INTO "public"."Users" ("id", "email", "firstName", "lastName", "degree", "password", "role", "deletedAt", "createdAt", "updatedAt") VALUES
(1, 'super@super.com', NULL, NULL, NULL,
 '$2b$10$wkbybptEFezp4JWvoKchzekRKe5ooz5xdpGSQhmD0o6U3Shld4uMK',
 'superadmin', NULL, NOW(), NOW());

-------------------------------------------------------

-- Jornada vencida (2024)
INSERT INTO "public"."Jornadas"
("id", "nameLocation", "startingDate", "finishingDate", "dateStarted", "dateFinished", "state",
 "firstImgURL", "lastImgURL", "lat", "long", "deletedAt", "userId", "createdAt", "updatedAt")
VALUES
(1, 'Plaza Central',
 '2024-03-10 08:00:00+00',
 '2024-03-12 18:00:00+00',
 NULL, NULL, 'Pendiente',
 NULL, NULL,
 -34.6037220, -58.3815920,
 NULL, 1, NOW(), NOW());

-- Jornada disponible hoy (19/11/2025)
INSERT INTO "public"."Jornadas"
("id", "nameLocation", "startingDate", "finishingDate", "dateStarted", "dateFinished", "state",
 "firstImgURL", "lastImgURL", "lat", "long", "deletedAt", "userId", "createdAt", "updatedAt")
VALUES
(2, 'Parque del Sol',
 '2025-11-19 08:00:00+00',
 '2025-11-25 18:00:00+00',
 NULL, NULL, 'Pendiente',
 NULL, NULL,
 -34.9204950, -57.9535660,
 NULL, 1, NOW(), NOW());

-- Jornada futura (2026)
INSERT INTO "public"."Jornadas"
("id", "nameLocation", "startingDate", "finishingDate", "dateStarted", "dateFinished", "state",
 "firstImgURL", "lastImgURL", "lat", "long", "deletedAt", "userId", "createdAt", "updatedAt")
VALUES
(3, 'Costanera Norte',
 '2026-05-05 07:00:00+00',
 '2026-05-10 18:00:00+00',
 NULL, NULL, 'Pendiente',
 NULL, NULL,
 -39.0103040, -67.6200448,
 NULL, 1, NOW(), NOW());
