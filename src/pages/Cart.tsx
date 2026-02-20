export default function Cart() {
    return (
        <div style={{ padding: 20 }}>
            <div style={{ border: "1px solid gray", padding: 20, marginBottom: 20 }}>
                CART HEADER
            </div>

            {/* CART ITEMS */}
            <div style={{ border: "1px solid gray", padding: 20, marginBottom: 20 }}>
                <div>CART ITEM</div>
                <div>CART ITEM</div>
                <div>CART ITEM</div>
            </div>

            {/* SUMMARY */}
            <div style={{ border: "1px solid gray", padding: 20, marginBottom: 20 }}>
                TOTAL PRICE
            </div>

            <button>GO TO CHECKOUT</button>
        </div>
    );
}