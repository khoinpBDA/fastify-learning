--liquibase formatted sql
--changeset khoinp:release_1_0_0.001create_table_users.sql

create table if not exists users
(
	id bigserial not null
		constraint users_pkey
			primary key,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
    name varchar(255),
	status integer,
    is_deleted boolean
);