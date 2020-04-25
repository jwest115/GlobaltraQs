import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unFavoriteProfile } from "../../../actions/users";
const useRemovalConfirm = (onSubmit) => {
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
  const onConfirmDelete = () => {
    onSubmit();
  };
  return {
    removalModalState,
    removalToggle,
    onRemovalSubmit,
    onConfirmDelete,
  };
};

export default useRemovalConfirm;
