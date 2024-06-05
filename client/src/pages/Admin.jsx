import { useState, useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import {fetchAllOrders} from "../context/GlobalAction";
import DataTable from 'react-data-table-component'

function Admin() {

    const { dispatch, user, orders } = useContext(GlobalContext);

    const [searchTerm, setSearchTerm] = useState('');

    const [orderData, setOrdersData] = useState([]);

    const [filteredOrderData, setFilteredOrdersData] = useState([]);

      useEffect(() => {

        if (user) {

            fetchAllOrders(dispatch, user);

        }

    }, [user]);

    useEffect(() => {

        if (orders) {

            setOrdersData(orders);

            setFilteredOrdersData(orders);

        }

    }, [orders]);

     const columns = [
        {
            name: 'ID',
            selector: row => row.order_id,
            width: '60px',
        },
        {
            name: 'Customer',
            selector: row => row.customer_name,
        },
        {
            name: 'Email',
            selector: row => row.customer_email,
        },
        {
            name: 'Status',
            selector: row => row.order_status,
            width: '80px'
        },
        {
            name: 'Shipping Method',
            selector: row => row.shipping_method,
        },
        {
            name: 'Shipping Price',
            selector: row => row.shipping_price,
            width: '110px'
        },
        {
            name: 'Total Price',
            selector: row => row.order_total_price,
            width: '90px'
        },
        {
            name: 'Created At',
            selector: row => new Date(row.order_created_at).toLocaleDateString(),
        },
        {
            name: 'Items',
            cell: row => (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {row.order_items.map((item, index) => (
                        <li key={index}>
                            {item.product_name} (x{item.quantity}) - ${(item.product_price / 100).toFixed(2)}
                        </li>
                    ))}
                </ul>
            ),
            width: '230px'
        },
        {
            name: 'Stripe',
            cell: row => (
                <a target="_blank" href={`https://dashboard.stripe.com/test/payments/${row.stripe_payment_intent_id}`}>View</a>
            ),
            width: '70px'
        },
     ];




     const handleChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    const filteredData = orderData.filter((order) => {
        // Check if any order property matches the searchTerm
        if (
            order.stripe_payment_intent_id?.toLowerCase()?.includes(searchTerm) || 
            order.customer_name?.toLowerCase()?.includes(searchTerm) || 
            order.customer_email?.toLowerCase()?.includes(searchTerm) || 
            order.shipping_method?.toLowerCase()?.includes(searchTerm) || 
            order.order_status?.toLowerCase()?.includes(searchTerm) || 
            order.product_name?.toLowerCase()?.includes(searchTerm)
        ) {
            return true;
        }

        // Check if any item in order_items matches the searchTerm
        for (const item of order.order_items) {
            if (
                item.product_name?.toLowerCase()?.includes(searchTerm) || 
                item.quantity?.toString()?.toLowerCase()?.includes(searchTerm) || 
                item.product_price?.toString()?.toLowerCase()?.includes(searchTerm)
            ) {
                return true;
            }
        }

        return false;
    });

    setFilteredOrdersData(filteredData);
    setSearchTerm(searchTerm);
};


     if (!orders) return null;

    return (
        <div className="admin-panel-container">
            <input type="text" className="search-box" value={searchTerm} placeholder="Search" onChange={handleChange} />
            <DataTable
                columns={columns}
                data={filteredOrderData}
                searchable
                pagination
            />
        </div>

    );
}

export default Admin;


 {/* <h1>Orders</h1>
            <input type="text" className="search-box" value={searchTerm} placeholder="Search" onChange={handleChange} />
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Shipping</th>
                        <th>Total Price</th>
                        <th>Created At</th>
                        <th>Items</th>
                        <th>Stripe</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        
                        <tr key={order.order_id}>                          
                                <td>{order.order_id}</td>
                                <td>{order.customer_name}</td>
                                <td>{order.customer_email}</td>
                                <td>{order.order_status}</td>
                                <td>{order.shipping_method}</td>
                                <td>${(order.order_total_price / 100).toFixed(2)}</td>
                                <td>{new Date(order.order_created_at).toLocaleDateString()}</td>
                                <td>
                                    <ul>
                                        {order.order_items.map((item, index) => (
                                            <li key={index}>
                                                {item.product_name} (x{item.quantity}) - ${(item.product_price / 100).toFixed(2)}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td><a target="_blank" href={`https://dashboard.stripe.com/test/payments/${order.stripe_payment_intent_id}`}>View</a></td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
        </div> */}