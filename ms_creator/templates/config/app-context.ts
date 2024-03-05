import { Repositories } from "../../domain/common/interfaces/repositories.interface";
import { ITestRepository } from "../../domain/test/model/interface/test-repository.interface";
import { IDatabase } from "../database/mysql";
import { TestRepository } from "../repositories/test.repository";

export class AppContext implements Repositories {
    testRepository: ITestRepository;
  
    constructor(database: IDatabase) {
      this.testRepository = new TestRepository(database);
    }
}