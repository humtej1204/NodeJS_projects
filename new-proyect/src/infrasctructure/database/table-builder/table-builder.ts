/* eslint-disable @typescript-eslint/no-explicit-any */
import { appConsole } from "../../../utils/app-console";
import { IDatabase, ITable } from "../mysql";
import { IChecks, IForeign, ISchema, ISchemaChecks, ISchemaTypeProperties, ITypeProperties, SchemaChecks, SchemaTypeProperties, SchemaTypes } from "./schema.interface";

export class TableBuilder {
    tableName!: string;
    tableSchema!: ISchema[];

    constructor(
        private readonly database: IDatabase
    ) {}

    init(name: string, schema: ISchema[]) {
        this.tableName = name;
        this.tableSchema = schema;
        
        this.checkTable();
    }

    async checkTable() {
        this.database.schema.hasTable(this.tableName)
        .then(table => table ? this.checkColumns() : this.createTable())
    }

    async createTable() {
        return this.database.schema
        .createTable(this.tableName, (table) => {
            for (const columSchema of this.tableSchema) {
                this.buildSchema(table, columSchema);
            }
            appConsole.log(`Table ${this.tableName} was created correctly.`)
        })
    }

    async checkColumns() {
        for (const columSchema of this.tableSchema) {
            this.database.schema
            .hasColumn(this.tableName, columSchema.columnName)
            .then(exist => {
                if (exist) return;
                return this.database.schema
                .alterTable(this.tableName, table => {
                    this.buildSchema(table, columSchema);
                    appConsole.log(`Column ${columSchema.columnName} was created in Table ${this.tableName} correctly.`)
                })
            })
        }
    }

    buildSchema(table: ITable, columSchema: ISchema) {
        let columnBuilder = SchemaTypes[columSchema.type](table, columSchema.columnName, columSchema.typeOptions ?? {});

        columnBuilder = this.buildColumnTypeOptions(columnBuilder, columSchema.typeProperties);
        this.buildColumnChecks(columnBuilder, columSchema.checks);

        this.buildForeignColumn(table, columSchema.columnName, columSchema.foreign);
    }

    buildColumnTypeOptions(columnBuilder: any, typeProperties?: Partial<ITypeProperties>) {
        if (!typeProperties) return columnBuilder;
        
        let builder = columnBuilder;
        for (const [key, value] of Object.entries(typeProperties)) {
            if (!(key in SchemaTypeProperties)) continue;
            
            const keyString = key as keyof ISchemaTypeProperties;
            builder = SchemaTypeProperties[keyString](columnBuilder, value);
        }
        return builder;
    }

    buildColumnChecks(columnBuilder: any, checks?: Partial<IChecks>) {
        if (!checks) return columnBuilder;
        
        let builder = columnBuilder;
        for (const [key, value] of Object.entries(checks)) {
            if (!(key in SchemaChecks)) continue;
            
            const keyString = key as keyof ISchemaChecks;
            builder = SchemaChecks[keyString](columnBuilder, value.value, value.constraintName);
        }
        return builder;
    }

    buildForeignColumn(table: ITable, columnName: string, foreign?: IForeign) {
        if (!foreign) return;
        table.foreign(columnName)
            .references(foreign.inTable)
            .onUpdate(foreign.onUpdate ?? "NO ACTION")
            .onDelete(foreign.onDelete ?? "NO ACTION")
    }
}
