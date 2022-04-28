import * as moment from "moment";
export async function logger(req, res, next) {
  console.log(
    `${moment().format("YYYY-MM-DD HH:mm:ss")}
    method: ${req.method}
     path:${req.path}
    `
  );
  next();
}
