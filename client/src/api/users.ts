import { createAxios } from "./base"
import { UserListQuery, User } from '/@/types/users';

const url = '/api/users'

export const loadAll = ({from, to}: UserListQuery) => {
  const data = {
    from: from || 0,
    to: to || 100,
  }
  return createAxios({
    url: url,
    method: 'get',
    data
  })
}
export const create = (user: Partial<User>) => {
  return createAxios({
    url: url,
    method: 'post',
    data: user,
  })
}
export const loadOne = (id: User['id']) => {
  return createAxios({
    url: url + '/' + id,
    method: 'get',
  })
}
export const update = (user: Partial<User>) => {
  return createAxios({
    url: url + '/' + user.id,
    method: 'post',
    data: user,
  })
}
export const remove = (id: User['id']) => {
  return createAxios({
    url: url + '/' + id,
    method: 'delete',
  })
}