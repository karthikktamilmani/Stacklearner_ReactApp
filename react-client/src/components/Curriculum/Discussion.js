import React, { Component } from "react";
import axios from "../../authentication/axios-user-management";
import Auth from "../../authentication/Auth";

class Discussion extends Component {
  constructor(props) {
    super(props);
    this.replyOptions = { isNested: true };

    this.state = {
      newComment: "",
      isOpen: false,
      discussion: props.details,
      repliesCount: props.details.replies ? props.details.replies.length : 0,
      likes: props.details.likes ? props.details.likes.length : 0,
      isLiked: props.details.likes
        ? props.details.likes.includes(Auth.user._id)
        : false,
    };

    this.openReply = this.openReply.bind(this);
    this.addComment = this.addComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  addComment() {
    const { _id } = this.props.details;
    const reply = {
      content: this.state.newComment,
      authorID: Auth.user._id,
      authorName: `${Auth.user.firstName} ${Auth.user.lastName}`,
      discussionID: _id
    };

    axios
      .post(`discussion/comment`, reply)
      .then((response) => {
        if (response.data.status === "success") {
          let { repliesCount, discussion } = this.state;

          discussion.replies.push(reply);
          this.setState({
            discussion,
            newComment: "",
            repliesCount: repliesCount++,
          });
        }
      })
      .catch((error) => {
        alert("Failed");
      });
  }

  toggleLike() {
    const { _id } = this.props.details;

    axios
      .post(`discussion/likes?discussionID=${_id}&userID=${Auth.user._id}`)
      .then((response) => {
        if (response.data.status === "success") {
          let { isLiked, likes } = this.state;
          if (isLiked) {
            likes--;
          } else {
            likes++;
          }

          this.setState({
            likes,
            isLiked: !isLiked,
          });
        }
      })
      .catch((error) => {
        alert("Failed");
      });
  }

  openReply() {
    this.setState({
      isOpen: true,
    });
  }

  render() {
    let displayReplies = [];
    if (!this.props.isNested) {
      displayReplies = this.state.discussion.replies.map((reply, index) => {
        return <Discussion key={index} details={reply} isNested="true" />;
      });
    }

    return (
      <div className="comment py-3 col-sm-12">
        <div className="media">
          <div className="media-left">
            <i className="fa fa-user" aria-hidden="true"></i>
          </div>
          <div className="media-body pl-1">
            <div className="col-sm pt-0">
              <div className="mb-2">
                <h6>{this.state.discussion.authorName}</h6>
                <div className="discussion-period">
                  {this.state.discussion.createdAt}
                </div>
              </div>
              <p>{this.state.discussion.content}</p>
              <div
                className="mt-2 options"
                style={this.props.isNested ? { display: "none" } : {}}
              >
                <i
                  className="far fa-heart like-icon"
                  style={this.state.isLiked ? { display: "none" } : {}}
                  onClick={this.toggleLike}
                ></i>
                <i
                  className="fas fa-heart like-icon"
                  style={!this.state.isLiked ? { display: "none" } : {}}
                  onClick={this.toggleLike}
                ></i>
                <span className="like ml-2">
                  {this.state.likes ? this.state.likes : ""}
                </span>
                <span className="separator">|</span>
                <button
                  type="button"
                  className="btn btn-link text-info"
                  onClick={this.openReply}
                >
                  Reply
                  <span
                    className="like ml-1"
                    style={!this.state.repliesCount ? { display: "none" } : {}}
                  >
                    ({this.state.repliesCount})
                  </span>
                </button>
              </div>
              {displayReplies}
              <div
                className="comment add-comment-section col-sm-12"
                style={
                  this.props.isNested || !this.state.isOpen
                    ? { display: "none" }
                    : {}
                }
              >
                <div className="media">
                  <div className="media-body pl-1 px-0">
                    <div className="col-sm py-0">
                      <textarea
                        placeholder="Reply to the discussion.."
                        className="form-control"
                        rows="2"
                        name="newComment"
                        value={this.state.newComment}
                        onChange={this.handleChange}
                      ></textarea>
                      <div className="btn-toolbar mt-3 justify-content-end">
                        <button
                          className="button button-medium button-green-outline"
                          onClick={this.addComment}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Discussion;
