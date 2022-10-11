import { DataSource } from "typeorm";

import { Post } from "./Models/Post";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "supertokens_user",
  password: "somePassword",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [Post],
  subscribers: [],
  migrations: [],
});
