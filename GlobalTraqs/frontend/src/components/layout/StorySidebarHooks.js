import React, { useState} from "react";
import { useDispatch } from "react-redux";

import Sidebar from "react-sidebar";
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Markup } from 'interweave';
import Moment from "react-moment";

function StorySidebar(props)  {
    const [sidebarOpen, setSidebarOpen] = useState(false);

   const onSetSidebarOpen = (open) => {
       setSidebarOpen({ sidebarOpen: open });
    };

   let canManagePin = false;
   if (props.isAuthenticated) {
      if (props.pinData && props.user.id == props.pinData.owner || props.userRoleVerified) {
        canManagePin = true;
      }
   }

   console.log("SIDE BAR IS " + props.storySidebarOpen);
   if(props.storySidebarOpen) {
       return (
           <Sidebar
               sidebar={
                   <div>
                       {/* pin cluster - loop through markers and show them in the sidebar*/}
                       {props.pinData.length > 1 ? (
                            <div>
                                {props.pinData.map((story, index) => {
                                    return (
                                    <Card>
                                        <Link
                                            style={{ textDecoration: 'inherit'}}
                                            to={`story/${story.options.data.id}`}
                                            params={{ testvalue: "hello" }}
                                        >
                                      <CardActionArea>
                                        <CardContent>
                                          <Typography gutterBottom variant="h5" component="h2">
                                            {story.options.data.title}
                                          </Typography>
                                          <Typography variant="body2" color="textSecondary">
                                            <Markup content={story.options.data.description}/>
                                          </Typography>
                                        </CardContent>
                                      </CardActionArea>
                                      </Link>
                                    </Card>
                                    );
                                })}
                            </div>

                           ) :
                       //   not a pin cluster - show the individual story data
                       props.pinData ? (
                           <div>
                               <h1>{props.pinData.title}</h1>
                               <h5>By: {props.pinData.is_anonymous_pin ? "Anonymous" : props.pinData.username}</h5>
                               {props.pinData.startDate ? <Moment format="MM/DD/YYYY">{props.pinData.startDate}</Moment> : "No Start Date"} -{" "}
                               {props.pinData.endDate ? <Moment format="MM/DD/YYYY">{props.pinData.endDate}</Moment> : "No End Date"}{" "}
                               <br/>
                               <br/>
                               <Markup content={props.pinData.description}/>
                                 <Link to={`${props.maplink}/${props.pinData.id}`}>
                                <button
                                  type="button"
                                  className="btn btn-primary btn-sm"
                                >
                                  View Story
                                </button>
                                 </Link>
                           </div>

                       ) : null}
                       {/* show edit/ delete button for story owners and admins/moderators */}
                       {!props.pinCluster && canManagePin ? (
                           <div>
                               <div className="admin-moderator-edit">
                                   <button
                                       type="button"
                                       className="btn btn-primary btn-sm"
                                       onClick={e =>
                                           props.seteditpinmodalState(!props.editpinmodalState)
                                       }
                                   >
                                       Edit
                                   </button>
                               </div>
                               <button
                                   type="button"
                                   className="btn btn-primary btn-sm"
                                   onClick={e =>
                                       props.setDeleteConfirmation(!props.deleteConfirmation)
                                   }
                               >
                                   Delete
                               </button>
                           </div>
                           ) : null }
                   </div>
               }
               open={props.storySidebarOpen}
               pullRight={true}
               styles=
                   {{
                       sidebar: {background: "white", width: "40%", padding: "20px"},
                       overlay: {
                           position: "absolute",
                           visibility: "hidden",
                           transition: "none",
                           backgroundColor: "transparent"
                       }
                   }}
           >
           </Sidebar>
       );
   }
   else {
       return null;
   }
}

export default StorySidebar;