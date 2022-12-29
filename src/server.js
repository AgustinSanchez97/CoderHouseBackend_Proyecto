import express from "express";

import productRoutes from "../routes/products.routes.js"
import cartsRoutes from "../routes/carts.routes.js"


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))



app.use("/api/products",productRoutes)
app.use("/api/carts",cartsRoutes)


app.listen(8080, () => console.log("listening on port 8080"))



