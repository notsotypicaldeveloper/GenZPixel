import express, {Request, Response} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { apiRoutes } from "./routes";

const app = express();
const PORT= 3000;


// app.get('/', (req: Request, response: Response)=> {
//     response.status(200).send('Server is up and running!');
// })


app.use(cors());
app.use(cookieParser());
app.use(express.json());
// Use to parse form data
app.use(express.urlencoded(({extended: false})));

app.use(express.static('uploads'))

app.use('/api', apiRoutes);

app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})