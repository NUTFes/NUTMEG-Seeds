SET check_function_bodies = false;
CREATE TABLE public.bureaus (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);
CREATE SEQUENCE public.bureaus_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.bureaus_id_seq OWNED BY public.bureaus.id;
CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    detail character varying
);
CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;
CREATE TABLE public.chapters (
    id bigint NOT NULL,
    title character varying,
    content text,
    homework text,
    curriculum_id integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    "order" integer
);
CREATE SEQUENCE public.chapters_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.chapters_id_seq OWNED BY public.chapters.id;
CREATE TABLE public.curriculum_skills (
    id bigint NOT NULL,
    curriculum_id integer,
    skill_id integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);
CREATE SEQUENCE public.curriculum_skills_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.curriculum_skills_id_seq OWNED BY public.curriculum_skills.id;
CREATE TABLE public.curriculums (
    id bigint NOT NULL,
    title character varying,
    skill_ids integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    graduation_assignment text
);
CREATE SEQUENCE public.curriculums_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.curriculums_id_seq OWNED BY public.curriculums.id;
CREATE TABLE public.departments (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);
CREATE SEQUENCE public.departments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;
CREATE TABLE public.grades (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);
CREATE SEQUENCE public.grades_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.grades_id_seq OWNED BY public.grades.id;
CREATE TABLE public.project_skills (
    id bigint NOT NULL,
    project_id integer,
    skill_id integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);
CREATE SEQUENCE public.project_skills_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.project_skills_id_seq OWNED BY public.project_skills.id;
CREATE TABLE public.project_users (
    id bigint NOT NULL,
    project_id integer,
    user_id integer,
    role_id integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);
CREATE SEQUENCE public.project_users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.project_users_id_seq OWNED BY public.project_users.id;
CREATE TABLE public.projects (
    id bigint NOT NULL,
    name character varying,
    detail character varying,
    icon_name character varying,
    github character varying,
    remark character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);
CREATE SEQUENCE public.projects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.projects_id_seq OWNED BY public.projects.id;
CREATE TABLE public.records (
    id bigint NOT NULL,
    title character varying,
    content text,
    homework text,
    user_id integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    chapter_id integer
);
CREATE SEQUENCE public.records_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.records_id_seq OWNED BY public.records.id;
CREATE TABLE public.roles (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);
CREATE SEQUENCE public.roles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;
CREATE TABLE public.skills (
    id bigint NOT NULL,
    name character varying,
    detail character varying,
    category_id integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    type_id integer
);
CREATE SEQUENCE public.skills_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.skills_id_seq OWNED BY public.skills.id;
CREATE TABLE public.teachers (
    id bigint NOT NULL,
    user_id integer,
    record_id integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);
CREATE SEQUENCE public.teachers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.teachers_id_seq OWNED BY public.teachers.id;
CREATE TABLE public.types (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);
CREATE SEQUENCE public.types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.types_id_seq OWNED BY public.types.id;
CREATE TABLE public.user_details (
    id bigint NOT NULL,
    user_id integer,
    grade_id integer,
    department_id integer,
    bureau_id integer,
    icon_name character varying,
    github character varying,
    slack character varying,
    biography character varying,
    pc_name character varying,
    pc_os character varying,
    pc_cpu character varying,
    pc_ram character varying,
    pc_storage character varying,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL,
    type_id integer
);
CREATE SEQUENCE public.user_details_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_details_id_seq OWNED BY public.user_details.id;
CREATE TABLE public.user_skills (
    id bigint NOT NULL,
    user_id integer,
    skill_id integer,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);
CREATE SEQUENCE public.user_skills_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.user_skills_id_seq OWNED BY public.user_skills.id;
CREATE TABLE public.users (
    id bigint NOT NULL,
    provider character varying DEFAULT 'email'::character varying NOT NULL,
    uid character varying DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    allow_password_change boolean DEFAULT false,
    remember_created_at timestamp without time zone,
    confirmation_token character varying,
    confirmed_at timestamp without time zone,
    confirmation_sent_at timestamp without time zone,
    unconfirmed_email character varying,
    name character varying,
    email character varying,
    tokens text,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);
CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
ALTER TABLE ONLY public.bureaus ALTER COLUMN id SET DEFAULT nextval('public.bureaus_id_seq'::regclass);
ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);
ALTER TABLE ONLY public.chapters ALTER COLUMN id SET DEFAULT nextval('public.chapters_id_seq'::regclass);
ALTER TABLE ONLY public.curriculum_skills ALTER COLUMN id SET DEFAULT nextval('public.curriculum_skills_id_seq'::regclass);
ALTER TABLE ONLY public.curriculums ALTER COLUMN id SET DEFAULT nextval('public.curriculums_id_seq'::regclass);
ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);
ALTER TABLE ONLY public.grades ALTER COLUMN id SET DEFAULT nextval('public.grades_id_seq'::regclass);
ALTER TABLE ONLY public.project_skills ALTER COLUMN id SET DEFAULT nextval('public.project_skills_id_seq'::regclass);
ALTER TABLE ONLY public.project_users ALTER COLUMN id SET DEFAULT nextval('public.project_users_id_seq'::regclass);
ALTER TABLE ONLY public.projects ALTER COLUMN id SET DEFAULT nextval('public.projects_id_seq'::regclass);
ALTER TABLE ONLY public.records ALTER COLUMN id SET DEFAULT nextval('public.records_id_seq'::regclass);
ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);
ALTER TABLE ONLY public.skills ALTER COLUMN id SET DEFAULT nextval('public.skills_id_seq'::regclass);
ALTER TABLE ONLY public.teachers ALTER COLUMN id SET DEFAULT nextval('public.teachers_id_seq'::regclass);
ALTER TABLE ONLY public.types ALTER COLUMN id SET DEFAULT nextval('public.types_id_seq'::regclass);
ALTER TABLE ONLY public.user_details ALTER COLUMN id SET DEFAULT nextval('public.user_details_id_seq'::regclass);
ALTER TABLE ONLY public.user_skills ALTER COLUMN id SET DEFAULT nextval('public.user_skills_id_seq'::regclass);
ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
ALTER TABLE ONLY public.bureaus
    ADD CONSTRAINT bureaus_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.chapters
    ADD CONSTRAINT chapters_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.curriculum_skills
    ADD CONSTRAINT curriculum_skills_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.curriculums
    ADD CONSTRAINT curriculums_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.project_skills
    ADD CONSTRAINT project_skills_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.project_users
    ADD CONSTRAINT project_users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.records
    ADD CONSTRAINT records_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.skills
    ADD CONSTRAINT skills_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.types
    ADD CONSTRAINT types_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_details
    ADD CONSTRAINT user_details_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT user_skills_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
CREATE UNIQUE INDEX index_users_on_confirmation_token ON public.users USING btree (confirmation_token);
CREATE UNIQUE INDEX index_users_on_email ON public.users USING btree (email);
CREATE UNIQUE INDEX index_users_on_reset_password_token ON public.users USING btree (reset_password_token);
CREATE UNIQUE INDEX index_users_on_uid_and_provider ON public.users USING btree (uid, provider);
