CREATE TABLE IF NOT EXISTS feedbacks (
    id varchar(255) primary key,
    user_id varchar(255) not null,
    what_is_good text,
    what_need_improve text,
    rating_score int not null,
    created_at timestamp not null,
    created_by varchar(150),
    CONSTRAINT fk_user_id foreign key (user_id) references users(id)
);