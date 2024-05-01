import { LightieRequest } from "./src/main";

export const req = new LightieRequest();

export { IHeaderRequest } from "./src/utils/interfaces/header.interface";
export { IInterceptorCallbackConfig } from "./src/utils/interfaces/interceptor-callback-config.interface";
export { IInterceptorByPathName } from "./src/utils/interfaces/interceptors.interface";
export { TInterceptorByMethod } from './src/utils/types/interceptor-by-method.type';
export { IResponse } from "./src/utils/interfaces/response.interface";
export { IOptions } from "./src/utils/interfaces/options.interface";

export { StatusCodeEnum } from "./src/utils/enums/status-code.enum";
export { StatusTextEnum } from "./src/utils/enums/status-text.enum";
export { HttpMethodsEnum } from "./src/utils/enums/http-methods.enum";