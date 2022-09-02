module.exports = {
  apps: [
    {
      name: 'agendator - Server',
      script: './dist/server.js',
      instances: 'max',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
