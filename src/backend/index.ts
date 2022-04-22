import "reflect-metadata";

import type * as http from "http";

import type { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import type { NextApiHandler } from "next";

import { AppModule } from "./app/app.module";

export class Backend {
  private static app: INestApplication;

  private constructor() {}

  public static async getApp(): Promise<INestApplication> {
    if (this.app) return this.app;

    this.app = await NestFactory.create(AppModule, { bodyParser: false });
    this.app.setGlobalPrefix("api");

    await this.app.init();

    return this.app;  
  }

  public static async getListener(): Promise<NextApiHandler> {
    const app = await this.getApp();
  
    const server: http.Server = app.getHttpServer();
    const [listener] = server.listeners("request") as NextApiHandler[];
  
    return listener;
  }
}
