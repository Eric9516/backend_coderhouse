const fs = require("fs");

class ProductManager {
	constructor() {
		this.path = "./src/db/productos.json";
	}
	getProducts = async () => {
		try {
			const file = await fs.promises.readFile(this.path, "utf-8");
			if (file.length === 0) return [];
			else {
				const products = JSON.parse(file);
				return products;
			}
		} catch (error) {
			console.log(error);
		}
	};

	addProduct = async (title, description, price, thumbnail, code, stock) => {
		try {
			const files = await this.getProducts();
			const codigo = files.find((prod) => prod.code === code);
			if (codigo) throw new Error("Ya existe un producto con ese código");
			else {
				let product = {
					title: title,
					description: description,
					price: price,
					thumbnail: thumbnail,
					code: code,
					stock: stock,
					id: files.length + 1,
				};
				let newProducts = [...files, product];
				console.log(product);
				return await fs.promises.writeFile(
					this.path,
					JSON.stringify(newProducts)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};

	getProductById = async (id) => {
		try {
			const products = await this.getProducts();
			let producto = products.find((prod) => prod.id == id);
			if (producto) {
				console.log(producto);
				return producto;
			}
			console.log({ error: true, msj: "Producto no encontrado" });
		} catch (error) {
			console.log(error);
		}
	};

	updateProduct = async (
		id,
		title,
		description,
		price,
		thumbnail,
		code,
		stock
	) => {
		try {
			const products = await this.getProducts();
			let producto = products.find((prod) => prod.id == id);
			if (!producto)
				console.log({ error: true, msj: "Producto no encontrado" });
			else {
				producto.title = title;
				producto.description = description;
				producto.price = price;
				producto.thumbnail = thumbnail;
				producto.code = code;
				producto.stock = stock;
				await fs.promises.writeFile(this.path, JSON.stringify(products));
				return console.log(producto);
			}
		} catch (error) {
			console.log(error);
		}
	};

	deleteProduct = async (id) => {
		try {
			const products = await this.getProducts();
			let producto = products.find((prod) => prod.id == id);
			if (!producto)
				return console.log({ error: true, msj: "Producto no encontrado" });
			const eliminarProducto = products.filter((prod) => prod.id != id);
			fs.promises.writeFile(this.path, JSON.stringify(eliminarProducto));
			console.log({ success: true, msj: "Producto borrado" });
		} catch (error) {
			console.log(error);
		}
	};
}

module.exports = ProductManager;
