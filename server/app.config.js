module.exports = {
  apps : [
    {
      name      : "grimheim",
      script    : "./dist/index.js",
      instances : "1",
      max_memory_restart: "250M",
      autorestart: true,
      watching: true,
      exec_mode: 'fork',
      env: {
        NODE_ENV: "production",
        PORT: 80,
        SERVER_STATE: '/grimheim/data/htdocs/status.json',
        SERVER_MODS: '/grimheim/config/bepinex/plugins',
        SERVER_CONTAINER: '/grimheim-valheim-1',
      }
    }
  ]
}
