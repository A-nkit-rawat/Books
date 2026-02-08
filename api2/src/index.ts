import express from 'express'
import { abc } from './controllers/test';

const app= express();
app.use(express.json());
app.use("/api",abc);
app.listen(3000)