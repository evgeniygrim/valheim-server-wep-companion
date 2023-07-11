import { Request, Response } from 'express';

export const getParams = <T>(request: Request): T => {
  return request.params as T
}

export const getBody = <T>(request: Request): T => {
  return request.body as T
}

export const getQuery = <T>(request: Request): T => {
  return request.query as T
}