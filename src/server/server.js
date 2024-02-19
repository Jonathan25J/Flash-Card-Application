import ejs from 'ejs';
import express from 'express';
import path from 'path';
import { PORT } from '../utils/port.js';

const app = express()

app.set('views', path.join(path.resolve(), 'build/views'));
app.use(express.static('build/views'));
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

import rootRouter from "./routes/root.js";

app.use("/", rootRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

export default app;