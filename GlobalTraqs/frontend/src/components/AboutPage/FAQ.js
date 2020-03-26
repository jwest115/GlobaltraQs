import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { TextField, Divider } from "@material-ui/core";
import { useSelector, useDispatch, useStore } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));
export default function FAQ() {
  const [faqDesc, setfaqDesc] = useState();
  const [createNewfaq, setNewfaq] = useState({
    faqQuestionDesc: "",
    faqAnswerDesc: ""
  });
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/faq/")
      .then(response => {
        // handle success
        setfaqDesc(response.data);
        setisLoading(false);
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }, []);

  function updateFAQ(e, id) {
    setfaqDesc(
      faqDesc.map(faq =>
        faq.id === id ? { ...faq, [e.target.name]: e.target.value } : faq
      )
    );
  }

  function deletefaqDesc(id) {
    //e.preventDefault() for edit function post for new data patch for editing data
    axios
      .delete(`/api/faq/${id}/`)
      .then(response => {
        console.log(response.data);
        setfaqDesc(faqDesc.filter(desc => desc.id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  }

  function editfaqDesc(id) {
    axios.patch(`/api/faq/${id}/`).then(response => {
      console.log(response.data);
    });
  }

  function addFaq(e) {
    e.preventDefault();
    console.log(createNewfaq);

    axios
      .post(`/api/faq/`, createNewfaq)
      .then(response => {
        console.log(response.data);
        setfaqDesc([...faqDesc, response.data]);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const classes = useStyles();
  return (
  <div className={"main-content-div"}>
    <div className="card card-body mt-4 mb-4">
      <div style={{ marginBottom: "30px" }}>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            Q: What if I don't want to give an exact location?
          </Typography>
          <Typography component="p">
            A: Not a problem! Give as much, or as little location information as
            you'd like. We just ask that you give us at least a city/region and
            country, since the purpose of this site is to see stories located
            around the world.
          </Typography>
        </Paper>
      </div>
      <div style={{ marginBottom: "30px" }}>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            Q: I'm straight, but have a lot of LGBTQ friends. Can I post stories
            too?
          </Typography>
          <Typography component="p">
            A: Of course, as long as it has something to do with your connection
            to LGBTQ communities or individuals.
          </Typography>
        </Paper>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            Q: How long or short do stories have to be?
          </Typography>
          <Typography component="p">
            A: As long or as short as you want them to be.
          </Typography>
        </Paper>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            Q: What do the different color pins mean?
          </Typography>
          <Typography component="p">
            A: Lavender/purple pins are personal stories. Green pins are
            community histories, or stories that have significance to LGBTQ
            communities on a scale larger than the individual. For example,
            Stonewall would be considered a community story, as would, say, the
            legalization of gay marriage in California, or the first lesbian
            couple to get married (quite publically) in Taiwan. Red pins are
            current locations of active organizations and resources for LGBTQ
            individuals.
          </Typography>
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
        />
      )}
      <button>Add New Form</button>
      <NewFaq
        classes={classes}
        addFaq={addFaq}
        createNewfaq={createNewfaq}
        setNewfaq={setNewfaq}
      ></NewFaq>
    </div>
  </div>
  );
}

function DisplayFaq(props) {
  const auth = useSelector(state => state.auth);
  const { isAuthenticated, user } = auth;

  return (
    <>
      {props.data.map((faq, index) => {
        return (
          <div key={faq.id}>
            <div style={{ marginBottom: "30px" }}>
              <Paper className={props.classes.root}>
                <Typography variant="h5" component="h3">
                  Q: {faq.faqQuestionDesc}
                </Typography>
                <Typography component="p">A: {faq.faqAnswerDesc}</Typography>

                <button onClick={e => props.deletefaqDesc(faq.id)}>
                  Delete
                </button>
                <button onClick={e => props.editfaqDesc(faq.id)}>Edit</button>
                <EditFAQ
                  id={faq.id}
                  question={faq.faqQuestionDesc}
                  answer={faq.faqAnswerDesc}
                  onChange={props.updateFAQ}
                ></EditFAQ>
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
    <form>
      <TextField
        name="faqQuestionDesc"
        onChange={e => props.onChange(e, props.id)}
        value={props.question}
      ></TextField>
      <Divider />
      <TextField
        name="faqAnswerDesc"
        value={props.answer}
        onChange={e => props.onChange(e, props.id)}
      ></TextField>
      <button> Save Edit </button>
    </form>
  );
}

function NewFaq(props) {
  return (
    <form onSubmit={props.addFaq}>
      <Paper className={props.classes.root}>
        <TextField
          onChange={e =>
            props.setNewfaq({
              ...props.createNewfaq, //so u can keep the other value for answer
              faqQuestionDesc: e.target.value // so u wont get object object
            })
          }
          value={props.createNewfaq.faqQuestionDesc}
        ></TextField>

        <Divider />
        <TextField
          onChange={e =>
            props.setNewfaq({
              ...props.createNewfaq,
              faqAnswerDesc: e.target.value
            })
          }
          value={props.createNewfaq.faqAnswerDesc}
        ></TextField>
        <button>Submit</button>
      </Paper>
    </form>
  );
}
