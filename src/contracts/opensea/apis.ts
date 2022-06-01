import { getConfig } from '@config/index';
import axios from 'axios';

export async function getUserBalance(owner, offset, limit) {
  const host = getConfig('host')['opensea'];
  const res = await axios.get(`${host}assets`, {
    params: {
      owner,
      offset,
      limit,
    },
  });

  return res.data.assets;
}
