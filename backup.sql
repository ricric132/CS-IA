--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

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
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


--
-- Name: ProjectRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ProjectRole" AS ENUM (
    'OWNER',
    'ADMIN',
    'MEMBER',
    'PENDING'
);


ALTER TYPE public."ProjectRole" OWNER TO postgres;

--
-- Name: Status; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Status" AS ENUM (
    'INCOMPLETE',
    'IN_PROCESS',
    'COMPLETE'
);


ALTER TYPE public."Status" OWNER TO postgres;

--
-- Name: TransactionAction; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TransactionAction" AS ENUM (
    'CREATE',
    'COMPLETE',
    'STARTED',
    'REMOVE'
);


ALTER TYPE public."TransactionAction" OWNER TO postgres;

--
-- Name: UserRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserRole" AS ENUM (
    'ADMIN',
    'USER'
);


ALTER TYPE public."UserRole" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Note; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Note" (
    id text NOT NULL,
    content text NOT NULL,
    projectid text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public."Note" OWNER TO postgres;

--
-- Name: PendingUsers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PendingUsers" (
    id text NOT NULL,
    username text,
    email text,
    password text,
    role public."UserRole"
);


ALTER TABLE public."PendingUsers" OWNER TO postgres;

--
-- Name: Project; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Project" (
    id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    "inviteCode" text NOT NULL
);


ALTER TABLE public."Project" OWNER TO postgres;

--
-- Name: ProjectStatusInstance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProjectStatusInstance" (
    id text NOT NULL,
    "fileName" text NOT NULL,
    projectid text NOT NULL,
    date timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."ProjectStatusInstance" OWNER TO postgres;

--
-- Name: Subtask; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Subtask" (
    id text NOT NULL,
    description text NOT NULL,
    taskid text NOT NULL,
    status public."Status" NOT NULL,
    name text NOT NULL,
    deadline timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Subtask" OWNER TO postgres;

--
-- Name: SubtaskStatusInstance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SubtaskStatusInstance" (
    id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    taskid text NOT NULL,
    status public."Status" NOT NULL,
    deadline timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."SubtaskStatusInstance" OWNER TO postgres;

--
-- Name: Task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Task" (
    id text NOT NULL,
    projectid text NOT NULL,
    description text NOT NULL,
    name text NOT NULL,
    status public."Status" NOT NULL,
    deadline timestamp(3) without time zone NOT NULL,
    userid text
);


ALTER TABLE public."Task" OWNER TO postgres;

--
-- Name: TaskStatusInstance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."TaskStatusInstance" (
    id text NOT NULL,
    instanceid text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    status public."Status" NOT NULL,
    deadline timestamp(3) without time zone NOT NULL,
    userid text,
    originalid text NOT NULL
);


ALTER TABLE public."TaskStatusInstance" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    image text,
    password text,
    username text,
    email text,
    role public."UserRole"
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: UserProject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserProject" (
    id text NOT NULL,
    userid text NOT NULL,
    projectid text NOT NULL,
    role public."ProjectRole" NOT NULL,
    "joinDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."UserProject" OWNER TO postgres;

--
-- Name: VerificationToken; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VerificationToken" (
    id text NOT NULL,
    email text NOT NULL,
    token text NOT NULL,
    expires timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."VerificationToken" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Note; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Note" (id, content, projectid, name) FROM stdin;
cm61vmvuk00012r0p8y03mwhu		cm2hapf9u002369k8mqe7ivpc	fnsndfwjfewfewfew
cm3tg76rm000b5qva02y0gb4r	[{"id":"db8ab65f-ce91-496b-952f-dfc59b13f103","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"New Notefsdfdsfdsf","styles":{}}],"children":[]},{"id":"19c260e6-24a0-49cb-873d-ea319d1a8987","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"sdfdsfdsfds","styles":{}}],"children":[]},{"id":"252e398c-2f15-4ad4-bc7e-2d09fb5a476b","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"fsdfdfdsfd","styles":{}}],"children":[]},{"id":"3bfde5fc-26ad-499c-a3e1-e8a750bb432e","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"fdsfsdfsd","styles":{}}],"children":[]},{"id":"8b41a2ac-1d97-43fa-a308-5857ba66a185","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}]	cm2hapf9u002369k8mqe7ivpc	fewfwefewf
\.


--
-- Data for Name: PendingUsers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PendingUsers" (id, username, email, password, role) FROM stdin;
\.


--
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Project" (id, name, description, "inviteCode") FROM stdin;
cm2hapf9u002369k8mqe7ivpc	test3	This is another project	62SI4P
cm2haqdx5002969k8reo02thq	test4	another test project	GCOO1W
cm2has09p002c69k8d82aklrm	test5	fifth test	GI48GD
cm2hasomf002f69k8dliowmhl	test6	sixth test	M6R4D9
cm3twbyvb000dmxr3gg22byxl	test7	the seventh test\n	RPCYIH
cm3twcuv2000gmxr3zwl9mtqc	Test 8	the eighth test 	84AB5Y
cm3twe0ql000lmxr3z70f92yd	test 9	the ninth test	Q6ALKT
cm3tww1ex001gmxr3v3z442fc	newest project	fewfqwefqewfqwefqwe	WSTTKY
cm63928bd0000uyhzrq1wj57g	test 8	rqwrewqrewqfq	9O0C3Y
\.


--
-- Data for Name: ProjectStatusInstance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProjectStatusInstance" (id, "fileName", projectid, date) FROM stdin;
cm3tgsbvv000h5qvahdeocsk2	Report - 23/10/2024-9:1:11	cm2hapf9u002369k8mqe7ivpc	2024-11-23 01:01:11.849
cm3tgsrvp000p5qvadug3bynd	Report - 23/10/2024-9:1:32	cm2hapf9u002369k8mqe7ivpc	2024-11-23 01:01:32.579
cm3tsil7d0003mxr32fqfsd7d	Report - 23/10/2024-14:29:32	cm2hapf9u002369k8mqe7ivpc	2024-11-23 06:29:32.76
cm3twt5ky0013mxr3fq8ux3s9	Report - 23/10/2024-16:29:44	cm2hapf9u002369k8mqe7ivpc	2024-11-23 08:29:44.193
cm5rmjotq000314piagjfoi8d	Report - 11/0/2025-11:26:18	cm2hapf9u002369k8mqe7ivpc	2025-01-11 03:26:18.733
\.


--
-- Data for Name: Subtask; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Subtask" (id, description, taskid, status, name, deadline) FROM stdin;
cm3toy2ic0001mxr31eo9gtfl	fefwqfqwefqfq	cm3tgsk2a000j5qval3wu4ayo	INCOMPLETE	Subtask1	2024-11-26 16:00:00
cm3twret80011mxr378usg3mo	ewqfweewqfew	cm3twqxrv000zmxr3girbffn3	INCOMPLETE	new	2024-11-27 16:00:00
cm3tyebzf001kmxr3k6gj3qme	This is a description	cm3tgthbu000t5qvabxownn38	COMPLETE	new subtask	2024-11-28 16:00:00
\.


--
-- Data for Name: SubtaskStatusInstance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SubtaskStatusInstance" (id, name, description, taskid, status, deadline) FROM stdin;
cm3tsil7l0007mxr3m6dqkyo8	Subtask1	fefwqfqwefqfq	cm3tsil7i0005mxr3wj2nc7kt	INCOMPLETE	2024-11-28 16:00:00
cm3twt5l40017mxr3bnv0sr49	Subtask1	fefwqfqwefqfq	cm3twt5l20015mxr3ccgxo9t2	INCOMPLETE	2024-11-28 16:00:00
cm3twt5l8001bmxr3f4dlk4q9	new	ewqfweewqfew	cm3twt5l60019mxr3gprtqebm	INCOMPLETE	2024-11-28 16:00:00
cm5rmjotu000714pich1qez2f	new subtask	This is a description	cm5rmjots000514piqvit9q4p	COMPLETE	2024-11-27 16:00:00
cm5rmjotw000b14pizo8nnm78	new	ewqfweewqfew	cm5rmjotv000914pifmk9ixeu	COMPLETE	2024-11-28 16:00:00
cm5rmjoty000f14pibf6pfpmh	Subtask1	fefwqfqwefqfq	cm5rmjotx000d14piusw8rexx	INCOMPLETE	2024-11-28 16:00:00
\.


--
-- Data for Name: Task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Task" (id, projectid, description, name, status, deadline, userid) FROM stdin;
cm3tgthbu000t5qvabxownn38	cm2hapf9u002369k8mqe7ivpc	Do it nowww	Complete CSIA	COMPLETE	2024-11-27 16:00:00	cm1hgob4z000263bo8hngp79a
cm3tgsk2a000j5qval3wu4ayo	cm2hapf9u002369k8mqe7ivpc	efqwefwfw	New Task	INCOMPLETE	2024-11-28 16:00:00	cm1f348ny00025pqvkakp4cga
cm3twqxrv000zmxr3girbffn3	cm2hapf9u002369k8mqe7ivpc	testing	testing	INCOMPLETE	2024-11-28 16:00:00	cm3twnyc5000vmxr3htluslch
\.


--
-- Data for Name: TaskStatusInstance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."TaskStatusInstance" (id, instanceid, name, description, status, deadline, userid, originalid) FROM stdin;
cm3tgsrvt000r5qvamb0iw9c9	cm3tgsrvp000p5qvadug3bynd	New Task	efqwefwfw	INCOMPLETE	2024-11-28 16:00:00	cm1f348ny00025pqvkakp4cga	cm3tgsk2a000j5qval3wu4ayo
cm3tsil7i0005mxr3wj2nc7kt	cm3tsil7d0003mxr32fqfsd7d	New Task	efqwefwfw	INCOMPLETE	2024-11-28 16:00:00	cm1f348ny00025pqvkakp4cga	cm3tgsk2a000j5qval3wu4ayo
cm3tsil7n0009mxr3qd24wu9c	cm3tsil7d0003mxr32fqfsd7d	Complete CSIA	Do it nowww	INCOMPLETE	2024-11-27 16:00:00	cm1hgob4z000263bo8hngp79a	cm3tgthbu000t5qvabxownn38
cm3twt5l20015mxr3ccgxo9t2	cm3twt5ky0013mxr3fq8ux3s9	New Task	efqwefwfw	INCOMPLETE	2024-11-28 16:00:00	cm1f348ny00025pqvkakp4cga	cm3tgsk2a000j5qval3wu4ayo
cm3twt5l60019mxr3gprtqebm	cm3twt5ky0013mxr3fq8ux3s9	test	testing	INCOMPLETE	2024-11-28 16:00:00	cm3twnyc5000vmxr3htluslch	cm3twqxrv000zmxr3girbffn3
cm3twt5la001dmxr3eh2kz3bp	cm3twt5ky0013mxr3fq8ux3s9	Complete CSIA	Do it nowww	COMPLETE	2024-11-27 16:00:00	cm1hgob4z000263bo8hngp79a	cm3tgthbu000t5qvabxownn38
cm5rmjots000514piqvit9q4p	cm5rmjotq000314piagjfoi8d	Complete CSIA	Do it nowww	COMPLETE	2024-11-27 16:00:00	cm1hgob4z000263bo8hngp79a	cm3tgthbu000t5qvabxownn38
cm5rmjotv000914pifmk9ixeu	cm5rmjotq000314piagjfoi8d	testing	testing	COMPLETE	2024-11-28 16:00:00	cm3twnyc5000vmxr3htluslch	cm3twqxrv000zmxr3girbffn3
cm5rmjotx000d14piusw8rexx	cm5rmjotq000314piagjfoi8d	New Task	efqwefwfw	INCOMPLETE	2024-11-28 16:00:00	cm1f348ny00025pqvkakp4cga	cm3tgsk2a000j5qval3wu4ayo
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, image, password, username, email, role) FROM stdin;
cm1f348ny00025pqvkakp4cga	\N	$2a$10$bGCDcm3iE6CNl7KLn4De0OrgtKcWPqT47PF20ri08/.RuOwRwPK1y	test2	ricric.games@gmail.com	USER
cm1hgob4z000263bo8hngp79a	\N	$2a$10$.cs1AWLxQhqhqyGcAh3IteJeDr0RmsoiqduzdtC7cHRhqQLpooIvy	test3	contact.chen.ricky@gmail.com	ADMIN
cm34klvj10005dtk6d5n8subv	\N	$2a$10$6FAO5yNqDQzP8xOHVhegteE6AQ9pmaPXtiYflLUsVxymTvfYGDrK6	placeholder	placeholder@gmail.com	USER
cm2gdsff4000469k8ozfvpcrl	\N	$2a$10$wqPKBZRSzArOZAe8CmqCO.OKQrlCPWMj6EjZqO7iB.IXfeLGxAaJC	admin	ricch2025@cis.edu.sg	ADMIN
cm3twnyc5000vmxr3htluslch	\N	$2a$10$Eolb/DilmObb6wfyaTQb/.B6WfEjO1xtUZUqr0uclcR/POQZZz04G	test	ricric.home132@gmail.com	USER
\.


--
-- Data for Name: UserProject; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."UserProject" (id, userid, projectid, role, "joinDate") FROM stdin;
cm2hapf9z002569k8ljgilj7m	cm2gdsff4000469k8ozfvpcrl	cm2hapf9u002369k8mqe7ivpc	OWNER	2024-10-27 12:54:27.875
cm2haqdx8002b69k8fkjpijr4	cm2gdsff4000469k8ozfvpcrl	cm2haqdx5002969k8reo02thq	OWNER	2024-10-27 12:54:27.875
cm2has09t002e69k8hk9wx3dt	cm2gdsff4000469k8ozfvpcrl	cm2has09p002c69k8d82aklrm	OWNER	2024-10-27 12:54:27.875
cm2hasomh002h69k88qfqwoo8	cm2gdsff4000469k8ozfvpcrl	cm2hasomf002f69k8dliowmhl	OWNER	2024-10-27 12:54:27.875
cm34kvf6d002ldtk6boew164y	cm1hgob4z000263bo8hngp79a	cm2hapf9u002369k8mqe7ivpc	ADMIN	2024-11-05 15:01:20.15
cm2hppgem002r69k86qcjctpw	cm1f348ny00025pqvkakp4cga	cm2haqdx5002969k8reo02thq	MEMBER	2024-10-27 12:54:27.875
cm34kmpfx0007dtk6wy1k55is	cm34klvj10005dtk6d5n8subv	cm2haqdx5002969k8reo02thq	MEMBER	2024-11-05 14:54:33.55
cm3twbyvi000fmxr3onf7yjcs	cm2gdsff4000469k8ozfvpcrl	cm3twbyvb000dmxr3gg22byxl	OWNER	2024-11-23 08:16:22.351
cm3twcuv6000imxr3d9cft9ko	cm2gdsff4000469k8ozfvpcrl	cm3twcuv2000gmxr3zwl9mtqc	OWNER	2024-11-23 08:17:03.81
cm3twdhly000kmxr3pe4hv9li	cm1hgob4z000263bo8hngp79a	cm2has09p002c69k8d82aklrm	ADMIN	2024-11-23 08:17:33.287
cm3twe0qq000nmxr3u7slcp8f	cm2gdsff4000469k8ozfvpcrl	cm3twe0ql000lmxr3z70f92yd	OWNER	2024-11-23 08:17:58.082
cm3twp7rc000xmxr3jhuxf4y8	cm3twnyc5000vmxr3htluslch	cm2hapf9u002369k8mqe7ivpc	MEMBER	2024-11-23 08:26:40.393
cm3tww1f1001imxr3bp4zhlir	cm1hgob4z000263bo8hngp79a	cm3tww1ex001gmxr3v3z442fc	OWNER	2024-11-23 08:31:58.766
cm5rmkbaf000h14pigq3dk0m5	cm2gdsff4000469k8ozfvpcrl	cm3tww1ex001gmxr3v3z442fc	ADMIN	2025-01-11 03:26:47.847
cm61wiu6800032r0pihw04x5o	cm1hgob4z000263bo8hngp79a	cm2haqdx5002969k8reo02thq	ADMIN	2025-01-18 08:03:16.929
cm63928bl0002uyhza7wbyrk4	cm2gdsff4000469k8ozfvpcrl	cm63928bd0000uyhzrq1wj57g	OWNER	2025-01-19 06:42:03.297
\.


--
-- Data for Name: VerificationToken; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VerificationToken" (id, email, token, expires) FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
a9878550-74d5-417a-8464-e672de7efb8c	dfe8014177907837994a5783a4589e224197cfcad36f73f7f299c3e920356de0	2024-08-13 20:31:17.531784+08	20240813123117_added_notes	\N	\N	2024-08-13 20:31:17.508901+08	1
7436991a-f1fe-4629-a107-a26a0f298040	eef7f51db8d0f8ef6473232d86d6ea50f325446c75bbfdef52dd210fff747da1	2024-03-27 22:07:17.235137+08	20240327140717_init	\N	\N	2024-03-27 22:07:17.187986+08	1
87936977-95c7-482c-a5bc-091096041994	839b31568933d5b43cb093b62df96fdfa57842fd649ac199a7979c8d8690afd4	2024-03-28 00:27:19.56648+08	20240327162719_remove_verification	\N	\N	2024-03-28 00:27:19.553396+08	1
3431eae2-164c-471d-a7dd-c1f3e1676c46	4afe9394c1dc72595d1cfd0c4ca4d71fe56ca1de62c1ad1aa96bbacf4aecc6c8	2024-03-28 00:37:15.473781+08	20240327163715_	\N	\N	2024-03-28 00:37:15.455893+08	1
7e8591df-27f4-4f5c-992d-efbe7d4c139c	d773aa952f8fb6404fc931e124310e33a35fefae67d828ff718d7e840ffa8df2	2024-08-14 18:44:02.149914+08	20240814104402_added_name_to_notes	\N	\N	2024-08-14 18:44:02.127968+08	1
f72365e2-7e91-4163-b6b5-e59a6e621cff	0c589a269e7903097cc2b457583f709aff59ea8f69a463c518c8c1b568e55e93	2024-03-28 13:04:20.819912+08	20240328050420_add_project_connection	\N	\N	2024-03-28 13:04:20.799453+08	1
d739d3f3-5f8e-4d3e-94b9-261aa51b4314	c678c5453b87f0741503adaec3c2cf4dc863fe626e555d5ead3cd5dd651a1889	2024-04-01 03:42:14.761626+08	20240331194214_add_description_to_project	\N	\N	2024-04-01 03:42:14.75832+08	1
f12e9cd4-efe9-4c1b-9bec-7aa32aa8674e	17023766f71b76594c022c5cf6c79b5ef52dcc5f6004babd0626c8beac75a690	2024-09-24 22:04:21.306827+08	20240924140421_add_user_role	\N	\N	2024-09-24 22:04:21.302683+08	1
086d8a7b-db55-4e6b-a94f-4306749dd052	0b2a8b97200a06faeb861d3d11079fd99906739648f700bff2991e09e6061d0f	2024-07-12 11:03:01.867809+08	20240712030301_add_tasks	\N	\N	2024-07-12 11:03:01.848309+08	1
0cfc9751-534a-41bd-b819-af1cbe9ee452	fc19f94a1dd9388daa5551ecd10c257b6c2d381d901d0e5e8d06096bbe814a19	2024-08-15 17:26:19.63649+08	20240815092619_add_invite_code	\N	\N	2024-08-15 17:26:19.615357+08	1
dc628a56-ec20-4070-8d5a-526737b108c5	dc67084d2e28ce49a9eb8640bf060d365a663c70c364f81129fc88ce64aaf010	2024-07-12 11:21:07.473345+08	20240712032107_unique_ids	\N	\N	2024-07-12 11:21:07.462492+08	1
5ba7aba8-8892-4d65-9ced-438c5f5de3de	2cd570d43e3142223f9c78dfa2854c63611b1a37070c63c8817e6a163aeb568a	2024-07-12 16:33:15.992822+08	20240712083315_added_task	\N	\N	2024-07-12 16:33:15.981554+08	1
0dbe92ee-ff16-4e42-b8b1-029fb72c1895	431e417977a296dd31a74f8452afe605a28e84768d0fd4ecdc4aac53d5ede842	2024-08-07 00:16:32.753062+08	20240806161632_added_deadline	\N	\N	2024-08-07 00:16:32.749211+08	1
5e505746-203e-4ae4-bac7-be079bab9b67	0486d94864c8cd34ce5e2bc1c167c0b599b612918bcbd24b1f4cb4b316fc737d	2024-08-15 22:21:16.025441+08	20240815142115_change_user_to_member	\N	\N	2024-08-15 22:21:15.995424+08	1
cdeef3ff-48aa-4eef-9c10-30429861a276	0496b6e72223be24599260bd8bb89224eee62d1c15a4e2b854661773f8240355	2024-08-10 11:56:25.276718+08	20240810035625_add_subtasks	\N	\N	2024-08-10 11:56:25.257377+08	1
02e5bc7b-27ab-471e-9b17-3d12df7ae192	75fbc8fd2f1194c067a89aa35fb182e4a9b2bea737b821f847d2f19366b1573b	2024-08-10 12:00:44.982634+08	20240810040044_fix_subtask	\N	\N	2024-08-10 12:00:44.980664+08	1
e09de982-ceb2-457e-a36f-286b2cf6cf33	e6ad45b11d174c333ad5e3c2097ca7db1b44cefd7a940976e87e3d5b38238807	2024-11-04 23:03:27.056771+08	20241104150327_cascade	\N	\N	2024-11-04 23:03:27.042977+08	1
7ace1a21-5184-4372-b793-b4bfb7ae5bec	db58804b7346bac760c476094671f2032e0de609aa2e86a57b5e8fec1daf7b5c	2024-08-10 12:06:50.952023+08	20240810040650_add_deadline_to_subtasks	\N	\N	2024-08-10 12:06:50.950191+08	1
46b11686-2c5e-4eef-b583-db48a1f2f006	e91a499294254723307c1e03bcf4f4324a96b8cceeb6b5137aeaf10618f1f9b8	2024-09-14 10:52:28.465144+08	20240914025228_add_email_verif	\N	\N	2024-09-14 10:52:28.440181+08	1
f08f9b60-36e5-4629-9d60-9e1a593f6bbf	b8b2c6b3160c9ee2c589f2a2e031900e9ef9bf5e042aaa01401b6576c7044ccc	2024-08-12 20:46:20.465272+08	20240812124620_added_invites	\N	\N	2024-08-12 20:46:20.441265+08	1
bca13dca-c204-4e08-bfa8-4f888956fa18	b2c0dbb9af54aa6b00478e4d23bf33e98fac704219ed74b5a841a45e15b152e2	2024-09-24 22:05:35.25544+08	20240924140535_mandate_roles	\N	\N	2024-09-24 22:05:35.252056+08	1
28859a3e-d74b-4ee5-9443-c80ddf8c9e3c	8d3fcda3913a5f55483e57a12a3174d2ade4409996c60b12fbd9717fb0c0a108	2024-09-14 10:59:48.093253+08	20240914025948_add_unverified_users	\N	\N	2024-09-14 10:59:48.090291+08	1
d36af98c-98ed-4aa3-b5ca-8a224982a7dc	30be9b95a65cced6d6bfae6c4742ef79b958fd23f53ffa14c349cf5ee7a0a211	2024-10-27 12:19:00.190898+08	20241027041900_fix_transactions	\N	\N	2024-10-27 12:19:00.187438+08	1
3d1e9ef6-fe41-4119-8e5b-ad3239ff9cc8	8ecbc7fd9fb798884f60a34aec4f53934dba72e99047c0fe1ee45d82cae2e231	2024-09-21 16:33:35.857501+08	20240921083335_add_requests	\N	\N	2024-09-21 16:33:35.834494+08	1
dd24e225-7d20-47c3-8f1b-df8979bd2f3f	6973b3bb0c5051713d64a920238d272a6ed44d072995abe4c68d425e1b2f5e1a	2024-09-25 13:59:21.31736+08	20240925055921_remove_roles	\N	\N	2024-09-25 13:59:21.313274+08	1
24691b56-a4a7-4eae-9dd7-078d0f0ae01d	022d03ddd126c3b670bbd8f927f45402ca7f12180a4ac6b2c7ce7b02a6797ca6	2024-09-21 20:51:01.538946+08	20240921125101_t	\N	\N	2024-09-21 20:51:01.526579+08	1
ca2bf07a-65c0-4f10-ab7e-5b1dc3abb24a	3564b635436377623f506398cc94167f1770e5fe52c6af2973e55ed00c108a13	2024-09-24 21:58:34.502581+08	20240924135834_add_user_roles	\N	\N	2024-09-24 21:58:34.498642+08	1
14de4d05-15d7-4a9c-84fc-0caaea685724	17023766f71b76594c022c5cf6c79b5ef52dcc5f6004babd0626c8beac75a690	2024-10-19 22:59:48.722005+08	20241019145948_add_role	\N	\N	2024-10-19 22:59:48.712844+08	1
7d853d9a-350a-4de3-b780-f10d431fc3f5	de948c40adfd550bb1a8adb17a146f61b00dec97166d700719d84f44371a8307	2024-10-19 23:55:44.225755+08	20241019155544_pending_user_roles	\N	\N	2024-10-19 23:55:44.2235+08	1
ca1fca27-242d-42f8-b6b6-8c1e9c6d8c76	833b6f662f0c95fe7750cab327c89b66ed22b1cf83ec73eb982dd892621862be	2024-10-27 12:54:27.898649+08	20241027045427_add_instances	\N	\N	2024-10-27 12:54:27.873216+08	1
13890d4a-36cf-4827-a68a-6c09a78c61d6	3a6f01cd297703dd4346c32bd8851aee960363bda857e257d967a0897ced5eaf	2024-10-26 21:02:39.671347+08	20241026130239_add_assignable	\N	\N	2024-10-26 21:02:39.649604+08	1
4895e792-5354-4da8-814e-4caaceb428e0	9054a91dd5960a58125246cdf27800afe4fe7e06531c8f6bba45f5954c414619	2024-10-27 21:36:00.874086+08	20241027133600_report_connector	\N	\N	2024-10-27 21:36:00.863757+08	1
f28b54fb-cf98-4578-9eb3-42717d1c800c	814763df9669453966415835e7b17a0b66ac359193433ecc5082ee8eabac769f	2024-11-18 18:46:21.773092+08	20241118104621_add_og_to_instance	\N	\N	2024-11-18 18:46:21.769694+08	1
\.


--
-- Name: Note Note_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Note"
    ADD CONSTRAINT "Note_pkey" PRIMARY KEY (id);


--
-- Name: PendingUsers PendingUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PendingUsers"
    ADD CONSTRAINT "PendingUsers_pkey" PRIMARY KEY (id);


--
-- Name: ProjectStatusInstance ProjectStatusInstance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectStatusInstance"
    ADD CONSTRAINT "ProjectStatusInstance_pkey" PRIMARY KEY (id);


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: SubtaskStatusInstance SubtaskStatusInstance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SubtaskStatusInstance"
    ADD CONSTRAINT "SubtaskStatusInstance_pkey" PRIMARY KEY (id);


--
-- Name: Subtask Subtask_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subtask"
    ADD CONSTRAINT "Subtask_pkey" PRIMARY KEY (id);


--
-- Name: TaskStatusInstance TaskStatusInstance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TaskStatusInstance"
    ADD CONSTRAINT "TaskStatusInstance_pkey" PRIMARY KEY (id);


--
-- Name: Task Task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_pkey" PRIMARY KEY (id);


--
-- Name: UserProject UserProject_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProject"
    ADD CONSTRAINT "UserProject_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: VerificationToken VerificationToken_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VerificationToken"
    ADD CONSTRAINT "VerificationToken_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Note_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Note_id_key" ON public."Note" USING btree (id);


--
-- Name: PendingUsers_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "PendingUsers_email_key" ON public."PendingUsers" USING btree (email);


--
-- Name: PendingUsers_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "PendingUsers_id_key" ON public."PendingUsers" USING btree (id);


--
-- Name: PendingUsers_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "PendingUsers_username_key" ON public."PendingUsers" USING btree (username);


--
-- Name: ProjectStatusInstance_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ProjectStatusInstance_id_key" ON public."ProjectStatusInstance" USING btree (id);


--
-- Name: Project_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Project_id_key" ON public."Project" USING btree (id);


--
-- Name: Project_inviteCode_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Project_inviteCode_key" ON public."Project" USING btree ("inviteCode");


--
-- Name: SubtaskStatusInstance_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "SubtaskStatusInstance_id_key" ON public."SubtaskStatusInstance" USING btree (id);


--
-- Name: Subtask_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Subtask_id_key" ON public."Subtask" USING btree (id);


--
-- Name: TaskStatusInstance_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "TaskStatusInstance_id_key" ON public."TaskStatusInstance" USING btree (id);


--
-- Name: Task_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Task_id_key" ON public."Task" USING btree (id);


--
-- Name: UserProject_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "UserProject_id_key" ON public."UserProject" USING btree (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_id_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_id_key" ON public."User" USING btree (id);


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: VerificationToken_email_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON public."VerificationToken" USING btree (email, token);


--
-- Name: VerificationToken_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "VerificationToken_token_key" ON public."VerificationToken" USING btree (token);


--
-- Name: Note Note_projectid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Note"
    ADD CONSTRAINT "Note_projectid_fkey" FOREIGN KEY (projectid) REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ProjectStatusInstance ProjectStatusInstance_projectid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProjectStatusInstance"
    ADD CONSTRAINT "ProjectStatusInstance_projectid_fkey" FOREIGN KEY (projectid) REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SubtaskStatusInstance SubtaskStatusInstance_taskid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SubtaskStatusInstance"
    ADD CONSTRAINT "SubtaskStatusInstance_taskid_fkey" FOREIGN KEY (taskid) REFERENCES public."TaskStatusInstance"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Subtask Subtask_taskid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Subtask"
    ADD CONSTRAINT "Subtask_taskid_fkey" FOREIGN KEY (taskid) REFERENCES public."Task"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: TaskStatusInstance TaskStatusInstance_instanceid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TaskStatusInstance"
    ADD CONSTRAINT "TaskStatusInstance_instanceid_fkey" FOREIGN KEY (instanceid) REFERENCES public."ProjectStatusInstance"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: TaskStatusInstance TaskStatusInstance_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."TaskStatusInstance"
    ADD CONSTRAINT "TaskStatusInstance_userid_fkey" FOREIGN KEY (userid) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Task Task_projectid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_projectid_fkey" FOREIGN KEY (projectid) REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Task Task_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Task"
    ADD CONSTRAINT "Task_userid_fkey" FOREIGN KEY (userid) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: UserProject UserProject_projectid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProject"
    ADD CONSTRAINT "UserProject_projectid_fkey" FOREIGN KEY (projectid) REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserProject UserProject_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserProject"
    ADD CONSTRAINT "UserProject_userid_fkey" FOREIGN KEY (userid) REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

