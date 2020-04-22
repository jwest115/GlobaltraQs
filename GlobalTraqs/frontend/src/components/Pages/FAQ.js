import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { TextField, Divider } from "@material-ui/core";
import { useSelector, useDispatch, useStore } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
  },
}));
export default function FAQ() {
  const [faqDesc, setfaqDesc] = useState();
  const [shownComments, setShownComments] = useState({});
  const [showAddForm, setshowAddForm] = useState(false);
  const toggleComment = (id) => {
    // toggles to show

    setShownComments((prevShownComments) => ({
      ...prevShownComments,
      [id]: !prevShownComments[id],
    }));
    revertChange(id);
  };
  const [backUpFaq, setbackUpFaq] = useState();
  const [createNewfaq, setNewfaq] = useState({
    faqQuestionDesc: "",
    faqAnswerDesc: "",
  });
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;
  const [isLoading, setisLoading] = useState(true);
  const [showEditForm, setshowEditForm] = useState("");
  useEffect(() => {
    axios
      .get("/api/faq/")
      .then((response) => {
        setfaqDesc(response.data);
        setbackUpFaq(response.data);
        setisLoading(false);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }, []);

  function updateFAQ(e, id) {
    setfaqDesc(
      faqDesc.map((faq) =>
        faq.id === id ? { ...faq, [e.target.name]: e.target.value } : faq
      )
    );
  }

  function deletefaqDesc(id) {
    //e.preventDefault() for edit function post for new data patch for editing data
    axios
      .delete(`/api/faq/${id}/`)
      .then((response) => {
        setfaqDesc(faqDesc.filter((desc) => desc.id !== id));
        setbackUpFaq(backUpFaq.filter((desc) => desc.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function editfaqDesc(id) {
    const submit = faqDesc.filter((edit) => edit.id === id)[0];

    axios
      .patch(`/api/faq/${id}/`, submit)
      .then((response) => {
        setbackUpFaq(
          backUpFaq.map((faq) =>
            faq.id === id
              ? {
                  ...faq,
                  faqQuestionDesc: response.data.faqQuestionDesc,
                  faqAnswerDesc: response.data.faqAnswerDesc,
                }
              : faq
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const revertChange = (id) => {
    const revert = backUpFaq.filter((edit) => edit.id === id)[0];

    setfaqDesc(
      faqDesc.map((faq) =>
        faq.id === id
          ? {
              ...faq,
              faqQuestionDesc: revert.faqQuestionDesc,
              faqAnswerDesc: revert.faqAnswerDesc,
            }
          : faq
      )
    );
  };

  function addFaq(e) {
    e.preventDefault();

    axios
      .post(`/api/faq/`, createNewfaq)
      .then((response) => {
        const newFaq = { ...response.data, editForm: false };
        setfaqDesc([...faqDesc, newFaq]);
        setbackUpFaq([...backUpFaq, newFaq]);
        setshowAddForm(false);
        setNewfaq({
          faqQuestionDesc: "",
          faqAnswerDesc: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const classes = useStyles();

  let canEdit = false;
  if(isAuthenticated) {
      if(user.is_administrator) {
        canEdit = true;
      }
  }

  return (
    <div className="main-content-div faq-page-background">
        {/*<div className="faq-title">*/}
        {/*    Frequently Asked Questions*/}
        {/*</div>*/}
        {canEdit ? (
            <div style={{height: "30px"}}>
              <button
                className="add-faq-button btn btn-primary btn-sm"
                onClick={() => setshowAddForm(!showAddForm)}
              >
                Add New FAQ
              </button>
            </div>
            ) : ""}
    <div className="col-md-6 m-auto">
        <div style={{ marginBottom: "30px" }}>
          <Paper className={`faq-card ${classes.root}`}>
            <button class="accordion">
              <h3 className="faq-question">
                what is  <i>the arqive</i>?
              </h3>
            </button>
              <div class="panel">
                <p className="faq-answer">
                  <i>The arqive</i> is a place to learn more about queer experiences
                  and serve as a resource for members of the queer community. Check
                  out our <Link to="/About"><u>About Us</u></Link> page for more info!
                </p>
              </div>
          </Paper>
        </div>
        <div style={{ marginBottom: "30px" }}>
          <Paper className={`faq-card ${classes.root}`}>
            <button class="accordion">
              <h3 className="faq-question">
                what do the different color bubbles mean?
              </h3>
            </button>
              <div class="panel">
                <p className="faq-answer">
                  ummm...
                </p>
              </div>
          </Paper>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <Paper className={`faq-card ${classes.root}`}>
            <button class="accordion">
              <h3 className="faq-question">
                is the website free?
              </h3>
            </button>
              <div class="panel">
                <p className="faq-answer">
                  Absolutely!
                </p>
              </div>
          </Paper>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <Paper className={`faq-card ${classes.root}`}>
            <button class="accordion">
              <h3 className="faq-question">
                who can use the website?
              </h3>
            </button>
              <div class="panel">
                <p className="faq-answer">
                  Anyone! Even your dog! :)
                </p>
              </div>
          </Paper>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <Paper className={`faq-card ${classes.root}`}>
            <button class="accordion">
              <h3 className="faq-question">
                if i don't know the exact address , is that okay? 
              </h3>
            </button>
              <div class="panel">
                <p className="faq-answer">
                  yes, but an approximation would be helpful
                </p>
              </div>
          </Paper>
        </div>

        {faqDesc && (
          <DisplayFaq
            user={user}
            classes={classes}
            data={faqDesc}
            deletefaqDesc={deletefaqDesc}
            editfaqDesc={editfaqDesc}
            updateFAQ={updateFAQ}
            showEditForm={showEditForm}
            setshowEditForm={setshowEditForm}
            backUpFaq={backUpFaq}
            setbackUpFaq={setbackUpFaq}
            toggle={toggleComment}
            shownComments={shownComments}
            revertChange={revertChange}
          />
        )}

        {showAddForm && (
          <NewFaq
            classes={classes}
            addFaq={addFaq}
            createNewfaq={createNewfaq}
            setNewfaq={setNewfaq}
          ></NewFaq>
        )}
      </div>
    </div>
  );
}

function DisplayFaq(props) {
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, user } = auth;

  let canEdit = false;

  if(isAuthenticated) {
      if(user.is_administrator) {
          canEdit = true;
      }
  }

  return (
    <>
      {props.data.map((faq) => {
        return (
          <div key={faq.id}>
            <div style={{ marginBottom: "30px" }}>
            <Paper className={`faq-card ${props.classes.root}`}>
                <h3 className="faq-question">
                  Q: {faq.faqQuestionDesc}
                </h3>
                <p className="faq-answer">A: {faq.faqAnswerDesc}</p>
                {canEdit ? (
                    <>
                     <button onClick={() => props.deletefaqDesc(faq.id)}>
                      Delete
                    </button>
                    <button onClick={() => props.toggle(faq.id)}>
                      Toggle Edit Form
                    </button>
                    {props.shownComments[faq.id] ? (
                      <>
                        {" "}
                        <EditFAQ
                          id={faq.id}
                          question={faq.faqQuestionDesc}
                          answer={faq.faqAnswerDesc}
                          onChange={props.updateFAQ}
                        ></EditFAQ>
                        <p>
                          <button onClick={() => props.editfaqDesc(faq.id)}>
                            Save
                          </button>
                          <button onClick={() => props.revertChange(faq.id)}>
                            Revert
                          </button>
                        </p>
                      </>
                    ) : null}
                    </>
                ) : null}
              </Paper>
            </div>
          </div>
        );
      })}
    </>
  );
}

function EditFAQ(props) {
  return (
    <p>
      <TextField
        name="faqQuestionDesc"
        onChange={(e) => props.onChange(e, props.id)}
        placeholder="Question"
        value={props.question}
      ></TextField>
      <Divider />
      <TextField
        name="faqAnswerDesc"
        value={props.answer}
        onChange={(e) => props.onChange(e, props.id)}
      ></TextField>
    </p>
  );
}

function NewFaq(props) {
  return (
    <form onSubmit={props.addFaq}>
      <Paper className={props.classes.root}>
        <TextField
          onChange={(e) =>
            props.setNewfaq({
              ...props.createNewfaq, //so u can keep the other value for answer
              faqQuestionDesc: e.target.value, // so u wont get object object
            })
          }
          value={props.createNewfaq.faqQuestionDesc}
        ></TextField>

        <Divider />
        <TextField
          onChange={(e) =>
            props.setNewfaq({
              ...props.createNewfaq,
              faqAnswerDesc: e.target.value,
            })
          }
          value={props.createNewfaq.faqAnswerDesc}
        ></TextField>
        <button>Submit</button>
      </Paper>
    </form>
  );
}
