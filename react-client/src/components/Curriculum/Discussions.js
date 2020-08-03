import React, {Component} from "react";
import axios from "../../authentication/axios-user-management";
import Discussion from "./Discussion";
import Auth from "../../authentication/Auth";

class Discussions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusCode: 200,
      newDiscussion: "",
      discussions: []
    };
    this.addDiscussion = this.addDiscussion.bind(this);
    this.getDiscussionsByProject = this.getDiscussionsByProject.bind(this);

  }

  getDiscussionsByProject = () => {

    const {projectID} = this.props;

    axios.get(`discussion/details?projectID=${projectID}`).then((response) => {
            this.setState({
                discussions: response.data.discussions
            });
        }).catch((error) => {
            console.log(`Following error was encountered: ${error}`);
            if (error.response) {
                this.setState({
                    statusCode: error.response.status
            });
        } else {
            this.setState({
                statusCode: 300
            });
        }
    });
  };

  componentDidMount() {
    this.getDiscussionsByProject();
  }

  addDiscussion() {
    const {projectID} = this.props;
    const discussion = {
      content: this.state.newDiscussion,
      authorID: Auth.user._id,
      authorName: `${Auth.user.firstName} ${Auth.user.lastName}`,
      projectID,
      replies:[]
    };
    axios
      .post(`discussion/details`, discussion)
      .then(response => {
        if(response.data.status === "success") {
          let {discussions} = this.state;
          discussion._id = response.data.key;
          discussions.push(discussion);
          this.setState({
            discussions,
            newDiscussion: ""
          });
        }
     
      })
      .catch(error => {
        alert("Failed");
      });
  }

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    const {discussions, statusCode, newDiscussion} = this.state;
    let displayDiscussion = [];
    let alertDIV = <div></div>;

    if (statusCode === 404) {
      alertDIV = (
        <div className="alert alert-primary" role="alert">
          We are working on adding discussions. Please check back soon.
        </div>
      );
    } else if (statusCode !== 404 && statusCode !== 200) {
      alertDIV = (
        <div className="alert alert-danger" role="alert">
          We encountered an error while loading your the discussions.
        </div>
      );
    } else if (statusCode === 200) {
      displayDiscussion = discussions.map((discussion, index) => {
        return <Discussion key={discussion._id} details={discussion} />;
      });
    }

    return (
      <div className="grid mt-2">
        {statusCode !== 200 ? alertDIV : displayDiscussion}
        <div className="comment add-comment-section col-sm-12 py-3">
          <div className="media">
            <div className="media-body pl-1 px-0">
              <div className="col-sm pt-0">
                <textarea
                  placeholder="Type here to post.."
                  className="form-control"
                  rows="4"
                  name="newDiscussion"
                  value={newDiscussion}
                  onChange={this.handleChange}
                  ></textarea>
                <div className="btn-toolbar mt-3 justify-content-end">
                  <button
                    className="button button-medium button-green-outline"
                    onClick={this.addDiscussion}
                    >
                    Start a Discussion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Discussions;
