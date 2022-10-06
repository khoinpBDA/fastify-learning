--liquibase formatted sql
--changeset khoinp:release_1_0_0.002create_table_nfts.sql

create table if not exists nfts
(
	id bigserial not null
		constraint nfts_pkey
			primary key,
	created_at timestamp with time zone,
	updated_at timestamp with time zone,
    name varchar(255),
	nft_item_hash varchar(255),
	owner varchar(255),
	description varchar(255),
	url_2d varchar(255),
	user_id varchar(255),
	txn_hash varchar(255),
	metadata_cid varchar(255),
	status integer,
	nft_type integer,
	bc_id integer,
	market_status integer,
	rarity integer,
	number_of_copies integer,
    is_deleted boolean
);