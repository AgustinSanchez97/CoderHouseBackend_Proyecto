import {Router } from "express"
import cartManager from "../src/CartManager.js"
import productManager from "../src/ProductManager.js"

const router = Router()

router.post("/" ,(req,res) => {
    
    cartManager.addCart()
    const carts = cartManager.getCarts()
    let allCarts = [...carts]
        
    const cartAdded = allCarts.find(cart => cart.id === allCarts.length-1)
    res.status(201).json({info: "Created", cartAdded})

})

router.get("/:cid" ,(req,res) => {
    const{cid} = req.params
    const cart = cartManager.getCartById(parseInt(cid))


    if(!cart) return res.status(404).json({info: "NotFound"})
    res.status(302).json({info: "Found", cart})
})

router.post("/:cid/product/:pid" ,(req,res) => {
    const{cid} = req.params
    const{pid} = req.params
    const allProducts = productManager.getProducts()

    const cart = cartManager.getCartById(parseInt(cid))
    if(!cart) return res.status(404).json({info: "NotFound"})
    if(parseInt(pid) > allProducts.length -1 || parseInt(pid) < 0) return res.status(201).json({info: "one or more products ID exceed the range of IDs in products"})
    
    cartManager.addProductsToCart(parseInt(cid),parseInt(pid))    
    
    res.status(202).json({info: "Product Modified", cart})

})

export default router