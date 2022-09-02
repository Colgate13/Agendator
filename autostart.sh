npm run build
npm run prisma:deploy
MULTPROCESS=false DEBUG=app pm2 start dist/server.js