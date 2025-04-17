import { Router } from "express";
import OrderHandler from "../handlers/order.handler";

const router = Router();

router.get("/", OrderHandler.findAll);
router.get("/:id", OrderHandler.findById);
router.post("/", OrderHandler.create);
router.put("/:id", OrderHandler.update);
router.delete("/:id", OrderHandler.delete);
router.get("/product/:productId", OrderHandler.findByProduct);

export default router;