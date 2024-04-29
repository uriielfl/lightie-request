import { StatusCodeEnum } from "../enums/status-code.enum";

export interface IResponse {
    data: any;
    status: StatusCodeEnum,
    statusText: string
}