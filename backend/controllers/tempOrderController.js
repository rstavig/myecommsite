// 8-16-23.  Note:  I removed this from code as it was messing up the Paypal "pay" and "update order" functions.  
//  See the v2 Readme fixes & bugs.  This "Update" was changed in order
// to prevent hackers from changing price on frontend and submitting to backend DB.
// This feature will be important on larger items, but this app is for
// a sandwich shop with small pricepoints, so I went back to the old way.
// At some point this will need to be figured out.


// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
    // NOTE: here we need to verify the payment was made to PayPal before marking
    // the order as paid
    const { verified, value } = await verifyPayPalPayment(req.body.id);
    if (!verified) throw new Error('Payment not verified');

    // check if this transaction has been used before
    const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
    if (!isNewTransaction) throw new Error('Transaction has been used before');

    const order = await Order.findById(req.params.id);

    if (order) {
        // check the correct amount was paid
        const paidCorrectAmount = order.totalPrice.toString() === value;
        if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});