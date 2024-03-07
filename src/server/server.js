import ejs from 'ejs';
import express from 'express';
import path from 'path';
import { USERDATAPATH } from '../utils/electron.js';
import { PORT } from '../utils/port.js';

const app = express()

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.set('views', path.join(path.resolve(), 'resources/website'));
app.use(express.static(path.join(path.resolve(), 'resources/website')));
app.use(express.static(path.join(USERDATAPATH, 'data')));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

import profileRouter from "./routes/profile.js";
import rootRouter from "./routes/root.js";

app.use("/", rootRouter)
app.use("/profile", profileRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

export default app;