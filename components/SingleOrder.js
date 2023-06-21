
export default function SingleOrder ({order}) {
    return (
        <div key={order._id} className="my-5 border-b-4 ">
            <div className="flex justify-between mb-4">
                <p>Order: {(order._id.toString()).slice(-5)}</p>
                <time>{new Date(order.createdAt).toLocaleDateString("es-AR")}</time>
            </div>
            {order.line_items.map(item => (
                <div key={item.product_data.name} className="flex justify-between">
                    <p>{item.quantity} x {item.product_data.name}</p>
                    <p>${item.price_data.unit_amount*item.quantity}</p>
                </div>
            ))}
        </div>
    )
}