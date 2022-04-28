"use strict";

import * as Redis from "ioredis";
import { getConfig } from "../config/index";

const config = getConfig("redis");
const redis =
  config.length == 1 ? new Redis(config[0]) : new Redis.Cluster(config);
console.log("redis link success ");
export default redis;
export async function ClusterDel(key) {
  const masters = redis.nodes("master");
  await Promise.all(
    masters.map(async (node) => {
      try {
        await node.del(key);
      } catch (error) {
        // 当key在另外的节点上，会报如下错误：”MOVED 7767 10.76.230.153:6380“
        if (error.message.indexOf("MOVED") === -1) {
          throw error;
        }
      }
    })
  );
}
