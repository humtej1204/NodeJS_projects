import knex, { Knex } from "knex";
import { appConsole } from "../../utils/app-console";

export interface IDatabase extends Knex { }
export interface ITable extends Knex.CreateTableBuilder {}
export interface IColumn extends Knex.ColumnBuilder {}
export type TLengthOperator = Knex.lengthOperator

export class MySQL {
    public db: IDatabase;

    constructor() {
        this.db = knex({
            client: 'mysql2',
            connection: {
                host: 'localhost',
                user: 'humtej1204',
                port: 3306,
                password: 'Humtej12*',
                database: 'students',
            },
        });

        this.testConnection()
    }

    testConnection(): void {
        appConsole.info('Connecting to MySQL...');
        this.db.raw('SELECT 1+1 as result')
            .then(([[{ result }]]) => {
                appConsole.info(`MySQL database connected, Result: ${result}`);
            }).catch((err) => {
                appConsole.error(err);
            });
    }
}