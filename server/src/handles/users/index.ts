import { UserListQuery, User } from "../../types/users/index";
import { Request, Response } from "express";
import {getParams, getBody, getQuery} from '../../utils/request';
import UserService from "../../services/users";

const getAll = async (req: Request, res: Response) => {
  const params = getQuery<UserListQuery>(req);

  try {
    const users = await UserService.getAll(params);
    res.status(200).send(JSON.stringify(users));
  } catch (err: any) {
    res.status(err?.code || 500).send("internal error");
  }
};
const get = async (req: Request, res: Response) => {
  const params = getParams<Partial<User>>(req);

  try {
    const user = await UserService.get(params.id || "");
    res.status(200).send(JSON.stringify(user));
  } catch (err: any) {
    res.status(err?.code || 500).send("internal error");
  }
};
const create = async (req: Request, res: Response) => {
  const data = getBody<Partial<User>>(req);

  try {
    const user = await UserService.create(data);
    res.status(200).send(JSON.stringify(user));
  } catch (err: any) {
    res.status(err?.code || 500).send("internal error");
  }
};
const update = async (req: Request, res: Response) => {
  const data = getBody<Partial<User>>(req);
  const params = getParams<Partial<User>>(req);

  try {
    const user = await UserService.update({...data, ...params});
    res.status(200).send(JSON.stringify(user));
  } catch (err: any) {
    res.status(err?.code || 500).send("internal error");
  }
};
const remove = async (req: Request, res: Response) => {
  const data = getParams<Partial<User>>(req);

  try {
    await UserService.remove(data.id || "");
    res.status(200).send(JSON.stringify(data.id));
  } catch (err: any) {
    res.status(err?.code || 500).send("internal error");
  }
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
