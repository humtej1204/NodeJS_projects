import { AppDate } from "../../../../utils/app-date";
import { ITestCreated } from "../interface/test-created.interface";

export class TestCreatedDTO implements ITestCreated {
    name: string;
    email: string;
    age: number;
    money: number;
    birthday: string;
    updatedAt: string;
  
    constructor(contestant: ITestCreated) {
        this.name = contestant.name;
        this.email = contestant.email;
        this.age = contestant.age;
        this.money = contestant.money;
        this.birthday = new AppDate(contestant.birthday).toMYSQLDatetime();
        this.updatedAt = new AppDate().toMYSQLDatetime();
    }
}
