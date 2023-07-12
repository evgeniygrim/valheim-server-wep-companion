import { createAxios } from "./base";

const statusUrl = '/status';
export const modsUrl = '/mods';
export const plugins = '/plugins.zip';

export const getStatus = () => {
  return createAxios({
    method: 'get',
    url: statusUrl,
  })
}

export const getMods = () => {
  return createAxios({
    method: 'get',
    url: modsUrl
  })
}

export const loadMods = () => {
  return createAxios({
    method: 'get',
    url: modsUrl + plugins,
  })
}