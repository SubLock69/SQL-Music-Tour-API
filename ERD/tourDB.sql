-- This script was generated by a beta version of the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public."SequelizeMeta"
(
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name)
);

CREATE TABLE IF NOT EXISTS public.bands
(
    band_id integer NOT NULL DEFAULT nextval('bands_band_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default",
    genre text COLLATE pg_catalog."default",
    available_start_time time without time zone,
    available_end_time time without time zone,
    CONSTRAINT bands_pkey PRIMARY KEY (band_id)
);

CREATE TABLE IF NOT EXISTS public.events
(
    event_id integer NOT NULL DEFAULT nextval('events_event_id_seq'::regclass),
    name character varying COLLATE pg_catalog."default",
    date date,
    start_time time without time zone,
    end_time time without time zone,
    CONSTRAINT events_pkey PRIMARY KEY (event_id)
);

CREATE TABLE IF NOT EXISTS public.meet_greet
(
    band_id integer NOT NULL DEFAULT nextval('bands_band_id_seq'::regclass),
    event_id integer NOT NULL DEFAULT nextval('events_event_id_seq'::regclass),
    meet_greet_id integer NOT NULL,
    meet_start_time time without time zone NOT NULL,
    meet_end_time time without time zone NOT NULL,
    CONSTRAINT meet_greet_pkey PRIMARY KEY (meet_greet_id)
);

CREATE TABLE IF NOT EXISTS public.set_time
(
    band_id integer NOT NULL DEFAULT nextval('bands_band_id_seq'::regclass),
    event_id integer NOT NULL DEFAULT nextval('events_event_id_seq'::regclass),
    set_time_id integer NOT NULL,
    stage_id integer NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    CONSTRAINT set_time_pkey PRIMARY KEY (set_time_id)
);

CREATE TABLE IF NOT EXISTS public.stage_events
(
    stage_id integer NOT NULL DEFAULT nextval('stages_stage_id_seq'::regclass),
    event_id integer NOT NULL DEFAULT nextval('events_event_id_seq'::regclass),
    stage_events_id integer NOT NULL,
    CONSTRAINT stage_events_pkey PRIMARY KEY (stage_events_id)
);

CREATE TABLE IF NOT EXISTS public.stages
(
    stage_id integer NOT NULL DEFAULT nextval('stages_stage_id_seq'::regclass),
    stage_name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT stages_pkey PRIMARY KEY (stage_id)
);

ALTER TABLE IF EXISTS public.meet_greet
    ADD FOREIGN KEY (band_id)
    REFERENCES public.bands (band_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.meet_greet
    ADD FOREIGN KEY (event_id)
    REFERENCES public.events (event_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.set_time
    ADD FOREIGN KEY (band_id)
    REFERENCES public.bands (band_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.set_time
    ADD FOREIGN KEY (event_id)
    REFERENCES public.events (event_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.stage_events
    ADD FOREIGN KEY (stage_id)
    REFERENCES public.stages (stage_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.stage_events
    ADD FOREIGN KEY (event_id)
    REFERENCES public.events (event_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

END;