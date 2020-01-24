import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
export default function Support() {
  const [image, setimage] = useState({
    title: "cat",
    image_url: "",
    uploader: 2
  });
  const onSubmit = e => {
    e.preventDefault();
    console.log(image);
    axios
      .post("/api/photo/", image)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={e =>
            setimage({
              ...image,
              image_url: e.target.value
            })
          }
        />
        <button>PUSH</button>
      </form>
    </div>
  );
}
