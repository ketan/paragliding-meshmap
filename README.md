# paragliding-meshmap

# Deployment

```bash
yarn install
yarn run docker:build
docker run -it -e DEBUG='typeorm*,meshmap*,-mqtt*' -e DB_URL=... paragliding-meshmap
```

| Supported databases | URL pattern                                                               |
| ------------------- | ------------------------------------------------------------------------- |
| postgresql          | `postgres://username:password@hostname:port/database-name`                |
| mysql               | `mysql://someuser:password@hostname:port/database-name`                   |
| sqlite              | `sqlite3:////path/to/database.sqlite` (**four slash** for absolute paths) |
