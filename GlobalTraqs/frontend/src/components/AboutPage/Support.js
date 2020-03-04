import React, { useState, useRef, useEffect } from "react";
import paypal from 'paypal-checkout';
import { PayPalButton } from "react-paypal-button-v2";

export default function Support() {

    const [isEnabled, setIsEnabled] = useState(false);

    // useEffect(() => {
    //
    //     setIsEnabled(true);
    //     paypal.Button.render({
    //         env: "sandbox",
    //         client: {
    //             sandbox: "AVUoHvbFGncgYpQ6TdvEuNBOEaLrpmO_R3wWB5_elvD_3IhmwTaP2DSjcqXOFv47S068KUTebJeCyg5O",
    //             production: ""
    //         },
    //         payment: function (data, actions) {
    //             return actions.payment.create({
    //                 transactions: [
    //                     {
    //                         amount: {
    //                             total: "1.00",
    //                             currency: "USD"
    //                         }
    //                     }
    //                 ]
    //             })
    //         },
    //         commit: true,
    //
    //         onAuthorize: function (data, actions) {
    //             return actions.payment.execute().then(function (response) {
    //                 console.log("The payment was completed!");
    //             })
    //         },
    //         onCancel: function (data) {
    //             console.log("The payment was cancelled...");
    //         }
    //     }, '#paypal-express-btn');
    // }, []);
  {/*<div className={"container jumbotron"}>*/}
           {/*{isEnabled ? <div id="paypal-express-btn"></div> : "Loading..."}*/}
       {/*</div>*/}
    return (
        <div className={"container"}>
            <PayPalButton
            amount="0.01"
            onSuccess={(details, data) => {
                alert("Transaction completed by " + details.payer.name.given_name);
            }}
            onCancel={(data) => {
                alert("Transaction was cancelled...");
            }}
            style={{
                layout:  'vertical',
                shape:   'rect',
            }}
            />
        </div>
    );
}
