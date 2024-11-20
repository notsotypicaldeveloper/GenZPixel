import express, {Request, Response} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { apiRoutes } from "./routes";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());




const PORT= 3000;


app.get('/', (req: Request, response: Response)=> {
    response.status(200).send('Server is up and running!');
})

app.use('/api', apiRoutes);

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})