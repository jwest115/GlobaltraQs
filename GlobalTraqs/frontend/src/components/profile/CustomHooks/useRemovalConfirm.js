import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unFavoriteProfile } from "../../../actions/users";
const useRemovalConfirm = () => {
  const [removalModalState, setremovalModalState] = useState(false);
  const [removalFav, setremovalFav] = useState();
  const dispatch = useDispatch();
  const removalToggle = (id) => {
    setremovalModalState(!removalModalState);
    setremovalFav(id);
  };
  const onRemovalSubmit = () => {
    console.log(removalFav);
    dispatch(unFavoriteProfile(removalFav));
    setremovalModalState(!removalModalState);
  };
  return {
    removalModalState,
    removalToggle,
    onRemovalSubmit,
  };
};

export default useRemovalConfirm;
