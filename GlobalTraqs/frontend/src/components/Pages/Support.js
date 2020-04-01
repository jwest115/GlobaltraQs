import React, { useState, useCallback } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";

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
    <div className="container main-content-div">
      <h2>Test</h2>
      <input type="file" name="file" onChange={onSelectFile} />

      {image && (
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          cropSize={sie}
          aspect={1}
          onCropChange={setcrop}
          onZoomChange={setZoom}
          cropShape="round"
          onCropComplete={onCropComplete}
        />
      )}
      <Slider
        value={zoom}
        min={0.5}
        max={5}
        step={0.1}
        aria-labelledby="Zoom"
        onChange={(e, zoom) => setZoom(zoom)}
      />
      <button onClick={setnewimage}> Submit</button>
      {/* <div className="col-md-6 m-auto">
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
      </div> */}
    </div>
  );
}
