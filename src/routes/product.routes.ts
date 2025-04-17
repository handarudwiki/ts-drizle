import express from "express";
import ProductHandler from "../handlers/product.handler";


const router = express.Router();

router.get("/", ProductHandler.findAll);
router.get("/:id", ProductHandler.findById);
router.post("/", ProductHandler.create);
router.put("/:id", ProductHandler.update);
router.delete("/:id", ProductHandler.delete);


export default router

