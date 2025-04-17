import { Router } from "express";
import OrderHandler from "../handlers/order.handler";

const router = Router();

/** 
    * @swagger
    * tags:
    *   name: Orders
    *   description: Order management
    */ 

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags:
 *       - Orders
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *                 description: ID of the product
 *               quantity:
 *                 type: integer
 *                 description: Quantity of the product
 *             required:
 *               - product_id
 *               - quantity
 *     responses:
 *       201:
 *         description: The created order object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 order_id:
 *                   type: integer
 *                   description: ID of the created order
 *                 product_id:
 *                   type: integer
 *                   description: ID of the product
 *                 quantity:
 *                   type: integer
 *                   description: Quantity of the product
 *                 status:
 *                   type: string
 *                   description: Status of the order
 */
router.post("/", OrderHandler.create);


/**
    * @swagger
    * /orders:
    *   get:
    *     summary: Get all orders
    *     tags:
    *       - Orders
    *     responses:
    *       200:
    *         description: A list of orders
    *         content:
    *           application/json:
    *             schema:
    *               type: array
    *               items:
    *                 type: object
    *                 properties:
    *                   id:
    *                     type: integer
    *                   productId:
    *                     type: integer
    *                   quantity:
    *                     type: integer
    *                   total_price:
    *                     type: number
    *       500:
    *         description: Internal server error
*/
router.get("/", OrderHandler.findAll);

/**
    * @swagger
    * /orders/{id}:
    *   get:
    *     summary: Get an order by ID
    *     tags:
    *       - Orders
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: The ID of the order to retrieve
    *         schema:
    *           type: integer
    *     responses:
    *       200:
    *         description: A single order object
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 id:
    *                   type: integer
    *                 productId:
    *                   type: integer
    *                 quantity:
    *                   type: integer
    *                 total_price:
    *                   type: number
*/
router.get("/:id", OrderHandler.findById);


/**
    * @swagger
    * /orders/{id}:
    *   put:
    *     summary: Update an order by ID
    *     tags:
    *       - Orders
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: The ID of the order to update
    *         schema:
    *           type: integer
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               product_id:
    *                 type: integer
    *               quantity:
    *                 type: integer
    *     responses:
    *       200:
    *         description: The updated order object
*/
router.put("/:id", OrderHandler.update);

/**
    * @swagger
    * /orders/{id}:
    *   delete:
    *     summary: Delete an order by ID
    *     tags:
    *       - Orders
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         description: The ID of the order to delete
    *         schema:
    *           type: integer
    *     responses:
    *       200:
    *         description: The deleted order object
    *       404:
    *         description: Order not found
*/
router.delete("/:id", OrderHandler.delete);

/**
    * @swagger
    * /orders/product/{productId}:
    *   get:
    *     summary: Get orders by product ID
    *     tags:
    *       - Orders
    *     parameters:
    *       - in: path
    *         name: productId
    *         required: true
    *         description: The ID of the product to retrieve orders for
    *         schema:
    *           type: integer
    *     responses:
    *       200:
    *         description: A list of orders for the specified product
    *       500:
    *         description: Internal server error
*/
router.get("/product/:productId", OrderHandler.findByProduct);

export default router;