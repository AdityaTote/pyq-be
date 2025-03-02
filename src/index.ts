import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnect, Paper, Sem, Subject, Year } from "./db";

dotenv.config();

const port = process.env.PORT || 3030;
const dbURI = process.env.DATABASE_URI as string;

const app = express();

// middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.get("/year", async(req: Request, res: Response) => {
    try {
        const years = await Year.find();
        if(!years){
            res.status(404).json({
                status: "failed",
                message: "No content found"
            })
            return;
        }
        res.status(200).json({
            status: "success",
            message: "content fetched successfully",
            data: years
        })
        return;
    } catch (e) {
        console.log(e)
    }
})

app.get("/year/:yearId", async(req: Request, res: Response) => {
   try {
     const { yearId } = req.params;
     if(!yearId){
         res.status(409).json({
             status: "failed",
             message: "yearId is required"
         })
     }
     const sems = await Year.findById({ _id: yearId }).populate("sem")
     if(!sems){
         res.status(404).json({
             status: "failed",
             message: "No content found"
         })
         return;
     }
     res.status(200).json({
         status: "success",
         message: "content fetched successfully",
         data: sems
     })
     return;
   } catch (e) {
    console.log(e);
    return;
   }
})

app.get("/sem/:semId", async(req: Request, res: Response) => {
    try {
        const { semId } = req.params;
        if(!semId){
            res.status(409).json({
                status: "failed",
                message: "yearId is required"
            })
        }
        const subjects = await Sem.findById({ _id: semId }).populate("subject")
        if(!subjects){
            res.status(404).json({
                status: "failed",
                message: "No content found"
            })
            return;
        }
        res.status(200).json({
            status: "success",
            message: "content fetched successfully",
            data: subjects
        })
        return;
    } catch (e) {
        console.log(e);
    }
})

app.get("/sub/:subId", async(req: Request, res: Response) => {
    try {
        const { subId } = req.params;
        if(!subId){
            res.status(409).json({
                status: "failed",
                message: "yearId is required"
            })
        }
        const papers = await Subject.findById({ _id: subId }).populate("paper")
        if(!papers){
            res.status(404).json({
                status: "failed",
                message: "No content found"
            })
            return;
        }
        res.status(200).json({
            status: "success",
            message: "content fetched successfully",
            data: papers
        })
        return;
    } catch (e) {
        console.log(e);
    }
})

app.get("/paper/:paperId", async(req: Request, res: Response) => {
    try {
        const { paperId } = req.params;

        if(!paperId){
            res.status(409).json({
                status: "failed",
                message: "yearId is required"
            })
        }
        const paper = await Paper.findById({ _id: paperId })
        if(!paper){
            res.status(404).json({
                status: "failed",
                message: "No content found"
            })
            return;
        }
        res.status(200).json({
            status: "success",
            message: "content fetched successfully",
            data: paper
        })
        return;
    } catch (e) {
        console.log(e);
    }
})

app.get("/sem", async(req: Request, res: Response) => {
    try {
        const sems = await Sem.find();
        if(!sems){
            res.status(404).json({
                status: "failed",
                message: "No content found"
            })
            return;
        }
        res.status(200).json({
            status: "success",
            message: "content fetched successfully",
            data: sems
        })
        return;
    } catch (e) {
        console.log(e)
    }
})

app.get("/sub", async(req: Request, res: Response) => {
    try {
        const subs = await Subject.find();
        if(!subs){
            res.status(404).json({
                status: "failed",
                message: "No content found"
            })
            return;
        }
        res.status(200).json({
            status: "success",
            message: "content fetched successfully",
            data: subs
        })
        return;
    } catch (e) {
        console.log(e)
    }
})

app.get("/paper", async(req: Request, res: Response) => {
    try {
        const papers = await Paper.find();
        if(!papers){
            res.status(404).json({
                status: "failed",
                message: "No content found"
            })
            return;
        }
        res.status(200).json({
            status: "success",
            message: "content fetched successfully",
            data: papers
        })
        return;
    } catch (e) {
        console.log(e)
    }
})

// servering
dbConnect(dbURI).then(() => {
    console.log("Database Uri")
    app.listen(port, () => {
        console.log(`Server is listening on: ${port}`)
    })
}).catch((e) => {
    console.log(e || "error in db connection")
})