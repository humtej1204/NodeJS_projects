import { Repositories } from "../../domain/common/interfaces/repositories.interface";
import { ITestCreated } from "../../domain/test/model/interface/test-created.interface";
import { ITest } from "../../domain/test/model/interface/test.interface";
import { TestModel } from "../../domain/test/model/test.model";
import { HttpStatusInfo } from "../../utils/http-status-info";

export class TestUseCases {
  testModel: TestModel;

  constructor(private readonly repositories: Repositories) {
    this.testModel = new TestModel(this.repositories);
  }

  findAllTests() {
    return this.testModel.findAll()
    .then((value: ITest[]) => ({
      success: false,
      httpCode: HttpStatusInfo.OK.code,
      data: {
        items: value
      }
    }));
  }

  findTestById(id: number) {
    return this.testModel.findById(id);
  }

  createTest(data: ITestCreated) {
    return this.testModel.create(data);
  }

  updateTest(id: number, data: ITestCreated) {
    return this.testModel.update(id, data);
  }

  deleteTest(id: number) {
    return this.testModel.delete(id);
  }
}
