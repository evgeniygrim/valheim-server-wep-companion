import {createAxios} from '/@/api/base';


export const getStatus = () => {
  return createAxios({
    method: 'get',
    url: '/supervisor'
  }).then((res) => console.warn(res));
}