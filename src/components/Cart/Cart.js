import { Fragment, useContext, useState } from "react"
import Modal from "../UI/Modal"
import classes from "./Cart.module.css"
import CartContext from "../../store/cart-context"
import CartItem from "./CartItem"
import Checkout from "./Checkout"

const Cart = (props) => {

  const [isCheckout, setIsCheckout] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didSubmit, setDidSubmit] = useState(false)
  const cartCtx = useContext(CartContext)

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hasItems = cartCtx.items.length > 0

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1})
  }

  const orderHandler = () => {
    setIsCheckout(true)
  }

  const url = 'https://react-http-ff2de-default-rtdb.europe-west1.firebasedatabase.app/orders.json'

  const submitOrderHamdler = async (userData) => {
    setIsSubmitting(true)
     await fetch(url, { 
      method: 'POST', 
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      }) 
    })
    setIsSubmitting(false)
    setDidSubmit(true)
    cartCtx.clearCart()
  }

  const cartItems = <ul className={classes['cart-items']}>{cartCtx.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name} 
      amount={item.amount}
      price={item.price}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
      onAdd={cartItemAddHandler.bind(null, item)}
    />
  ))}</ul>

  const modalActions = (
    <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
  </div>
  )

  const cartModalContent = <Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHamdler} onCancel={props.onClose}/>}
      {!isCheckout && modalActions}
  </Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>

    const didSubmitModalContent = 
    <Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      </div>
    </Fragment>


  return (
    <Modal onClose={props.onClose} >
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart
