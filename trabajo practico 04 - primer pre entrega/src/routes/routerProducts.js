const express = require("express");
const { Router } = express;
const routerProducts = Router();
const ProductManager = require("../container/contenedor");
const productos = new ProductManager();

routerProducts.get("/", async (req, res) => {
	const { limit } = req.query;
	const products = await productos.getProducts();
	if (limit) {
		const nuevaLista = products.slice(0, +limit);
		console.log(nuevaLista);
		return res.json({ nuevaLista });
	}
	console.log(products);
	return res.json({ products });
});

routerProducts.get("/:id", async (req, res) => {
	const { id } = req.params;
	const product = await productos.getProductById(id);
	product
		? res.json({ product })
		: res.json({ error: true, msj: "Producto no encontrado" });
});

module.exports = routerProducts;

