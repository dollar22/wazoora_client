import displayRazorpay from '../utils/Payment';
import { React } from 'react';
function CourseCard() {
    return (
        <div>
            <br></br>
            <h1 style={{ textAlign: "center" }}>
                RazorPay Payment Gateway Integration in React
            </h1>
            <br></br>
            <button
                type="button"
                onClick={displayRazorpay}
                className="course-payment-button"
            >
                Buy Course
            </button>
        </div>
    );
}

export default CourseCard;