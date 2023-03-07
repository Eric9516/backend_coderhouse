const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const ProductManager = require("./container/contenedor");
const productos = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});

app.get("/products", async (req, res) => {
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

app.get("/products/:id", async (req, res) => {
	const { id } = req.params;
	const product = await productos.getProductById(id);
	product
		? res.json({ product })
		: res.json({ error: true, msj: "Producto no encontrado" });
});
