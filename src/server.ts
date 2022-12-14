import dotenv from 'dotenv';
import ServerHttp from './infra/http/server';

dotenv.config();

process.title = 'Agendator - server';

const serverHttp = new ServerHttp(process.env.PORT || '5000', !Boolean(process.env.MULTPROCESS));

serverHttp.init();

process.on('SIGTERM', () => {
  console.log('> Server ending after close all connections - ', new Date().toISOString());
  serverHttp.close(() => process.exit());
});

process.on('SIGINT', () => {
  console.log('> Server ending now! - ', new Date().toISOString());
  process.exit();
});
