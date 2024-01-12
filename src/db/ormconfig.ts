// CAN BE USED TO WRITE ORM CLI COMMANDS

// export const AppDataSource = new DataSource({
//   type: 'mariadb',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: '',
//   database: '',
//   entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/migrations/*{.ts,.js}'],
//   cli: {
//     migrationsDir: 'src/db/migrations',
//   },
//   synchronize: false,
// } as DataSourceOptions);

// ts-node node_modules/typeorm/cli.js migration:generate src/db/migrations/ -d src/db/ormconfig.ts
// ts-node node_modules/typeorm/cli.js migration:run -d src/db/ormconfig.ts
