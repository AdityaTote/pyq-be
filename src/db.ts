import mongoose, { Schema, model } from "mongoose";

const yearSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    sem: [{
        type: mongoose.Types.ObjectId,
        ref: "sem"
    }]
}, { timestamps: true })

const semSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subject: [{
        type: mongoose.Types.ObjectId,
        ref: "subject"
    }]
}, { timestamps: true })

const subjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    paper: [{
        type: mongoose.Types.ObjectId,
        ref: "paper"
    }]
}, { timestamps: true })

const paperSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
}, { timestamps: true })

export const Year = model("year", yearSchema)
export const Sem = model("sem", semSchema)
export const Subject = model("subject", subjectSchema)
export const Paper = model("paper", paperSchema)

export async function dbConnect(dbURI: string){
    try {
        await mongoose.connect(dbURI);
    } catch (e) {
        console.log(e)
        return;
    }
}