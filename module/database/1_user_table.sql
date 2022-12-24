CREATE TABLE IF not exists users (
	id varchar(255) primary key,
	full_name varchar(255) not null,
	email varchar(150) not null,
	password varchar(255) not null,
	address varchar(150) not null,
	free_usage_finance_statement int not null,
	free_usage_personal_finance int not null,
	free_usage_saving_rate int not null,
	role varchar(150),
	created_at timestamp not null,
	created_by varchar(150),
	updated_at timestamp,
	updated_by varchar(150),
	deleted_at timestamp,
	is_deleted boolean
);