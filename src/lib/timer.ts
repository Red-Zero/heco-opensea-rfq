import * as schedule from "node-schedule";
//时间格式
// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)
// Execute a cron job every 5 Minutes = */5 * * * *
// 也支持对象格式
// second (0-59)
// minute (0-59)
// hour (0-23)
// date (1-31)
// month (0-11)
// year
// dayOfWeek (0-6) Starting with Sunday
// const option = {hour: 14, minute: 30, dayOfWeek: 0}

/**
 *
 * @param options  时间格式
 * @param func 需要执行的方法
 * @returns
 */
export function run(options, func) {
  const job = schedule.scheduleJob(options, func);
  return job;
}
export function cancel(job) {
  job.cancel();
}
