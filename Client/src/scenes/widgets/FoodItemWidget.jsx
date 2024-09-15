import React from 'react';
import Available from "../../components/Available";
import AddButton from "../../components/AddToOrderButton";
import "./styles/foodItemWidget.css";
import RemoveFromOrderButton from 'components/RemoveFromOrderButton';

const FoodItemWidget = ({ foodItem, onAddToOrder, removable = false, onRemove, quantity }) => {
  const { fooditem: name, foodprice: price, availability: isAvailable } = foodItem;

  return (
    <div className='fiw_wrapper'>
      <div className='fiw_content'>
        <div className='fiw_col'>
          <Available isAvailable={isAvailable} />
          <span>{name}</span>
        </div>
        <div className='fiw_col'>
          <span>Ksh. {price.toFixed(2)} * {quantity}</span>
        </div>
        <div className='fiw_col'>
          {isAvailable && (removable ? <RemoveFromOrderButton onRemoveFromOrder={onRemove} /> : <AddButton onAddToOrder={() => onAddToOrder(foodItem)} />)}
        </div>
      </div>
    </div>
  );
};

export default FoodItemWidget;
// <FlexBetween sx={{
    //   padding: "6px"
    // }}>
    //   <FlexBetween gap="1rem">
    //     <Available isAvailable={isAvailable} />
    //     <Box>
    //       <Typography variant="h5" fontWeight="500">
    //         {name}
    //       </Typography>
    //       <Typography fontSize="0.75rem">Price: KSH {price.toFixed(2)}</Typography>
    //     </Box>
    //   </FlexBetween>
    //   {isAvailable && <AddButton onAddClick={() => onAddToOrder(foodItem)} />}
    // </FlexBetween>