import ejs from 'ejs';
import express from 'express';
import path from 'path';
import { PORT } from '../utils/port.js';

const app = express()

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.set('views', path.join(path.resolve(), 'resources/website'));
app.use(express.static(path.join(path.resolve(), 'resources/website')));
app.use(express.static(path.join(path.resolve(), 'resources/data')));
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