import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
function Flag({ userid, flag }) {
  let { id } = useParams();
  let pinId = Number(id); // id for story comes out as String

  const [flagState, setflagState] = useState({ flag: false });
  useEffect(() => {
    //like componentdidmount
    const stateofuser = flag.some(a => a.flagger === userid);
    console.log(stateofuser + "user whut");

    setflagState({
      flag: stateofuser
    });
  }, [flag]);

  const handleFlag = e => {
    e.preventDefault();
    const submit = {
      pinId: pinId,
      flagger: userid,
      flagged: !flagState.flag
    };

    axios
      .post("/api/flagStory/", submit)
      .then(res => {
        console.log(res.data);
        setflagState({
          flag: !flagState.flag
        });
      })
      .catch(err => console.log(err));
  };
  console.log(flagState);
  return (
    <>
      {flagState.flag ? (
        <button type="submit" className="btn btn-danger disabled">
          Flagged
        </button>
      ) : (
        <button onClick={handleFlag} type="submit" className="btn btn-warning">
          Flag
        </button>
      )}
    </>
  );
}

export default Flag;
