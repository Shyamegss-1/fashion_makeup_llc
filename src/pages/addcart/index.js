import react from "react";
import ListItems from "./cart-listItems";

const AddToCart = (props) => {
  return (
    <>
    <div className="cartDrop_Down">
          <ListItems closefunction={props.closeFun}/>
    </div>
     
    </>
  );
};
export default AddToCart;
