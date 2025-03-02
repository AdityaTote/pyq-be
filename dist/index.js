"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
dotenv_1.default.config();
const port = process.env.PORT || 3030;
const dbURI = process.env.DATABASE_URI;
const app = (0, express_1.default)();
// middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// routes
app.get("/year", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const years = yield db_1.Year.find();
        if (!years) {
            res.status(404).json({
                status: "failed",
                message: "No content found"
            });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "content fetched successfully",
            data: years
        });
        return;
    }
    catch (e) {
        console.log(e);
    }
}));
app.get("/year/:yearId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { yearId } = req.params;
        if (!yearId) {
            res.status(409).json({
                status: "failed",
                message: "yearId is required"
            });
        }
        const sems = yield db_1.Year.findById({ _id: yearId }).populate("sem");
        if (!sems) {
            res.status(404).json({
                status: "failed",
                message: "No content found"
            });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "content fetched successfully",
            data: sems
        });
        return;
    }
    catch (e) {
        console.log(e);
        return;
    }
}));
app.get("/sem/:semId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { semId } = req.params;
        if (!semId) {
            res.status(409).json({
                status: "failed",
                message: "yearId is required"
            });
        }
        const subjects = yield db_1.Sem.findById({ _id: semId }).populate("subject");
        if (!subjects) {
            res.status(404).json({
                status: "failed",
                message: "No content found"
            });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "content fetched successfully",
            data: subjects
        });
        return;
    }
    catch (e) {
        console.log(e);
    }
}));
app.get("/sub/:subId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { subId } = req.params;
        if (!subId) {
            res.status(409).json({
                status: "failed",
                message: "yearId is required"
            });
        }
        const papers = yield db_1.Subject.findById({ _id: subId }).populate("paper");
        if (!papers) {
            res.status(404).json({
                status: "failed",
                message: "No content found"
            });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "content fetched successfully",
            data: papers
        });
        return;
    }
    catch (e) {
        console.log(e);
    }
}));
app.get("/paper/:paperId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paperId } = req.params;
        if (!paperId) {
            res.status(409).json({
                status: "failed",
                message: "yearId is required"
            });
        }
        const paper = yield db_1.Paper.findById({ _id: paperId });
        if (!paper) {
            res.status(404).json({
                status: "failed",
                message: "No content found"
            });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "content fetched successfully",
            data: paper
        });
        return;
    }
    catch (e) {
        console.log(e);
    }
}));
app.get("/sem", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sems = yield db_1.Sem.find();
        if (!sems) {
            res.status(404).json({
                status: "failed",
                message: "No content found"
            });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "content fetched successfully",
            data: sems
        });
        return;
    }
    catch (e) {
        console.log(e);
    }
}));
app.get("/sub", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subs = yield db_1.Subject.find();
        if (!subs) {
            res.status(404).json({
                status: "failed",
                message: "No content found"
            });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "content fetched successfully",
            data: subs
        });
        return;
    }
    catch (e) {
        console.log(e);
    }
}));
app.get("/paper", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const papers = yield db_1.Paper.find();
        if (!papers) {
            res.status(404).json({
                status: "failed",
                message: "No content found"
            });
            return;
        }
        res.status(200).json({
            status: "success",
            message: "content fetched successfully",
            data: papers
        });
        return;
    }
    catch (e) {
        console.log(e);
    }
}));
// servering
(0, db_1.dbConnect)(dbURI).then(() => {
    console.log("Database Uri");
    app.listen(port, () => {
        console.log(`Server is listening on: ${port}`);
    });
}).catch((e) => {
    console.log(e || "error in db connection");
});
