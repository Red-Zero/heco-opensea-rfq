import * as config from "config";

export function getConfig(key) {
  return config[key];
}
