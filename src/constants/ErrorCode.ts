export class ErrorCode {
  static ERROR_CODE = {
    SUCESS: 0,
    SYSTEM_ERROR: 10001,
    PARAM_ERROE: 1002,
  };
  static getResul(code = this.ERROR_CODE.SUCESS, msg = "sucess", data = null) {
    return new HttpResponse(code, msg, data);
  }
}

export class HttpResponse {
  code: number;
  msg: string;
  data;
  constructor(code, msg, data) {
    this.code = code;
    this.msg = msg;
    this.data = data;
  }
}
