import {Router } from "express"
import productManager from "../src/ProductManager.js"


const router = Router()

router.get("/", (req,res) => {
    
    const {limit} = req.query    
    const allProducts = productManager.getProducts()    
    let productsToShow = [...allProducts]    
    if (limit > 0) productsToShow = productsToShow.slice(0,limit)
    
    res.json(productsToShow)
})


router.get("/:pid", (req,res) => {    
    const{pid} = req.params
    const product = productManager.getProductById(parseInt(pid))
    if(!product) return res.status(201).json({info: "NotFound"})

    res.status(201).json({info: "Found", product})

})


router.post("/" ,(req,res) => {
    const {product} = req.body
    const{title, description, code, price, status, stock, category, thumbnail} = product    

    if(!productManager.checkData(title,"string")||!productManager.checkData(description,"string")||!productManager.checkData(code,"string") ||!productManager.checkData(price,"number") || !productManager.checkData(status,"boolean") ||!productManager.checkData(stock,"number") || !productManager.checkData(category,"string")) 
    return res.status(201).json({info: "Missing Data",})
    
    productManager.addProduct(title, description, code, price, status, stock, category, thumbnail)    
    const products = productManager.getProducts()
    let allProducts = [...products]
    
    
    const productAdded = allProducts.find(product => product.id === allProducts.length-1)
    
    res.status(201).json({info: "Created",productAdded})

})

router.put("/:pid" ,(req,res) => {
    const {pid} = req.params
    const {product} = req.body
    const productOld = {...productManager.getProductById(parseInt(pid))}
    const {title, description, code, price, status, stock, category, thumbnail} = product

    console.log(productOld)
    if(!productManager.getProductById(parseInt(pid))) return res.status(201).json({info: "Product Not Found"})

    if(!productManager.checkData(title,"string")||!productManager.checkData(description,"string")||!productManager.checkData(code,"string") ||!productManager.checkData(price,"number") || !productManager.checkData(status,"boolean") ||!productManager.checkData(stock,"number") || !productManager.checkData(category,"string")) 
    return res.status(201).json({info: "Missing Data",})

    productManager.updateProduct(parseInt(pid),title, description, code, price, status, stock, category, thumbnail)
    const productUpdated = {...productManager.getProductById(parseInt(pid))}
    res.status(201).json({info: "Product Updated",productOld,productUpdated})
})


router.delete("/:pid" ,(req,res) => {
    const {pid} = req.params
    const product = {...productManager.getProductById(parseInt(pid))}    
    if(!productManager.getProductById(parseInt(pid))) return res.status(201).json({info: "Product Not Found"})

    productManager.deleteProduct(parseInt(pid))
    res.status(201).json({info: "Product Deleted",product})
})

export default router