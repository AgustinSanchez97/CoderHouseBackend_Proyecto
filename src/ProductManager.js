import fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filename = "./src/products.json"


let dataChecked = false


class ProductManager{
    constructor()
    {
        this.products = []
        if(fs.existsSync(filename)) this.products = JSON.parse(fs.readFileSync(filename,"utf-8"))
    }

    getProducts()
    {
        if(fs.existsSync(filename)) return JSON.parse(fs.readFileSync(filename,"utf-8"))
        return this.products
    }


    checkData(data,typeOfdata)
    {        
        if(typeof(data) === typeOfdata) return true
        return false
    }

    addProduct(title, description, code, price, status, stock, category, thumbnail)
    {
       
       let product =
       {
           title,
           description,
           code,
           price,
           status,
           stock,
           category,
           thumbnail
        }
        product["id"] = 0
        if(this.products.length > 0) product["id"] = this.products.length

        
        
        this.products.push(product)
        fs.writeFileSync(filename, JSON.stringify(this.products,null,"\t"))
        
    }

    getProductById(id)
    {      
        let productFound = this.products.find(product => product.id === id)
        if(productFound !== undefined) return productFound        
    }

    deleteProduct(idToDelete)
    {
        let product = this.getProductById(idToDelete)
        if(product === undefined) return
        let productId = this.products.findIndex(product => product.id === idToDelete)        
        this.arrayArrange(productId)
        fs.writeFileSync(filename, JSON.stringify(this.products,null,"\t"))
    }

    arrayArrange(idToStart)
    {
        let productsReorderList = this.products.filter(product => product.id > idToStart)
        this.products.splice(idToStart)
        
        for (let i = 0; i < productsReorderList.length; i++) 
        {
            productsReorderList[i].id = idToStart + i
            this.products.push(productsReorderList[i])
        }
    }
    
    updateProduct(idToDelete, title, description, code, price, status, stock, category, thumbnail)
    {
        let product = this.getProductById(idToDelete)
        if(product === undefined) return
        product.title = title
        product.description = description
        product.code = code
        product.price = price
        product.status = status
        product.stock = stock
        product.stock = category
        product.thumbnail = thumbnail

        fs.writeFileSync(filename, JSON.stringify(this.products,null,"\t"))
    }
}


export default new ProductManager()

