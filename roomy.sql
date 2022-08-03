DROP DATABASE IF EXISTS roomy;
CREATE DATABASE roomy;
\connect roomy

\i roomy-schema.sql

DROP DATABASE IF EXISTS roomy_test;
CREATE DATABASE roomy_test;
\connect roomy_test

\i roomy-schema.sql