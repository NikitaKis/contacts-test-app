module.exports = {
  apps: [
    {
      name: 'contact-api',
      script: 'dist/index.js',
      instances: 1,
      autorestart: true,
      max_memory_restart: '1G',
    },
  ],
};
