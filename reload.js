const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld(
    'api', {
        // Aquí puedes exponer APIs personalizadas
    }
);
