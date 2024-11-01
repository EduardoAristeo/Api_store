const Product = require('../models/Product');
const Supplier = require('../models/supplier');
const SupProd = require('../models/sup_prod'); // Importa el modelo de la colección sup_prod

// Obtener todos los productos
const fetchAll = async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch (error) {
        res.status(500).send("Error fetching products");
    }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.send(product);
    } catch (error) {
        res.status(500).send("Error creating product");
    }
};

// Actualizar un producto por ID
const findByIdAndUpdate = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).send("Product not found");
        res.send(product);
    } catch (error) {
        res.status(500).send("Error updating product");
    }
};

// Eliminar un producto por ID
const findByIdAndRemove = async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.id);
        if (!product) return res.status(404).send("Product not found");
        res.status(200).send("Product eliminated");
    } catch (error) {
        res.status(500).send("Error deleting product");
    }
};

// Obtener productos por proveedor
const fetchProductsByProvider = async (req, res) => {
    try {
        const providerId = req.params.id;

        // Encuentra el proveedor por su ID
        const provider = await Supplier.findById(providerId);
        if (!provider) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        // Busca todas las relaciones en sup_prod para el proveedor
        const supProdRelations = await SupProd.find({ Supplier: providerId });

        // Extrae los IDs de los productos de las relaciones
        const productIds = supProdRelations.map(rel => rel.Product);

        // Busca todos los productos asociados a los IDs encontrados
        const products = await Product.find({ _id: { $in: productIds } });

        // Devuelve el proveedor y sus productos
        res.json({ provider, products });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos del proveedor", error });
    }
};

module.exports = {
    fetchAll,
    createProduct,
    findByIdAndUpdate,
    findByIdAndRemove,
    fetchProductsByProvider
};
