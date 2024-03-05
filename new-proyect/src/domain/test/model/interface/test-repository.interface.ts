import { ITest } from "./test.interface";

export interface ITestRepository {
    findAll(): Promise<ITest[]>;
    findById(id: number): Promise<ITest>;
    create(data: unknown): Promise<unknown>;
    update(id: number, data: unknown): Promise<unknown>;
    delete(id: number): Promise<unknown>;
}
