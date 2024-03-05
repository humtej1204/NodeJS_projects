import { IAppData, IAppResponse } from "./app-response.interface";

export class AppResponse<T> implements IAppResponse<T> {
    data?: IAppData<T>;
    success: boolean;
    kindMessage?: string;
    httpCode?: number;

    constructor(success: boolean, kindMessage?: string, data?: IAppData<T>, httpCode?: number) {
        this.success = success;
        this.kindMessage = kindMessage;
        this.data = data;
        this.httpCode = httpCode;
    }
}