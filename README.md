# recipe-api

This API will power a website where recipes can be stored, searched, and accessed. The design of this API can be found
at https://github.com/PieceMaker/recipe-design/blob/master/api.md.

## MongoDB

This API uses MongoDB to store recipes. The database is called `recipes` which contains one collection, also called
`recipes`.

### Creating and Populating Collections

Two scripts have been provided. One to create the `recipes` collection, the other to populate it with sample data.
You can setup your database by running the below scripts using the `mongo` cli. These scripts assume your MongoDB is
running at `localhost:27017` and that they are run from the top of this repository.

```bash
mongo localhost:27017/recipes db/create.js
mongo localhost:27017/recipes db/populate.js
```

The first command will automatically create the `recipes` database if it does not already exist. It will then create
the `recipes` collection, as defined in `db/create.js`. The second command will insert some sample recipes into the
newly-created collection.