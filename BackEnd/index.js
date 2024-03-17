const port=4000;
const express= require("express");
const app=express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const multer = require("multer");
const path = require("path");
const cors=require("cors");


app.use(express.json());
app.use(cors());



//database connection with MOngoDB

mongoose.connect("mongodb+srv://ekart:sudhirsakthi@cluster0.kipl9mj.mongodb.net/ekart");
//API CREATION

app.get("/",(req,res)=>{
    res.send("Express App is running")
})

const storage = multer.diskStorage({
    destination: './Upload/Images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer ({storage:storage});

//Creating upload end point for images
app.use('/images',express.static('./Upload/Images'))

app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for createign products


const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    }

    ,
    name:{
        type:String,
        require:true,
    }
    ,
    image :{
        type:String,
        required:true,
    }
    ,
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    }
    ,
    date:{
        type:Date,
        default:Date.now,

    },
    available:{
        type:Boolean,
        default:true,
    },


})




const Address = mongoose.model("Address",{
    ref:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    address1:{
        type:String,
        required:true,
    },
    address2:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },

    state:{
        type:String,
        required:true,
    },
    district:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
        required:true,
    },
    landmark:{
        type:String,
        required:true
    }
})



const Orders = mongoose.model("Orders",{
    ref:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    orderId:{
        type:Number,
        required:true,
    },
    orderproductId:{
        type:Object
    },
    totalprice:{
        type:Number,
        // required:true,
    },
    date:{
        type:Date,
        default:Date.now,

    },
    delivered:{
        type:Number,
        default:0,
    }

}
)


app.post('/addproduct',async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id= last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product ({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name,
    })
});

// Creating api for deleting products



app.post('/removeproduct',async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("removed succesfully");
    res.json({
        sucess:true,
        name:req.body.name,
    })
})



// Creatign aapi for getting all products


app.get('/allproducts',async (req,res)=>{
    let Products = await Product.find({});
    console.log("all fetched");
    res.send(Products);
})


//SChema for user 


const Users = mongoose.model('User', {
    
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String, // Assuming password is a string, you may want to use a more secure method like bcrypt for storing passwords.
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    cartData: {
        type: Object, // Assuming you want to store cartData as an object
    },
});

// Creating endpoint for registering the user
app.post('/signup', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (check) {
            return res.status(400).json({ success: false, errors: "Existing user found with the same email id" });
        } else {
            let cart = {};
            for (let i = 0; i < 300; i++) {
                cart[i] = 0;
            }

            const user = new Users({
                name: req.body.username,
                email: req.body.email,
                password: req.body.password,
                cartData: cart
            });
            
            await user.save();
            const data = {
                user: {
                    id: user.id // Assuming you have an _id field for the user
                }
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, errors: "Internal Server Error" });
    }
});







// Creating endpoint for userlogin



app.post('/login',async (req,res)=>{
        let user = await Users.findOne({email:req.body.email});
        if(user){
            const passCompare = (req.body.password === user.password);
            if(passCompare){
                const data = {
                    user:{
                        id:user.id
                    }
                }
                const token = jwt.sign(data,'secret_ecom');
                res.json({success:true,token})
            }
            else{
                res.json({success:false,errors: "password is wrong"});
            }
        }
        else{
            res.json({success:false,errors:"wrong email id"});
        }
})








//Creating end point for newcollection data


app.get('/newcollection',async (req,res) =>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("Newcollection fetched")
    res.send(newcollection);
})



app.get('/popularinwomen',async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fetched");
    res.setDefaultEncoding((popular_in_women));
})
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            console.error(error);
            res.status(401).send({ errors: "Please authenticate using a valid token" });
        }
    }
};

app.post('/addtocart', fetchUser, async (req, res) => {
     let userData = await Users.findOne({_id:req.user.id});
     userData.cartData[req.body.itemid]+=1;
     await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
     res.send("Added");
     console.log("cart update sucess");
});

// cfreating endpoint for remove product from cartDtaa



app.post('/removefromcart',fetchUser,async(req,res)=>{
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemid]>0)
    userData.cartData[req.body.itemid]-=1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
    console.log("cart remove sucess");
})

// creating end point to  get cart

var orderIdsArray=[];
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("getting cart");
    let userData = await Users.findOne({_id:req.user.id});
    console.log("getted cartItems....")
    res.json(userData.cartData);
})

app.post('/getAddress',fetchUser,async (req,res)=>{
    
    console.log("getting address");
    let userData = await Address.findOne({ref:req.user.id});
    console.log(userData);
    res.json(userData);
})


app.post('/details', fetchUser, async (req, res) => {
    try {
        console.log("geetign....",req.user.id);
        console.log("Uploading address details...");
        
        console.log("Request Body:", req.body); // Add this line to check the received data
        
        const { name, email, address1, address2, mobile, state, district, pincode, landmark } = req.body;
        
        // Validate inputs here...
        
        const user = new Address({
            ref:req.user.id,
            name,
            email,
            address1,
            address2,
            mobile,
            state,
            district,
            pincode,
            landmark,
        });
        
        await user.save();
        
        console.log("User details saved successfully:", user);
        
        res.json({ success: true, message: 'Details saved successfully' });
    } catch (error) {
        console.error("Error saving user details:", error);
        res.status(500).json({ success: false, errors: "Internal Server Error" });
    }
});



app.post('/placeorder', fetchUser, async (req, res) => {
    try {
        // Fetch the cart data
        const userData = await Users.findOne({ _id: req.user.id });
        
        if (!userData) {
            return res.status(404).json({ success: false, errors: "User not found" });
        }

        const orderIdsArray = [];

        Object.keys(userData.cartData).forEach(function (key) {
            if (userData.cartData[key] >= 1) {
                orderIdsArray.push({ [key]: userData.cartData[key] });
                userData.cartData[key] = 0;
            }
        });

        // Save the updated cartData to the database
        console.log(userData.cartData)
        // After modifying cartData
        userData.markModified('cartData');


        await userData.save();
        

        

        // Find the latest order in the database
        const latestOrder = await Orders.findOne().sort({ orderId: -1 });

        let newOrderId = 0; // Default value if no orders exist yet

        // If there are previous orders, increment the latest orderId by 1
        if (latestOrder) {
            newOrderId = latestOrder.orderId + 1;
        }
        // console.log(req.body.price);
        // Create a new order with the incremented orderId
        const order = new Orders({
            ref: req.user.id,
            orderId: newOrderId,
            orderproductId: orderIdsArray,
            totalprice:req.body.price,

        });

        // Save the order to the database
        await order.save();

        console.log("Order saved successfully");

        res.json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({ success: false, errors: "Internal Server Error" });
    }
});


app.listen(port,(e)=>{
    if(!e){
        console.log("server running on: "+port);
    }
    else{
        console.log("error"+e);
    }
});