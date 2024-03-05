import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import { HttpStatusInfo } from "./http-status-info";

function getTrace() {
  return crypto.randomUUID();
}

export function requestStart(req: Request, _res: Response, next: NextFunction) {
  const trace = getTrace();
  const start = process.hrtime();
  const now = new Date();
  const timeLapse = {
    started: now.toISOString(),
    ended: null,
    duration: null,
  };
  Object.assign(req, { trace, timeLapse, start });
  next();
}

export function requestEnd(
  result: Error | Record<string, JSON>,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const timeLapse = req.timeLapse ?? {};
  const start = req.start;
  timeLapse.ended = new Date().toISOString();
  timeLapse.duration = getDurationInMilliseconds(start);

  if (result instanceof Error) {
    const response = {
      success: false,
      kindMessage: result.message,
      stack: result.stack,
      trace: req.trace,
      timeLapse,
    };
    res.status(HttpStatusInfo.INTERNAL_SERVER_ERROR.code).json(response);
  } else {
    const { httpCode } = result;
    delete result.httpCode;
    res.status(Number(httpCode) || HttpStatusInfo.OK.code).json({
      ...result,
      trace: req.trace,
      timeLapse
    });
  }
  next();
}

export function requestNotFound(_req: Request, res: Response) {
  res.status(HttpStatusInfo.NOT_FOUND.code).json({
      success: false,
      kindMessage: HttpStatusInfo.NOT_FOUND.response
  });
}

function getDurationInMilliseconds(start?: [number, number]) {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);

  return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
}
