import fs from "fs"
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filename = "./src/carts.json"

class CartManager{
    constructor()
    {
        this.carts = []        
        if(fs.existsSync(filename)) this.carts = JSON.parse(fs.readFileSync(filename,"utf-8"))
    }

    getCarts()
    {
        if(fs.existsSync(filename)) return JSON.parse(fs.readFileSync(filename,"utf-8"))
        return this.carts
    }

    checkData(data,typeOfdata)
    {        
        if(typeof(data) === typeOfdata) return true
        return false
    }

    addCart()
    {
        let cart =
        {
           products : []
        }

        cart["id"] = 0
        if(this.carts.length > 0) cart["id"] = this.carts.length
        
        this.carts.push(cart)
        fs.writeFileSync(filename, JSON.stringify(this.carts,null,"\t"))
        
    }

    getCartById(id)
    {      
        let cartFound = this.carts.find(cart => cart.id === id)
        if(cartFound !== undefined) return cartFound
        console.log("Producto No Encontrado")
    }

    addProductsToCart(cartId,productId)
    {
        let cart = this.getCartById(parseInt(cartId))
        if(cart === undefined) return
        let productFound = cart.products.find(product => product.productId === productId)
        if(productFound !== undefined)
        {
            
            productFound.quantity +=1            
        }
        else
        {
            cart.products.push({productId : productId,quantity : 1})            
        }

        fs.writeFileSync(filename, JSON.stringify(this.carts,null,"\t"))
        
    }
    deleteProduct(idToDelete)
    {
        let product = this.getProductById(idToDelete)
        if(product === undefined) return
        let productId = this.products.findIndex(product => product.id === idToDelete)        
        this.arrayArrange(productId)
        fs.writeFileSync(filename, JSON.stringify(this.products,null,"\t"))
    }

}
export default new CartManager()

