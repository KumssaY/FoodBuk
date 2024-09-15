import RemoveFromOrderButton from "components/RemoveFromOrderButton";
import { Box, Button, Typography, useTheme, Divider } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect, useState } from "react";
import FoodItemWidget from "./FoodItemWidget";
import { useSelector, useDispatch } from "react-redux";
import { setOrders } from "state";

const OrderWidget = () => {
    const { palette } = useTheme();
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);
    
    const dispatch = useDispatch();
    const foodItems = useSelector((state) => state.orders);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('budget');
    
    const makePayment = async () => {
      try {
        // Send a POST request to the /order endpoint
        const orderResponse = await fetch(`http://localhost:3001/order/${user._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            orders: foodItems
          })
        }).then((res) => res.json());

        console.log(orderResponse._id);
    
        // Check if the order update was successful
        // if (!orderResponse.ok) {
        //   throw new Error('Order update failed');
        // }

        // Send a POST request to the /payment endpoint
        const paymentResponse = await fetch(`http://localhost:3001/payment/${user._id}`, {
          method: 'POST',
          headers: {'Content-Type': 'application/json','Authorization': `Bearer ${token}`},
          body: JSON.stringify({
            orders: foodItems,
            paymentMethod: selectedPaymentMethod,
            orderId: orderResponse._id // replace with your selected payment method
          })
        });
    
        // Check if the payment was successful
        if (!paymentResponse.ok) {
          throw new Error('Payment failed');
        }
    
    
        // Handle successful payment and order update
        // Clear the order list
        dispatch(setOrders({ orders: [] }));
    
      } catch (error) {
        // Handle failed payment or order update
        console.error(error);
      }
    };
    
      const removeOrder = (order) => {
        const existingOrderIndex = foodItems.findIndex((o) => o._id === order._id);
      
        if (existingOrderIndex !== -1) {
          const newOrders = [...foodItems];
          let item = { ...newOrders[existingOrderIndex] }; // create a copy of the order
      
          if (item.quantity > 1) {
            item.quantity -= 1; // update the quantity property on the copy
            newOrders[existingOrderIndex] = item; // replace the original order with the updated copy
          } else {
            newOrders.splice(existingOrderIndex, 1);
          }
      
          dispatch(setOrders({ orders: newOrders }));
        }
      };
    

    return (
        <WidgetWrapper style={{
            width: "100%"
        }}>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                ORDER
            </Typography>
            <Divider />
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {foodItems.map((food_item, ix) => {
                    return (
                    <FoodItemWidget key={ix} foodItem={food_item} quantity={food_item.quantity} removable={true} onRemove={() => {removeOrder(food_item)}}  />
                    )   
                })}
            </Box>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                <span><strong>Total Amount:</strong> KSH {foodItems?.length > 0 ? foodItems?.reduce((sum, {foodprice = 0, quantity = 1}) => sum + foodprice * quantity, 0) : 0}</span>
            </Box>

            <Divider />
            <Box sx ={{ p: 2}}>

            <label>
              <input
                type="radio"
                value="mpesa"
                checked={selectedPaymentMethod === 'mpesa'}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              Mpesa
            </label>
            <label>
              <input
                type="radio"
                value="cash"
                checked={selectedPaymentMethod === 'cash'}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              Cash
            </label>
            <label>
              <input
                type="radio"
                value="budget"
                checked={selectedPaymentMethod === 'budget'}
                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
              />
              Budget
            </label>
            </Box>
            <Divider />
            <Box sx ={{ p: 2}}><Button onClick={makePayment}>Make Payment</Button></Box>
        </WidgetWrapper>
    );
}

export default OrderWidget;






{/* <Box display="flex" flexDirection="column" gap="1.5rem">
                {foodItems.map((food_item, ix) => {
                    return (
                        <FoodItemWidget key={ix} foodItem={food_item} removable={true} onRemove={() => {removeOrder(food_item)}}  />
                    )   
                })}
            </Box>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                <span><strong>Total Amount:</strong> KSH {foodItems?.length > 0 ? foodItems?.reduce((sum, {foodprice = 0}) => sum+foodprice, 0) : 0}</span>
            </Box> */}




    

    // const removeOrder = (order) => {
    //     // Implement your logic to add the item to the order
    //     // console.log(`Removed`, order);
    //     if (order && order?._id) {
    //       dispatch(setOrders({orders: foodItems.filter((f_item) => f_item?._id !== order._id)}))
    //     }
    //   };

    //   useEffect(() => {
    //     console.log(foodItems?.length > 0 ? foodItems?.reduce((sum, {foodprice = 0}) => sum+foodprice, 0) : 0)
    //   }, [foodItems]);







// const [foodItems, setFoodItems] = useState([
    //     {
    //         "_id": "655c8adb4656cc6ff6003d25",
    //         "foodmenuId": "1",
    //         "fooditem": "Ugali",
    //         "foodprice": 150,
    //         "availability": false,
    //         "__v": 0
    //       },
    //       {
    //         "_id": "655c8adb4656cc6ff6003d26",
    //         "foodmenuId": "2",
    //         "fooditem": "Sukuma Wiki",
    //         "foodprice": 250,
    //         "availability": true,
    //         "__v": 0
    //       }
    // ]);