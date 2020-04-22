import React, { useState, useCallback } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import { Row, Col } from "react-bootstrap";

import axios from "axios";

export default function Support() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [amount, setAmount] = useState("0.00");
  const [image, setimage] = useState("");
  const [loading, setloading] = useState(false);
  const [zoom, setZoom] = useState(0.5);
  const [crop, setcrop] = useState({
    x: 10,
    y: 10,
    aspect: 1
  });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [newimage, setnewimage] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const uploadimage = e => {
    const files = e.target.files[0];
    const a = { x: 10, y: 10, width: 100, height: 100 };
    const formData = new FormData();
    formData.append("upload_preset", "XzetaDev");
    formData.append("file", files);
    formData.append("custom_coordinates", a);
    setloading(true);
    //https://api.cloudinary.com/v1_1/dauntlessx/image/upload

    axios
      .post("https://api.cloudinary.com/v1_1/dauntlessx/image/upload", formData)
      .then(response => {
        console.log(response.data.secure_url);
        setimage(response.data.secure_url);
      })
      .then(setloading(false))
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setimage(reader.result), false);
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  const onCropChange = c => {
    console.log(c);
    setcrop(c);
  };
  const dim = {
    width: 10,
    height: 10
  };

  const sie = { width: 300, height: 300 };
  return (
    <div className="main-content-div support-us-div">
      <Row style={{width: "100%", minHeight: "100%", height: "auto"}}>
        <Col md={9} className="support-us-main-content-col">
          <div className="support-us-main-content-div">
            <h3 className="support-us-title">How you can help</h3>
            <Row>
              <Col md={4}>
                <div className="support-us-image-div">
                  <img src="./static/frontend/images/Purple_Chat_Bubble.png" alt="post your stories" className="support-us-images"/>
                  <div className="text-block-1">
                    <h4 className="support-us-image-main-text">post</h4>
                    <p className="support-us-image-sub-text">your stories</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="support-us-image-div">
                  <img src="./static/frontend/images/Green_Chat_Bubble.png" alt="post your stories" className="support-us-images"/>
                  <div className="text-block-1">
                    <h4 className="support-us-image-main-text">share</h4>
                    <p className="support-us-image-sub-text">#thearqive</p>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="support-us-image-div">
                  <img src="./static/frontend/images/Red_Chat_Bubble.png" alt="post your stories" className="support-us-images"/>
                  <div className="text-block-1">
                    <h4 className="support-us-image-main-text">donate</h4>
                    <p className="support-us-image-sub-text">if you can</p>
                  </div>
                </div>
              </Col>
            </Row>
            <Row style={{ paddingTop: "50px"}}>
              <Col md={12}>
                <p className="support-us-main-content-text">We would like to say <strong>thank you</strong> to all our supporters and followers for sharing your stories and helping us grow! Your contributions, no matter what they are, very well may help someone who is struggling with their identity or someone who feels alone in the world.</p>
              </Col>
            </Row>
            <Row style={{ paddingBottom: "50px"}}>
              <div className="col-md-6 m-auto">
                <div className="card card-body mt-5" style={{borderRadius: "8px"}}>
                  {/*<h2 className="text-center">Support Us</h2>*/}
                  <label className="support-us-image-sub-text">Donation Amount: </label>
                  <input
                    type="value"
                    className="form-control"
                    name="amount"
                    onChange={e => setAmount(e.target.value)}
                    value={amount}
                  />
                  <br></br>
                  <PayPalButton
                    amount={amount}
                    onSuccess={(details, data) => {
                      alert(
                        "Transaction completed by " + details.payer.name.given_name
                      );
                    }}
                    onCancel={data => {
                      alert("Transaction was cancelled...");
                    }}
                    style={{
                      layout: "vertical",
                      shape: "rect"
                    }}
                  />
                </div>
            </div>
            </Row>
          </div>
        </Col>
        <Col md={3} className="support-us-side-content-col">
          <div className="support-us-side-content-div">
            <h3 className="support-us-side-title">follow us</h3>
          </div>
          <div>
            <Col md={{ size: 2, offset: 5 }} className="col-md-2 offset-sm-4">
              <img src="./static/frontend/images/instagram_icon.JPG" alt="instagram link" className="social-media-images"/>
              <img src="./static/frontend/images/twitter_icon.JPG" alt="twitter link" className="social-media-images"/>
              <img src="./static/frontend/images/facebook_icon.JPG" alt="facebook link" className="social-media-images"/>
            </Col>
          </div>
        </Col>
      </Row>
    </div>
      // below is the paypal popup
      /*<div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Support Us</h2>
          <label>Donation Amount: </label>
          <input
            type="value"
            className="form-control"
            name="amount"
            onChange={e => setAmount(e.target.value)}
            value={amount}
          />
          <br></br>
          <PayPalButton
            amount={amount}
            onSuccess={(details, data) => {
              alert(
                "Transaction completed by " + details.payer.name.given_name
              );
            }}
            onCancel={data => {
              alert("Transaction was cancelled...");
            }}
            style={{
              layout: "vertical",
              shape: "rect"
            }}
          />
        </div>
      </div>
    </div>*/
  );
}
