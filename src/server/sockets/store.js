import Store from 'electron-store';
import express from 'express';
import expressWs from 'express-ws';
import { USERDATAPATH } from '../../utils/electron.js';
const app = express();
const wsInstance = expressWs(app);
const store = new Store({cwd: USERDATAPATH});

export const storeWs = wsInstance.app.ws('/store', (ws, req) => {
    ws.on('message', function(msg) {
        const data = JSON.parse(msg);
        if (data.type === 'set') {
            store.set(data.location, data.value);
            ws.send(data.value);
        } else if (data.type === 'get') {
            ws.send(store.get(data.location));
        }
      })
});

export default storeWs;