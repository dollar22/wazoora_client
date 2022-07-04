
import { API } from "../user/backend";

export default async function displayRazorpay(props) {
    let userdata = JSON.parse(localStorage.getItem('jwt'))
    console.log(props)
    const data = await fetch(`http://localhost:8000/payment/razorpay/${props.price}`, {
        method: "POST",
        body: JSON.stringify({ props })
    }).then((t) => t.json());
    const options = {
        key: process.env.RAZORPAY_KEY_ID,
        currency: data.currency,
        amount: props.price,
        name: props.name,
        description: props.description,
        image: "http://localhost:8000/logo.jpg",
        order_id: data.id,
        handler: function (response) {
            alert("PAYMENT ID ::" + response.razorpay_payment_id);
            alert("ORDER ID :: " + response.razorpay_order_id);

            const userUpdate = async (data) => {
                console.log(data)
                console.log(localStorage.getItem('jwt'))
                let user = JSON.parse(localStorage.getItem('jwt'));
                let invested = data.price + user.user.invested;


                console.log(data.price);
                console.log(user.user.invested)
                console.log(invested)
                fetch(
                    `${API}user/update/${user.user._id}`, {

                    // Adding method type
                    method: "POST",

                    // Adding body or contents to send
                    body: JSON.stringify({
                        invested: invested,
                        id: user.user._id
                    }),

                    // Adding headers to the request
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                    .then(async res => await res.json())
                    .then((json) => {
                        console.log(json)

                        user.user = json.user;

                        localStorage.setItem('jwt', JSON.stringify(user))

                    })

            }






            if (response.razorpay_order_id || response.razorpay_order_id) {
                const Myfetch = async (data) => {
                    console.log(data)
                    fetch(
                        `${API}getToken/${data.user.referToken}/${data.user.fullName}`, {
                        token: data.user.referToken,
                        name: data.user.fullName
                    })
                        .then(async res => await res.json())
                        .then((json) => {
                            console.log(json)
                            // toast("Token Generated");
                        })
                }
                Myfetch(JSON.parse(localStorage.getItem('jwt')))

                userUpdate(props)

            }


        },
        prefill: {
            name: userdata.user.fullName,
            email: userdata.user.email,
            contact: userdata.user.phoneNumber,
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}