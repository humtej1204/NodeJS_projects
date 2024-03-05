import { ITestCreated } from "../../domain/test/model/interface/test-created.interface";
import { ITestRepository } from "../../domain/test/model/interface/test-repository.interface";
import { ITestUpdated } from "../../domain/test/model/interface/test-updated.interface";
import { ITest } from "../../domain/test/model/interface/test.interface";
import { AppDate } from "../../utils/app-date";
import { IDatabase } from "../database/mysql";
import { ISchema } from "../database/table-builder/schema.interface";
import { TableBuilder } from "../database/table-builder/table-builder";

export class TestRepository implements ITestRepository {
    tableName = 'Test';
    tableSchema: ISchema[] = [
        {
            columnName: 'id',
            type: 'increments',
            typeOptions: {
                primaryKey: true,
            }
        },
        {
            columnName: 'name',
            type: 'string',
            typeProperties: {
                nullable: true
            }
        },
        {
            columnName: 'email',
            type: 'string',
            typeProperties: {
                nullable: true,
                unique: true
            },
            checks: {
                checkRegex: {
                    value: '^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$',
                }
            }
        },
        {columnName: 'age', type: 'integer'},
        {
            columnName: 'money',
            type: 'float',
            typeOptions: {
                scale: 1
            },
            typeProperties: {
                defaultTo: 0.0
            }
        },
        {columnName: 'birthday', type: 'date'},
        {
            columnName: 'createdAt',
            type: 'timestamp',
            typeProperties: {
                defaultTo: '2024-02-27 05:23:30.443'
            }
        },
        {columnName: 'updatedAt', type: 'timestamp'},
        {columnName: 'deletedAt', type: 'timestamp'},
    ];
    tableBuilder: TableBuilder;

    constructor(private readonly db: IDatabase) {
        this.tableBuilder = new TableBuilder(db)
        this.runSchema();
    }

    async runSchema() {
        this.tableBuilder.init(this.tableName, this.tableSchema);
    }

    Test() {
        return this.db<ITest>(this.tableName)
    }

    findById(id: number): Promise<ITest> {
        return this.Test()
            .select()
            .where({ id })
            .first()
            .then(res => {
                if (!res) throw Error(`Test not found by ID: ${id}`);
                return res;
            })
            .catch((err: Error) => {
                throw Error(`${err.message}`)
            })
    }

    findAll(): Promise<ITest[]> {
        return this.Test()
            .select()
            .catch((err: Error) => {
                throw Error(`${err.message}`)
            })
    }
    
    create(data: ITestCreated): Promise<unknown> {
        return this.Test()
            .insert(data)
            .then(([res]) => {
                if (!res) throw Error('No se pudo crear el elemento');
                return this.findById(res);
            })
            .catch((err: Error) => {
                throw Error(`${err.message}`)
            })
    }

    update(id: number, data: ITestUpdated): Promise<unknown> {
        return this.Test()
            .where({id})
            .update(data)
            .then((res) => {
                if (!res) throw Error('No se pudo actualizar el elemento');
                return this.findById(res);
            })
            .catch((err: Error) => {
                throw Error(`${err.message}`)
            })
    }

    delete(id: number): Promise<unknown> {
        return this.Test()
            .where({id})
            .update({deletedAt: new AppDate().toMYSQLDatetime()})
            .then((res) => {
                if (!res) throw Error('No se pudo eliminar el elemento');
                return res;
            })
            .catch((err: Error) => {
                throw Error(`${err.message}`)
            })
    }
}