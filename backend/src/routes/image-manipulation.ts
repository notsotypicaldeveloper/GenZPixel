import express  from "express";
import {body} from "express-validator";

import multer from "multer";
import path from 'path';
import sharp from "sharp";


const router = express.Router();

const storage = multer.diskStorage({
    destination: './uploads',

    filename: function(request, file, cb){

        // file === ::: {
        //     fieldname: 'uploadedImg',
        //     originalname: '5starmeme.jpg',
        //     encoding: '7bit',
        //     mimetype: 'image/jpeg'
        //   }

        console.log("file === :::", file);
        // path.extname(file.originalname)
        cb(null,Date.now() + "-" + file.originalname );
    }
})

const upload = multer({storage});

router.post('/upload', upload.single('uploadedImg'), (req: express.Request, res: express.Response) =>{
    try {

        console.log("req.file = ", req.file);

        // req.file =  {
        //     fieldname: 'uploadedImg',
        //     originalname: '5starmeme.jpg',
        //     encoding: '7bit',
        //     mimetype: 'image/jpeg',
        //     destination: './uploads',
        //     filename: '17321921685695starmeme.jpg.jpg',
        //     path: 'uploads\\17321921685695starmeme.jpg.jpg',
        //     size: 84010
        //   }

        if(!req.file) {
            res.status(400).json({message: "Image is missing. Kindly upload the image!", data: {}});
            return;
        }
        if(req.file.mimetype != "image/jpeg" && req.file.mimetype != "image/png" && req.file.mimetype != "image/jpg") {
            res.status(400).json({message: "Invalid Format. Only jpeg, png or jpg are allowed!", data: {}});
            return; 
        }
        res.status(200).json({message: "Image uploaded successfully!", data: {}});        
        return;
    }   
    catch(e: any) {

    }
})


router.post('/convert',
    [
        // body("imgName").exists().withMessage("imgName is missing"),
        // body('desiredFormat').exists().withMessage("desired format is missing")
    ], (req: express.Request, res: express.Response) =>{
    try {

        const {imgName, desiredFormat} = req.body;

        if(desiredFormat != 'jpg' &&  desiredFormat != 'png'){
            res.status(400).json({message: "Invalid Format!", data: {}});
            return;
        }
        
        // sharp('./images/robo.jpg')
        // .toFormat('png', {palette: true})
        // .toFile(__dirname + '/processed_images/format_robo.png')

        const sharp = require('sharp')

        // const cropImage = () => {
        //   sharp('./images/robo.jpg')
        //   .extract({left: 740, width: 500, height: 300, top: 340})
        //   .toFile(__dirname + '/processed_images/crop_robo.png')
        // }


        console.log(`imgName = ${imgName}`);

        sharp(`./uploads/${imgName}`).toFile(`./uploads/${path.basename(imgName)}.${desiredFormat}`);

        res.status(200).json({message: "File converted successfully!", data: {}});        
        return;

    }
    catch(e: any) {

    }
})

router.post('/edit', [
        body("imgName").exists().withMessage("imgName is missing"),
        // body("brightness"),
        // body("saturation"),
        // body("hue"),
        body("rotate")
    ] , (req: express.Request, res: express.Response) =>{
    try 
    {
        const {imgName, brightness, hue, saturation, rotate} = req.body;

        sharp(`./uploads/${imgName}`).rotate(rotate).toFile(`./uploads/` + "rotate-"+imgName);

        sharp(`./uploads/${imgName}`).resize(2000, 2000).toFile(`./uploads/` + "resize-"+imgName);

        // sharp(`./uploads/${imgName}`).modulate({ lightness: brightness  }).toFile(`./uploads/` + "manipulated-"+imgName);

        res.status(200).json({message: "File updated successfully!", data: {}});        
        return;
    }
    catch(e: any) {

    }
})
export {router as imageManipulationRouter}