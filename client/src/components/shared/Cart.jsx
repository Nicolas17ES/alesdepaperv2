 import {useState} from 'react'

function Cart() {

    const [cartState, setCartState] = useState(false)

    return (
        <div onClick={() => setCartState(!cartState)} className="cart-icon-container">
            <span className="cart-icon">shopping bag</span>
        </div>
    );
}

export default Cart;