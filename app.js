class ProductManager {
	constructor() {
		this.products = [];
	}

	getProducts = () => {
		return this.products;
	};

	addProduct = (title, description, price, thumbnail, code, stock) => {
		let codigo = this.products.find((n) => n.code == code);
		if (codigo) throw new Error("Ya existe un producto con ese código");
		else {
			let product = {
				title: title,
				description: description,
				price: price,
				thumbnail: thumbnail,
				code: code,
				stock: stock,
				id: this.products.length + 1,
			};
			return this.products.push(product);
		}
	};

	getProductById = (num) => {
		let producto = this.products.find((n) => n.id == num);
		return producto
			? { success: true, Producto: producto }
			: { error: true, msj: "Producto no encontrado" };
	};
}

const product = new ProductManager();

product.addProduct("Telefono", "Samsung", 700, "no hay", 150, 4);
product.addProduct("Notebook", "HP", 450, "no hay", 570, 2);

console.log(product.getProducts());
console.log(product.getProductById(1));
