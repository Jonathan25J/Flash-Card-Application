import ejs from 'ejs';
import express from 'express';
import expressWs from 'express-ws';
import path from 'path';
import { USERDATAPATH } from '../utils/electron.js';
import { PORT } from '../utils/port.js';
import { pathService } from './services/data/pathService.js';
import storeWs from './sockets/store.js';

const app = express()
expressWs(app)

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use(storeWs)

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.set('views', path.join(path.resolve(), 'resources/website'));
app.use(express.static(path.join(path.resolve(), 'resources/website')));
app.use(express.static(path.join(USERDATAPATH, 'data')));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

import rootRouter from "./routes/index.js";
import profileRouter from "./routes/profile/profile.js";

app.use("/", rootRouter)
app.use("/profile", profileRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

pathService.initializeProfilesPathIfNeeded();

export default app;