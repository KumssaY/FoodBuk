import React, { useState, useEffect } from 'react';
import FoodItemWidget from "../widgets/FoodItemWidget";
import WidgetWrapper from 'components/WidgetWrapper';
import Navbar from "scenes/navbar";
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import "./styles/foodMenuPage.css";
import OrderWidget from "../widgets/OrderWidget"
import { useDispatch } from "react-redux";
import { setOrders } from "state"

const FoodmenuPage = () => {
  const [foodItems, setFoodItems] = useState([]);
  const token = useSelector((state) => state.token);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/foodmenu', {
          method: "GET",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
      });
        const data = await response.json();
        console.log(data)
        setFoodItems(data);
        return;
      } catch (error) {
        console.error('Error fetching food menu:', error);
        return;
      }
    };

    // console.log(orders);

    fetchData();
  }, []);

  const addToOrder = (order) => {
    // Check if the order already exists in the orders
    const existingOrderIndex = orders.findIndex((o) => o._id === order._id);
  
    if (existingOrderIndex !== -1) {
      // If the order exists, increase its quantity
      const newOrders = [...orders];
      let item = { ...newOrders[existingOrderIndex] }; // create a copy of the order
      item.quantity += 1; // update the quantity property on the copy
      newOrders[existingOrderIndex] = item; // replace the original order with the updated copy
      dispatch(setOrders({ orders: newOrders }));
    } else {
      // If the order doesn't exist, add it to the orders
      dispatch(setOrders({ orders: [...orders, { ...order, quantity: 1 }] }));
    }
  };

  // const addToOrder = (order) => {
  //   // Implement your logic to add the item to the order
  //   // console.log(`Added`, order);
  //   if (order) {
  //     dispatch(setOrders({orders: [...orders, order]}))
  //   }
  // };

    return (
    <Box>
        <Navbar/>
        <div className="fmp_content">
          <div className="fmp_col">
            <div className="fmp_fmw">
            <div className="fmp_bg_overlay"></div>
              <WidgetWrapper className='fmp_food_menu_widget'>
                <h1>Menu</h1>
                {foodItems?.length > 0 && foodItems.map((foodItem) => (
                  <Box className='FoodItemWidget'>
                    <FoodItemWidget key={foodItem.foodmenuId} foodItem={foodItem} onAddToOrder={addToOrder}/>
                  </Box>
                ))}
              </WidgetWrapper>
            </div>
          </div>
          <div className="fmp_col">
            <OrderWidget />
          </div>
        </div>
    </Box>
    );
};

export default FoodmenuPage;