import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
export default function Support() {
  const [image, setimage] = useState({
    title: "cat",
    image_url: "",
    uploader: 1
  });
  const onSubmit = e => {
    e.preventDefault();
    let data = new FormData();
    data.append("image_url", image.image_url);
    data.append("title", image.title);
    data.append("uploader", image.uploader);
    axios
      .post("/api/photo/", data)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  return (
    <div>
      LAOLS
      <form onSubmit={onSubmit}>
        <input
          type="file"
          id="image"
          accept="image/png, image/jpeg"
          onChange={e =>
            setimage({
              ...image,
              image_url: e.target.files[0]
            })
          }
          required
        />
        <button>PUSH</button>
      </form>
    </div>
  );
}
