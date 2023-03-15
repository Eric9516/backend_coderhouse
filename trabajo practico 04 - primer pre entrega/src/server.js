const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const routerProducts = require("./routes/routerProducts");

app.use("/products", routerProducts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.listen(PORT, () => {
	console.log(
		`Servidor escuchando en el puerto http://localhost:${PORT}/products`
	);
});

app.get("/*", (req, res) => {
	res.sendFile(`${__dirname}/public/paginaNoEncontrada.html`);
});
