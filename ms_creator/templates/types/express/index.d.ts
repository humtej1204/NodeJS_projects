import express from "express";

declare global {
  namespace Express {
    interface Request {
        trace: string;
        timeLapse: {
            started: string;
            ended: string;
            duration: number;
        };
        start: [number, number];
    }
  }
}