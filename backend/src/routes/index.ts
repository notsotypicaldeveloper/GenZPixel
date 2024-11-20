import * as express from 'express';
import {imageManipulationRouter} from "./image-manipulation";

let apiRoutes = express.Router();

apiRoutes.use('/image-manipulation', imageManipulationRouter);

export { apiRoutes }
