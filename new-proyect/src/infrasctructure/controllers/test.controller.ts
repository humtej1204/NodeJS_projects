import { NextFunction, Request, Response, Router } from "express";
import { Repositories } from "../../domain/common/interfaces/repositories.interface";
import { TestUseCases } from "../../application/test/test.use-cases";

class TestController {
  testUseCases: TestUseCases;
  router: Router;

  constructor(private readonly repositories: Repositories) {
    this.testUseCases = new TestUseCases(this.repositories);
    this.router = Router();

    this.routesBuilder();
  }

  routesBuilder() {
    this.router.get("/", this.findAllTests.bind(this));
    this.router.get("/:id", this.findTestById.bind(this));
    this.router.post("/", this.createTest.bind(this));
    this.router.patch("/:id", this.updateTest.bind(this));
    this.router.delete("/:id", this.deleteTest.bind(this));
  }

  findAllTests(_req: Request, _res: Response, next: NextFunction) {
    this.testUseCases.findAllTests()
      .then(next)
      .catch(next);
  }

  findTestById(req: Request, _res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    this.testUseCases.findTestById(id)
      .then(next)
      .catch(next);
  }

  createTest(req: Request, _res: Response, next: NextFunction) {
    this.testUseCases.createTest(req.body)
      .then(next)
      .catch(next);
  }

  updateTest(req: Request, _res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    this.testUseCases.updateTest(id, req.body)
      .then(next)
      .catch(next);
  }

  deleteTest(req: Request, _res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    this.testUseCases.deleteTest(id)
      .then(next)
      .catch(next);
  }
}

export const testController = (repositories: Repositories) =>
  new TestController(repositories).router;
