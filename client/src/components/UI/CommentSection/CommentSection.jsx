import "./CommentSection.css";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import CommentIcon from "@mui/icons-material/Comment";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import { AuthContext } from "../../../context/AuthContext";
import { createLocComment, getLocComment } from "../../../api/comment";
import { useState, useContext, useEffect } from "react";
import { TransitionGroup } from "react-transition-group";

export const CommentSection = ({ currentLocId }) => {
  const dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const { user } = useContext(AuthContext);

  const [commentList, setCommentList] = useState([]);

  const [updateCommentList, setUpdateCommentList] = useState(true);

  const [commentText, setCommentText] = useState("");

  const onCommentTextChange = (e) => setCommentText(e.target.value);

  const handleCommentSubmit = async () => {
    await createLocComment(currentLocId, user._id, commentText);
    setCommentText("");
    setUpdateCommentList(!updateCommentList);
  };

  // Initialize
  const init = async () => {
    console.log(typeof currentLocId + ": " + currentLocId);
    const commentList = await getLocComment(currentLocId);
    var date = new Date(commentList.data[0].createdAt);
    console.log(date.toLocaleDateString("en-GB", dateOptions));
    console.log(commentList.data[0].uid.username);
    setCommentList(commentList.data);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCommentList]);

  return (
    <div id="comment-section">
      <Paper elevation={3} style={{ padding: "10px" }}>
        <div id="comment-title">
          <h1 style={{ textAlign: "center" }}>Comments</h1>
        </div>

        <div id="comment-ol">
            <List>
              <TransitionGroup>
                {commentList.map((comment) => (
                  <Collapse key={comment._id}>
                    <div class="comment-li">
                      <div class="comment-meta" style={{ padding: "5px" }}>
                        <h4>
                          {comment.uid.username}{" "}
                          <span>
                            @{" "}
                            {new Date(comment.createdAt).toLocaleDateString(
                              "en-GB",
                              dateOptions
                            )}
                          </span>{" "}
                        </h4>
                      </div>
                      <div>
                        <div class="comments-text">
                          <p>{comment.content}</p>
                        </div>
                      </div>
                      <Divider style={{ marginTop: "5px" }} />
                    </div>
                  </Collapse>
                ))}
              </TransitionGroup>
            </List>
        </div>

        <div id="comment-form-section" style={{ padding: "10px 0px 0px 0px" }}>
          <form>
            <Stack spacing={1}>
              <div>
                <TextField
                  id="comment-place-holder"
                  label="Leave a comment..."
                  multiline
                  rows={2}
                  style={{ width: "100%", height: "auto" }}
                  onChange={onCommentTextChange}
                  value={commentText}
                />
              </div>
              <Button
                id="comment-submit-button"
                variant="contained"
                startIcon={<CommentIcon />}
                onClick={handleCommentSubmit}
              >
                Comment
              </Button>
            </Stack>
          </form>
        </div>
      </Paper>
    </div>
  );
};
