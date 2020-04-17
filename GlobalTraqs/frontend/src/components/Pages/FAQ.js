import React, { useState, useEffect } from "react";
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
    <div className="mt-4 mb-4">
        <div style={{ marginBottom: "30px" }}>
          <Paper className={classes.root}>
            <h3 className="faq-question">
              Q: What if I don't want to give an exact location?
            </h3>
            <p className="faq-answer">
              A: Not a problem! Give as much, or as little location information
              as you'd like. We just ask that you give us at least a city/region
              and country, since the purpose of this site is to see stories
              located around the world.
            </p>
          </Paper>
        </div>
        <div style={{ marginBottom: "30px" }}>
          <Paper className={classes.root}>
            <h3 className="faq-question">
              Q: I'm straight, but have a lot of LGBTQ friends. Can I post
              stories too?
            </h3>
            <p className="faq-answer">
              A: Of course, as long as it has something to do with your
              connection to LGBTQ communities or individuals.
            </p>
          </Paper>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <Paper className={classes.root}>
            <h3 className="faq-question">
              Q: How long or short do stories have to be?
            </h3>
            <p className="faq-answer">
              A: As long or as short as you want them to be.
            </p>
          </Paper>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <Paper className={classes.root}>
            <h3 className="faq-question">
              Q: What do the different color pins mean?
            </h3>
            <p className="faq-answer">
              A: Lavender/purple pins are personal stories. Green pins are
              community histories, or stories that have significance to LGBTQ
              communities on a scale larger than the individual. For example,
              Stonewall would be considered a community story, as would, say,
              the legalization of gay marriage in California, or the first
              lesbian couple to get married (quite publically) in Taiwan. Red
              pins are current locations of active organizations and resources
              for LGBTQ individuals.
            </p>
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

  return (
    <>
      {props.data.map((faq) => {
        return (
          <div key={faq.id}>
            <div style={{ marginBottom: "30px" }}>
              <Paper className={props.classes.root}>
                <h3 className="faq-question">
                  Q: {faq.faqQuestionDesc}
                </h3>
                <p className="faq-answer">A: {faq.faqAnswerDesc}</p>
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
