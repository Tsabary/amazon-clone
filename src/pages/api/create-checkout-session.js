const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async(req, res) => {
    const { items, email } = req.body;

    const transformedItems = items.map((item) => ({
        price_data: {
            currency: "usd",
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image],
                description: item.description,
            },
        },
        quantity: 1,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: transformedItems,
            mode: "payment",
            success_url: `${process.env.HOST}/success`,
            cancel_url: `${process.env.HOST}/checkout`,
            payment_method_types: ["card"],
            // shipping_rates: [
            //     "shr_1MTtQrJ6wMlUCgiRhiQ5FEAG",
            //     "shr_1MTtRUJ6wMlUCgiRDKWy5ZlM",
            // ],
            // shipping_address_collection: {
            //     allowed_countries: ["GB", "US", "CA"],
            // },

            // metadata: {
            //     email,
            //     images: JSON.stringify(items.map((item) => item.image)),
            // },
        });
        res.redirect(session.url, 303);
    } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
    }

    // res.status(200).json({ id: session.id });
};