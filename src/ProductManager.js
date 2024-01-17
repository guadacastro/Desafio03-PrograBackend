const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      this.products = JSON.parse(data);
    } catch (error) {
     
      this.products = [];
    }
  }

  saveProducts() {
    const data = JSON.stringify(this.products, null, 2);
    fs.writeFileSync(this.path, data, 'utf8');
  }

  addProduct(product) {
    
    const newProduct = {
      id: this.products.length + 1,
      ...product
    };

    this.products.push(newProduct);
    this.saveProducts();
    console.log("Producto agregado correctamente:", newProduct);
  }

  getProducts() {
    this.loadProducts();
    return this.products;
  }

  getProductById(productId) {
    this.loadProducts();
    const product = this.products.find((p) => p.id === parseInt(productId, 10));
  
    if (product) {
      return product;
    } else {
      throw new Error("Producto no encontrado.");
    }
  }
  

  updateProduct(productId, updatedFields) {
    this.loadProducts();
    const productIndex = this.products.findIndex((p) => p.id === productId);

    if (productIndex !== -1) {
      
      this.products[productIndex] = { ...this.products[productIndex], ...updatedFields, id: productId };
      this.saveProducts();
      console.log("Producto actualizado correctamente:", this.products[productIndex]);
    } else {
      console.error("Producto no encontrado. No se puede actualizar.");
    }
  }

  deleteProduct(productId) {
    this.loadProducts();
    const initialLength = this.products.length;
    this.products = this.products.filter((p) => p.id !== productId);

    if (this.products.length < initialLength) {
      this.saveProducts();
      console.log("Producto eliminado correctamente.");
    } else {
      console.error("Producto no encontrado. No se puede eliminar.");
    }
  }
}

const productManager = new ProductManager('productos.json');

// Agregar un producto
productManager.addProduct({
  title: "Producto de prueba",
  description: "Este es un producto de prueba",
  price: 50,
  thumbnail: "imagen.jpg",
  code: "P001",
  stock: 10
});



module.exports = ProductManager;
