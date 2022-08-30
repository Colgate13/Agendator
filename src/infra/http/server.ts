import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cluster from 'cluster';
import * as http from 'http';
import routes from './routes/index';
import ProcessController from '../process/Controller';
import { AppError } from '../../shared/Error/AppError';
import Debug from 'debug';

class ServerHttp {
  public debug = Debug("http");
  protected app;
  public multiProcess = true;
  protected server;

  constructor(port: number | string, multiProcess = true) {
    this.multiProcess = multiProcess;
    this.app = express();
    this.server = http.createServer(this.app);
    this.start(port);
  }

  init() {
    this.app.routes;
  }

  start(port: number | string) {
    if (cluster.isPrimary && this.multiProcess) {
      ProcessController.PrimaryProcess();
    } else {
      this.middlerwares();
      this.routes();
      this.middlewareHandlerErrors();
      this.server.listen(port, () => {
        console.log(`Server started on port ${port}`);
      });
    }
  }

  routes() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(routes);
  }

  middlerwares() {
    this.app.use((request: Request, response: Response, _next: NextFunction) => {
      request.debug = this.debug;
      request.debug(`> ${request.path} -> Acess`);
      _next();
    });
  }

  middlewareHandlerErrors() {
    this.app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
      this.debug(err)
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          status: 'error',
          message: err.message,
        });
      }
      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    });
  }

  close(callback: () => void) {
    this.server.close(callback);
  }
}
export default ServerHttp;
