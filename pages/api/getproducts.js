import Product from "@/models/Product"
import connectDb from "@/middleware/mongoose"

const handler = async (req, res) => {
    let products = await Product.find()

    // initially product will be empty
    let sweets = {}

    for (let item of products) {   //When product already exist and new size is available, do this.
        if (item.title in sweets) {    //Does this size already exists do this, otherwise do nothing.
            if (!sweets[item.title].size.includes(item.size) && item.availableQty > 0) {
                sweets[item.title].size.push(item.size);

            }
        }
        else {//When there is no product available, do this (ideally). 
            sweets[item.title] = JSON.parse(JSON.stringify(item)); //Getting all the data as an array by making TITLE as KEY.

            if (item.availableQty > 0) {
                sweets[item.title].size = [item.size]; //Make size an array and put the value in it.
            }
        }
    }

    res.status(200).json(sweets)
}
export default connectDb(handler);


