## DB Setup

- Login in to mysql

- create DB

### `create database DATABASE_NAME;`

- create Table

### `CREATE TABLE IF NOT EXISTS users(id INT PRIMARY KEY AUTO_INCREMENT, first_name VARCHAR(100) NOT NULL, last_name VARCHAR(100), email VARCHAR(255) UNIQUE NOT NULL, is_admin BOOLEAN DEFAULT false, is_verified BOOLEAN DEFAULT false);`

- Set ENV for DB `MYSQL_USER, MYSQL_PORT, MYSQL_PASSWORD, MYSQL_DATABASE_NAME, & MYSQL_HOST`

## Mail service Setup

- Login to gmail

- settings > security > enable 2FA

- Generate app password > set it in `SMTP_GMAIL_APP_PASSWORD`

- set other ENV `SMTP_USER, JWT_SECRET, & WEBAPP_BASE_URL`

### `npm i`

### `npm run start`
