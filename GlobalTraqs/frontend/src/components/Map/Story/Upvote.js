import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularIndeterminate from "./CircularIndeterminate";
import { useParams } from "react-router-dom";
function Upvote({ pin, userid, numOf }) {
  const [userUpvote, setUserUpvote] = useState({
    upvote: false
  });
  const [newUpvote, setnewUpvote] = useState({
    state: true
  });
  const [upvoteId, SetupvoteId] = useState({});
  const [storyUpvote, SetstoryUpvote] = useState({
    total: numOf
  });
  let { id } = useParams();
  let pinId = Number(id); // id for story comes out as String

  useEffect(() => {
    //like componentdidmount
    const stateofuser = pin.some(a => a.upVoter === userid);
    let stateofUpvote = false;
    if (stateofuser) {
      const filtered = pin.filter(b => b.upVoter === userid)[0];
      stateofUpvote = filtered.upvote;
      setnewUpvote({
        state: !newUpvote.state
      });
      SetupvoteId({
        id: filtered.id
      });
    }

    console.log(stateofuser); //user has voted before
    setUserUpvote({
      upvote: stateofUpvote
    });
  }, [pin]);

  const handleUpvote = e => {
    e.preventDefault();
    let upvoteid = 0; //need to figure out how to update total online
    if (newUpvote.state) {
      const submit = {
        upvote: !userUpvote.upvote,
        pinId: pinId,
        upVoter: userid
      };
      axios
        .post("/api/upVoteStory/", submit)
        .then(res => {
          console.log(res.data);
          SetupvoteId({
            id: res.data.id
          });
          upvoteid = res.data.id;
        })
        .catch(err => console.log(err));
      setnewUpvote({
        state: !newUpvote.state
      });
    } else {
      const submit = {
        upvote: !userUpvote.upvote
      };
      //alert(`${userUpvote.upvote}`);
      axios
        .patch(`/api/upVoteStory/${upvoteId.id}/`, submit)
        .then(res => {
          console.log(res.data);
          upvoteid = upvoteId.id;
          //getTotal(upvoteid);
        })
        .catch(err => console.log(err));
    }
    getTotal();
    setUserUpvote({
      upvote: !userUpvote.upvote
    });
  };
  const getTotal = () => {
    // doesnt get teh online version
    let total = storyUpvote.total;
    !userUpvote.upvote ? total++ : total--;
    SetstoryUpvote({
      total: total
    });
  };

  console.log(upvoteId);
  console.log(newUpvote);
  return (
    // fragment
    <>
      {storyUpvote.total} upvotes
      <button onClick={handleUpvote} type="submit" className="btn btn-primary">
        {userUpvote.upvote ? "Downvote" : "Upvote"}
      </button>
    </>
  );
}

export default Upvote;
