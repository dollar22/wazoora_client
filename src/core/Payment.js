export default async function displayRazorpay(props) {
    const data = await fetch("http://localhost:8000/payment/razorpay", {
        method: "POST",
    }).then((t) => t.json());

    console.log(data);

    const options = {
        key: process.env.RAZORPAY_KEY_ID,
        currency: data.currency,
        amount: data.amount,
        name: "WZ Public's Store",
        description: "Wallet Transaction",
        image: "http://localhost:8000/logo.jpg",
        order_id: data.id,
        handler: function (response) {
            alert("PAYMENT ID ::" + response.razorpay_payment_id);
            alert("ORDER ID :: " + response.razorpay_order_id);
        },
        prefill: {
            name: "jhon",
            email: "jhon123@email.com",
            contact: "9821254649",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}