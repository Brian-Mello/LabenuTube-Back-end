import knex from "knex";

export abstract class BaseDB {
  protected connection = knex({
    client: "mysql",
    connection: {
      host: process.env.HOST,
      port: 3306,
      database: process.env.DB,
      user: process.env.USER,
      password: process.env.PASSWORD
    }
  });
}