## Database Creation 

```sql
    CREATE DATABASE node03;
    
    USE node03;

    CREATE TABLE users(
        id int auto_increment unique,
        firstName varchar(255) not null,
        lastName varchar(255) not null,
        birthdate date not null
    );
```

## Run
```bash
    npm install
    npm run dev
```