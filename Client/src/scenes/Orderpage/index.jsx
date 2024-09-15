import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import WidgetWrapper from "components/WidgetWrapper";

const OrderPage = () => {
    const [allOrders, setAllOrders] = useState([]);
    const token = useSelector((state) => state.token);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        fetch(`http://localhost:3001/order/history/${user._id}`, {
            method: "GET",
            headers: {"Authorization": `Bearer ${token}`, "Content-Type": `application/json`}
        }).then((res) => res.json()).then((res_) => {
            console.log(res_);
            setAllOrders(res_);
        }).catch((err) => {
            console.log(err);
            return;
        })
    },[])
    return <Box>
        <Navbar/>
        <WidgetWrapper>
  <table>
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Total Price</th>
        <th>Payment Status</th>
        {/* Add more headers as needed */}
      </tr>
    </thead>
    <tbody>
      {allOrders.map((order, index) => (
        <tr key={index}>
          <td>{order._id}</td>
          <td>{order.total}</td>
          <td>{order.payment.isPaid ? 'Paid' : 'Not Paid'}</td>
          {/* Add more cells as needed */}
        </tr>
      ))}
    </tbody>
  </table>
</WidgetWrapper>
    </Box>
};

export default OrderPage;