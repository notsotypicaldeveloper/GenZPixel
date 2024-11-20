import express from "express";

const router = express.Router();

router.post('/upload', (req: express.Request, res: express.Response) =>{
    try {

        console.log(`upload image get hits`);
        
    }
    catch(e: any) {

    }
})

export {router as imageManipulationRouter}