import { Repositories } from "../../common/interfaces/repositories.interface";
import { ITestCreated } from "./interface/test-created.interface";
import { ITestRepository } from "./interface/test-repository.interface";
import { ITestUpdated } from "./interface/test-updated.interface";
import { ITest } from "./interface/test.interface";

export class TestModel {
  testRepo: ITestRepository;

  constructor({testRepository}: Repositories) {
    this.testRepo = testRepository;
  }

  findAll(): Promise<ITest[]> {
    return this.testRepo.findAll();
  }

  findById(id: number) {
    return this.testRepo.findById(id);
  }

  create(data: ITestCreated) {
    return this.testRepo.create(data);
  }

  update(id: number, data: ITestUpdated) {
    return this.testRepo.update(id, data);
  }

  delete(id: number) {
    return this.testRepo.delete(id);
  }
}
