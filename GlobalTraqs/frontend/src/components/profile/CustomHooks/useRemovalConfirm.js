import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unFavoriteProfile } from "../../../actions/users";
const useRemovalConfirm = (onConfirmDeletion) => {
  const [removalModalState, setremovalModalState] = useState(false);
  const [removalFav, setremovalFav] = useState();
  const dispatch = useDispatch();
  const removalToggle = (id) => {
    setremovalModalState(!removalModalState);
    setremovalFav(id);
  };

  const onRemovalSubmit = () => {
    dispatch(unFavoriteProfile(removalFav));
    setremovalModalState(!removalModalState);
  };
  const onDeleteHome = () => {
    onConfirmDeletion(removalFav);
    setremovalModalState(!removalModalState);
  };
  return {
    removalModalState,
    removalToggle,
    onRemovalSubmit,
    removalFav,
    onDeleteHome,
  };
};

export default useRemovalConfirm;
