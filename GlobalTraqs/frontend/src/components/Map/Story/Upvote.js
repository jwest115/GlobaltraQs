import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
function Upvote({ pin, userid }) {
  const [userUpvote, setUserUpvote] = useState({
    StatusOfUpvote: true,
    newUpvote: false
  });

  useEffect(() => {
    if (pin) {
      const check = pin.filter(e => e.upVoter === userid);
      if (check.length === 0) {
        setUserUpvote({
          StatusOfUpvote: false,
          newUpvote: true
        });
      } else {
        setUserUpvote({
          StatusOfUpvote: check.upvote,
          newUpvote: false
        });
      }
    }
    console.log(userUpvote);
  }, [userUpvote]);

  const onUpvote = useCallback(
    e => {
      e.preventDefault();
      setUserUpvote({
        StatusOfUpvote: !userUpvote.StatusOfUpvote,
        newUpvote: !userUpvote.newUpvote
      });

      console.log(userUpvote);
    },
    [userUpvote]
  );

  return (
    <button onClick={onUpvote} type="submit" className="btn btn-primary">
      {userUpvote.StatusOfUpvote ? "Downvote" : "Upvote"}
    </button>
  );
}

export default Upvote;
