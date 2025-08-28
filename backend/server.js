import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ---------------- Setup __dirname for ES Modules ----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Serve Images
app.use("/Images", express.static(path.join(__dirname, "Images"))); // folder where images are present

// ---------------- MongoDB Connection ----------------
mongoose
  .connect("mongodb+srv://mahadevkkawane7:JIafx1mimFAJD4Ii@cluster0.lkfn5tf.mongodb.net/productdb?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ---------------- Schemas ----------------

// Product Schema
const productSchema = new mongoose.Schema({
  productId: { type: Number, unique: true }, // product id
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: String,
  price: Number,
});
const Product = mongoose.model("Product", productSchema);

// Cart Schema
const cartSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  productName: String,
  description: String,
  image: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});
const Cart = mongoose.model("Cart", cartSchema);

// Checkout Schema
const checkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const Checkout = mongoose.model("Checkout", checkoutSchema);



// ---------------- Routes ----------------

// Get all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find(); // find() method to get data from database
    res.json(products); // response in JSON format
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Get product by ID
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let product = !isNaN(id)
      ? await Product.findOne({ productId: Number(id) })
      : await Product.findById(id); // get product using id

    if (!product) return res.status(404).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
});

// Add item to cart (update quantity if exists)
app.post("/api/cart", async (req, res) => {
  try {
    const { productId, productName, description, image, price, quantity } = req.body;

    // Check if item already exists
    let existingItem = await Cart.findOne({ productId });

    if (existingItem) {
      existingItem.quantity += Number(quantity); // increment quantity
      await existingItem.save();
      res.json({ message: "Quantity updated in cart" });
    } else {
      // if item doesn't exist, create a new cart item
      const cartItem = new Cart({ productId, productName, description, image, price, quantity });
      await cartItem.save();
      res.json({ message: "Added to cart" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// Get cart items
app.get("/api/cart", async (req, res) => {
  try {
    const items = await Cart.find().select("_id productName description image price quantity");
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Remove item from cart
app.delete("/api/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Cart.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "Cart item not found" });
    res.json({ message: "Cart item removed" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
});

// Save checkout details
app.post("/api/checkout", async (req, res) => {
  try {
    const { Name, Address, Phone } = req.body; // keys from frontend form

    const checkout = new Checkout({
      name: Name,
      address: Address,
      phone: Phone,
    });

    await checkout.save();
    res.json({ message: "Checkout saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save checkout" });
  }
});

// ---------------- Server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));

