import { Auditory } from "../../../common/interfaces/auditory.interface";

export interface ITest extends Auditory {
    id: number;
    name: string;
    email: string;
    age: number;
    money: number;
    birthday: string;
}