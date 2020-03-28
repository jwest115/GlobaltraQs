import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { updateAboutUs, getAboutUs } from "../../actions/management";
import { useEffect, useState } from "react";
import TinyMCE from "react-tinymce";
import { Markup } from "interweave";

function About() {
  const [aboutUs, setAboutUs] = useState("");
  const [editButtonValue, setEditButtonValue] = useState("Edit");
  const dispatch = useDispatch();
  const aboutUsData = useSelector(state => state.management.about_us);
  const auth = useSelector(state => state.auth);
  const [editMode, setEditMode] = useState(false);
  const { isAuthenticated, user } = auth;
  const [editorContent, setEditorContent] = useState("");

  let authorized = false;

  if (user) {
    if (user.is_administrator || user.is_moderator) {
      authorized = true;
    }
  }

  useEffect(() => {
    dispatch(getAboutUs());
    // setAboutUs(aboutUsData);
  }, []);

  const handleEditorChange = e => {
    setEditorContent(e.target.getContent());
    console.log("Content was updated:", e.target.getContent());
  };

  const submitEdit = () => {
    console.log(editorContent);
    const about_us = editorContent;
    const aboutUsData = { about_us };
    dispatch(updateAboutUs(aboutUsData));
  };

  const editAboutUs = () => {
    if (editMode) {
      setEditButtonValue("Edit");
      setEditMode(false);
    } else {
      setEditButtonValue("Close");
      setEditMode(true);
    }
    // show edit form
  };

  const canEdit = (
    <div className="admin-moderator-edit">
      <button
        onClick={editAboutUs}
        className="btn btn-success admin-moderator-edit"
      >
        {editButtonValue}
      </button>
    </div>
  );

  const showEditor = aboutUsContent => (
    <div>
      <TinyMCE
        content={aboutUsContent}
        config={{
          height: 300,
          fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
          plugins: "autolink link image lists print preview",
          toolbar: "undo redo | bold italic | alignleft aligncenter alignright"
        }}
        onChange={handleEditorChange}
      />
      <button
        onClick={submitEdit}
        className="btn btn-success admin-moderator-edit"
      >
        Submit
      </button>
    </div>
  );

  return (
    <div className={"main-content-div"}>
      <div className="card card-body mt-4 mb-4">
        {authorized ? canEdit : ""}
        {editMode ? showEditor(aboutUsData) : ""}
        <Markup content={aboutUsData} />
        {/*
                <div className="col-lg-1">
                    <img src="https://picsum.photos/200/300" className="rounded" position="center" ></img>

                </div>
              */}
      </div>
    </div>
  );
}

export default About;
