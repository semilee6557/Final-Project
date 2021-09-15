set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."users" (
  "userId"          serial,
  "firstName"       text            not null,
  "lastName"        text            not null,
  "dob"             date            not null,
  "email"           text            not null,
  "hashedPassword"  text            not null,
  "createdAt"       timestamptz(6)  not null default now(),
  primary key ("userId"),
  unique ("email")
);

create table "intakeForm" (
  "intakeFormId"       serial,
  "userId"             integer not null,
  "firstName"          text    not null,
  "lastName"           text    not null,
  "dateOfBirth"        date    not null,
  "address"            text    not null,
  "city"               text    not null,
  "state"              text    not null,
  "zip"                integer not null,
  "pastMedicalHistory" text    not null,
  "familyHistory"      text    not null,
  "chiefComplain"      text    not null,
  "comment"            text    not null,
  primary key ("intakeFormId"),
  foreign key ("userId")
   references "users" ("userId")
);

create table "insurunceCard" (
  "insurunceCardId"  serial,
  "url"              text    not null,
  "originalName"     text    not null,
  "userId"           integer not null,
  "createdAt"        timestamptz(6)  not null default now(),
  primary key ("insurunceCardId"),
  foreign key ("userId")
   references "users" ("userId")

);
create table "medicalRecord" (
  "medicalRecordId"  serial,
  "url"              text    not null,
  "originalName"     text    not null,
  "userId"           integer not null,
  "createdAt"        timestamptz(6)  not null default now(),
  primary key ("medicalRecordId"),
  foreign key ("userId")
   references "users" ("userId")

);



create table "payment" (
  "paymentId"       serial,
  "userId"          integer not null,
  "paidDate"        date    not null,
  "orderNumber"     integer not null,
  "detail"          text    not null,
  "price"           integer not null,
  "appointmentId"   integer not null,
  primary key ("paymentId"),
  foreign key ("userId")
   references "users" ("userId")

);

create table "appointments" (
  "appointmentId" serial,
  "year"          integer         not null,
  "month"         integer         not null,
  "date"          integer         not null,
  "time"          text            not null,
  "userId"        integer         not null,
  "createdAt"     timestamptz(6)  not null default now(),
  primary key ("appointmentId"),
  foreign key ("userId")
   references "users" ("userId")
);
create table "waitingList" (
  "waitingListId"   serial,
  "userId"          integer not null,
  "date"            timestamptz  not null,
  "createdAt"       timestamptz(6)  not null default now(),
  primary key ("waitingListId"),
  foreign key ("userId")
   references "users" ("userId")
);
