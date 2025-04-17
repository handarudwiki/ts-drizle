import { relations } from "drizzle-orm";
import { decimal, numeric, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import {  varchar } from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const product = pgTable("products", {
    id: serial().primaryKey(),
    name: varchar({length: 255}).notNull(),
    description: varchar({length: 255}).notNull(),
    price: numeric({precision: 10, scale:2}).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const order = pgTable("orders", {
    id: serial().primaryKey(),
    productId: integer("product_id").notNull().references(() => product.id, {
        onDelete: "cascade",}),
    quantity: integer().notNull(),
    total_price : decimal({precision: 10, scale:2}).notNull(),
    created_at: timestamp("created_at").notNull().defaultNow(),
    updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const orderRelation = relations(order, ({ one }) => ({
    product: one(product, {
        fields: [order.productId],
        references: [product.id],
    }),
}));

export const productRelation = relations(product, ({ many }) => ({
    orders: many(order),
}));

export type InsertProduct = InferInsertModel<typeof product>;
export type SelectProduct = InferSelectModel<typeof product>;

export type InsertOrder = InferInsertModel<typeof order>;
export type SelectOrder = InferSelectModel<typeof order>;