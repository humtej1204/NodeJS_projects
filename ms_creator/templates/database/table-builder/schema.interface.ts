/* eslint-disable @typescript-eslint/no-explicit-any */
import { IColumn, ITable, TLengthOperator } from "../mysql";

export interface ISchema {
    columnName: string,
    type: keyof ISchemaTypes,
    typeOptions?: Partial<ITypeOptions>,
    typeProperties?: Partial<ITypeProperties>,
    foreign?: IForeign,
    checks?: Partial<IChecks>
}

interface ITypeOptions {
	primaryKey: boolean,
	length: number,
	textType: string,
	precision: number,
	scale: number,
	values: Array<any>
}

export interface ITypeProperties {
    unique: boolean,
    nullable: boolean,
    unsigned: boolean,
    defaultTo: any,
    comment: string,
}

export interface IForeign {
    references: string,
    inTable: string,
    onUpdate?: ForeignOnAction;
    onDelete?: ForeignOnAction;
}

export interface IChecks {
    checkPositive: {
        value: boolean,
        constraintName?: string
    },
    checkIn: {
        value: Array<any>,
        constraintName?: string
    },
    checkNotIn: {
        value: Array<any>,
        constraintName?: string
    },
    checkBetween: {
        value: Array<number>|Array<Array<number>>,
        constraintName?: string
    },
    checkLength: {
        value: ICheckLength,
        constraintName?: string
    }
    checkRegex: {
        value: string,
        constraintName?: string
    },
}

interface ICheckLength {
    operator: TLengthOperator,
    length: number
}

type ForeignOnAction = "CASCADE"|"SET NULL"|"RESTRICT"|"NO ACTION";


interface ISchemaTypes {
    increments: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    text: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    integer: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    tinyint: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    string: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    binary: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    float: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    double: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    decimal: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    bigInteger: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    smallint: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    mediumint: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    bigint: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    boolean: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    date: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    datetime: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    timestamp: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    json: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    jsonb: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    uuid: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
    enu: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => any;
}

export const SchemaTypes: ISchemaTypes = {
    increments: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => table.increments(columnName, {primaryKey: options.primaryKey}),
    text: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => table.text(columnName, options.textType),
    integer: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => table.integer(columnName, options.length),
    tinyint: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => table.tinyint(columnName, options.length),
    string: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => table.string(columnName, options.length),
    binary: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => table.binary(columnName, options.length),
    float: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => table.float(columnName, options.precision, options.scale),
    double: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => table.double(columnName, options.precision, options.scale),
    decimal: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => table.decimal(columnName, options.precision, options.scale),
    bigInteger: (table: ITable, columnName: string, _options: Partial<ITypeOptions>) => table.bigInteger(columnName),
    smallint: (table: ITable, columnName: string, _options: Partial<ITypeOptions>) => table.smallint(columnName),
    mediumint: (table: ITable, columnName: string, _options: Partial<ITypeOptions>) => table.mediumint(columnName),
    bigint: (table: ITable, columnName: string, _options: Partial<ITypeOptions>) => table.bigint(columnName),
    boolean: (table: ITable, columnName: string, _options: Partial<ITypeOptions>) => table.boolean(columnName),
    date: (table: ITable, columnName: string, _options: Partial<ITypeOptions>) => table.date(columnName),
    datetime: (table: ITable, columnName: string, _options: Partial<ITypeOptions>) => table.datetime(columnName),
    timestamp: (table: ITable, columnName: string, _options: Partial<ITypeOptions>) => table.timestamp(columnName),
    json: (table: ITable, columnName: string, _options: Partial<ITypeOptions>) => table.json(columnName),
    jsonb: (table: ITable, columnName: string, _options: Partial<ITypeOptions>) => table.jsonb(columnName),
    uuid: (table: ITable, columnName: string, _options: Partial<ITypeOptions>) => table.uuid(columnName),
    enu: (table: ITable, columnName: string, options: Partial<ITypeOptions>) => table.enu(columnName, options.values ?? []),
}

export interface ISchemaTypeProperties {
    unique: (chain: IColumn, value: boolean) => any;
    unsigned: (chain: IColumn, value: boolean) => any;
    nullable: (chain: IColumn, value: boolean) => any;
    defaultTo: (chain: IColumn, value: any) => any;
    comment: (chain: IColumn, value: string) => any;
}

export const SchemaTypeProperties: ISchemaTypeProperties = {
    unique: (chain: IColumn, value: boolean) => {
        return value ? chain.unique() : chain;
    },
    unsigned: (chain: IColumn, value: boolean) => {
        return value ? chain.unsigned() : chain;
    },
    nullable: (chain: IColumn, value: boolean) => {
        if (value === false) return chain.notNullable();
        return chain.nullable();
    },
    defaultTo: (chain: IColumn, value: any) => {
        return (value !== undefined) ? chain.defaultTo(value) : chain;
    },
    comment: (chain: IColumn, value: string) => {
        return value ? chain.comment(value) : chain;
    }
}

export interface ISchemaChecks {
    checkPositive: (chain: IColumn, value: boolean, constraintName?: string) => any;
    checkIn: (chain: IColumn, value: Array<any>, constraintName?: string) => any;
    checkNotIn: (chain: IColumn, value: Array<any>, constraintName?: string) => any;
    checkBetween: (chain: IColumn, value: Array<any>, constraintName?: string) => any;
    checkLength: (chain: IColumn, value: any, constraintName?: string) => any;
    checkRegex: (chain: IColumn, value: string, constraintName?: string) => any;
}

export const SchemaChecks: ISchemaChecks = {
    checkPositive: (chain: IColumn, value: boolean, constraintName?: string) => {
        return value ?
            chain.checkPositive(constraintName) : chain;
    },
    checkIn: (chain: IColumn, value: Array<any>, constraintName?: string) => {
        return (value?.length) ?
            chain.checkIn(value, constraintName) : chain;
    },
    checkNotIn: (chain: IColumn, value: Array<any>, constraintName?: string) => {
        return (value?.length) ?
            chain.checkNotIn(value, constraintName) : chain;
    },
    checkBetween: (chain: IColumn, value: Array<any>, constraintName?: string) => {
        return (value?.length) ?
            chain.checkBetween(value, constraintName) : chain;
    },
    checkLength: (chain: IColumn, value: any, constraintName?: string) => {
        const valueData = value as ICheckLength;
        return valueData ? 
            chain.checkLength(valueData.operator, valueData.length, constraintName) : chain;
    },
    checkRegex: (chain: IColumn, value: string, constraintName?: string) => {
        return value ?
            chain.checkRegex(value, constraintName) : chain;
    },
}
