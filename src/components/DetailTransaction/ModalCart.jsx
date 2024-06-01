// Import Modules
import classes from "./css/modalCart.module.css";

export default function ModalCart({ transaction }) {
  return (
    <div className={classes.modalCart}>
      <h2>Info Client</h2>
      <form className={classes["form-cart"]}>
        <div className={classes["cart-input-item"]}>
          <span>Firstname:</span>
          <p>{transaction.infoUser.firstName}</p>
        </div>
        <div className={classes["cart-input-item"]}>
          <span>Lastname:</span>
          <p>{transaction.infoUser.lastName}</p>
        </div>
        <div className={classes["cart-input-item"]}>
          <span>Email:</span>
          <p>{transaction.infoUser.emailContact}</p>
        </div>
        <div className={classes["cart-input-item"]}>
          <span>Phone:</span>
          <p>{transaction.infoUser.phoneNumber}</p>
        </div>
        <div className={classes["cart-input-item"]}>
          <span>Country:</span>
          <p>{transaction.infoUser.country}</p>
        </div>
        <div className={classes["cart-input-item"]}>
          <span>City:</span>
          <p> {transaction.infoUser.city}</p>
        </div>
        <div className={classes["cart-input-item"]}>
          <span>Address:</span>
          <p>{transaction.infoUser.streetAddress}</p>
        </div>
        <div className={classes["cart-input-item"]}>
          <span>Order Note:</span>
          <p>
            {transaction.infoUser.noteOrder
              ? transaction.infoUser.noteOrder
              : "Empty"}
          </p>
        </div>
        <div className={classes["cart-input-item"]}>
          <span>Total price:</span>
          <p>{transaction.cart.totalPriceOfCarts} VNĐ</p>
        </div>
      </form>
    </div>
  );
}
