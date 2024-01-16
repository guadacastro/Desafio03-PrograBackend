const express = require('express');
const app = express();
const ProductManager = require('./ProductManager.js'); // Asegúrate de ajustar la ruta según la ubicación de tu archivo ProductManager

const productManager = new ProductManager('productos.json');

app.get('/products', async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, parseInt(limit, 10));
      return res.json(limitedProducts);
    }

    return res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productManager.getProductById(id);

    if (product) {
      return res.json(product);
    }

    return res.status(404).json({ error: 'Producto no encontrado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener producto por ID' });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
