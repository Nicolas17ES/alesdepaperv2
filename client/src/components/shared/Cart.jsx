 import {useState} from 'react'

function Cart() {

    const [cartState, setCartState] = useState(false)

    return (
        <div onClick={() => setCartState(!cartState)} className="cart-icon-container">
            <button className="cart-icon">shopping bag</button>
        </div>
    );
}

export default Cart;