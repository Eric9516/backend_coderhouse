const fs = require("fs");

class ProductManager {
    constructor() {
        this.path = "productos.json";
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

    addProduct = async (product) => {
        try {
            const files = await this.getProducts();
            product.id = files.length + 1;
            let newProducts = [...files, product];
            await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
        } catch (error) {
            console.log(error);
        }
    };

    getProductById = async (id) => {
        try {
            const products = await this.getProducts();
            let producto = products.find((prod) => prod.id == id);
            return producto
                ? console.log({ success: true, Producto: producto })
                : console.log({ error: true, msj: "Producto no encontrado" });
        } catch (error) {
            console.log(error);
        }
    };

    updateProduct = async (id, title, description, price, thumbnail, code, stock) => {
        try {
            const products = await this.getProducts();
            let producto = products.find((prod) => prod.id == id);
            if (!producto) console.log({ error: true, msj: "Producto no encontrado" });
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
            if (!producto) return console.log({ error: true, msj: "Producto no encontrado" });
            const eliminarProducto = products.filter((prod) => prod.id != id);
            fs.promises.writeFile(this.path, JSON.stringify(eliminarProducto));
            console.log({ success: true, msj: "Producto borrado" });
        } catch (error) {
            console.log(error);
        }
    };
}

const product = new ProductManager();

const products = async () => {
    await product.addProduct({
        title: "Teclado",
        description: "Redragon",
        price: 15000,
        thumbnail: "no hay",
        code: 1001,
        stock: 7,
    });
    await product.addProduct({
        title: "Monitor",
        description: "Samsung",
        price: 50000,
        thumbnail: "no hay",
        code: 1002,
        stock: 3,
    });
    await product.addProduct({
        title: "Mouse",
        description: "Logitech",
        price: 3500,
        thumbnail: "no hay",
        code: 1003,
        stock: 8,
    });
};

// product.updateProduct(5, "Teclado", "Redragon", 20000, "no hay", 1002, 5);

// product.deleteProduct(6);
// product.getProductById(6);

// products(); //funcion para agregar los productos
