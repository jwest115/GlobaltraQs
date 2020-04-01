import React, { useState, useCallback } from "react";

import axios from "axios";
import getCroppedImg from "./cropImage";
const useProfileImage = () => {
  const [modalState, setmodalState] = useState(false);
  const [image, setimage] = useState("");
  const [zoom, setZoom] = useState(1);
  const [crop, setcrop] = useState({
    x: 10,
    y: 10
  });
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState({
    x: 47,
    y: 94,
    width: 206,
    height: 206
  });
  const [croppedImage, setCroppedImage] = useState(null);
  const [newimage, setnewimage] = useState(null);

  const toggle = () => {
    setmodalState(!modalState);
  };
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const makeClientCrop = async crop => {
    if (imgRef && crop.width && crop.height) {
      createCropPreview(imgRef, crop, "newFile.jpeg");
    }
  };
  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setimage(reader.result), false);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation,
        setnewimage
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);
  const onSubmit = () => {
    console.log(newimage);
    let formData = new FormData();

    formData.append("upload_preset", "XzetaDev");
    formData.append("file", newimage);

    //https://api.cloudinary.com/v1_1/dauntlessx/image/upload

    axios
      .post("https://api.cloudinary.com/v1_1/dauntlessx/image/upload", formData)
      .then(response => {
        console.log(response.data.secure_url);
      })

      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  console.log(croppedAreaPixels);
  return {
    modalState,
    onSelectFile,
    image,
    toggle,
    crop,
    zoom,
    setcrop,
    setZoom,
    onCropComplete,
    onSubmit,
    showCroppedImage
  };
};
export default useProfileImage;
