import userModel from "../models/userModel.js";

//user cart 

const addToCart = async (req, res) => {
    try {

        const { userId, item } = req.body;


        const product = {
            ...item,
            quantity: 1
        }

        await userModel.findByIdAndUpdate(userId, {
            $push: {
                cartData: product
            }
        });

        return res.json({ success: true, message: "Your Product added to cart" });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }

}

// update cart

const updateCart = async (req, res) => {

    try {

        const { userId, itemQuantity, itemId, selectedSize } = req.body;

        await userModel.updateOne(
            {
                _id: userId,
                cartData: {
                    $elemMatch: {
                        _id: itemId,
                        sizes: selectedSize
                    }
                }
            },
            {
                $set: {
                    "cartData.$.quantity": itemQuantity
                }
            }
        );
        return res.json({ success: true, message: "item quantity update" });

    } catch (error) {

        return res.json({ success: false, message: error.message });
    }

}

// get cart

const getUserCart = async (req, res) => {

    try {

        const { userId } = req.body;

        const user = await userModel.findById(userId);


        return res.json({ success: true, userCart: user.cartData });

    } catch (error) {

        return res.json({ success: false, message: error.message });

    }





}

// remove from cart

const DeleteCartItem = async (req, res) => {

    try {


        const { userId, itemId, selectedSize } = req.body;


        const user = await userModel.updateOne(
            {
                _id: userId,
                cartData: {
                    $elemMatch: {
                        _id: itemId,
                        sizes: selectedSize
                    }
                }
            },
            {
                $pull: {
                    cartData: {
                        _id: itemId,
                        sizes: selectedSize
                    }
                }
            }
        );

        return res.json({ success: true, message: "Data Deleted" });

    } catch (error) {

        return res.json({ success: false, message: error.message });

    }





}

export { addToCart, updateCart, getUserCart, DeleteCartItem };