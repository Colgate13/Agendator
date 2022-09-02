module.exports = {
  apps: [
    {
      name: 'agendator - Dev',
      script: './dist/server.js',
      env: {
        NODE_ENV: 'development',
        MULTPROCESS: false,
        DEBUG: 'app',
      },
    },
  ],
};
