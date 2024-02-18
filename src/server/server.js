import ejs from 'ejs';
import express from 'express';
import path from 'path';
import { PORT } from '../utils/port.js';

const app = express()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})

app.set('views', path.join(path.resolve(), 'public/views'));
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

import rootRouter from "./routes/root.js";

app.use("/", rootRouter)

export default app;