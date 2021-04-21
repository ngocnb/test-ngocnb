import * as React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import FacebookLogin from "react-facebook-login";
import { Card, Image } from "react-bootstrap";
import Constants from "expo-constants";

import { FACEBOOK_APP_ID } from "@env";

import { facebookLogin, fetchCurrentUser, logOut } from "../../actions";
import { setCurrentUser } from "../../reducer";
import { store } from "../../store";
import "./Home.css";

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => {
      dispatch(setCurrentUser(user));
    },
    facebookLogin: (data) => {
      dispatch(facebookLogin(data));
    },
    fetchCurrentUser: () => {
      dispatch(fetchCurrentUser());
    },
    logOut: () => {
      dispatch(logOut());
    },
  };
};

function mapStateToProps(state) {
  const { token, currentUser } = state;
  return { token, currentUser };
}

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: false,
    };

    this.responseFacebook = this.responseFacebook.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  async componentDidMount() {
    if (this.props.token) {
      this.props.fetchCurrentUser();
      this.setState({
        login: true,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.token !== this.props.token &&
      this.props.token !== "null" &&
      this.props.token
    ) {
      this.props.fetchCurrentUser();
      this.setState({
        login: true,
      });
    }
  }

  responseFacebook(response) {
    if (response.accessToken) {
      this.props.facebookLogin({ token: response.accessToken });
    } else {
      this.setState({
        login: false,
      });
    }
  }

  handleLogOut() {
    this.props.logOut();
    this.setState({
      login: false,
    });
  }

  render() {
    return (
      <div className="container" id="home-container">
        <Card style={{ width: "600px" }}>
          <Card.Header className="text-center">
            {!this.state.login && (
              <FacebookLogin
                appId={FACEBOOK_APP_ID}
                fields="name,email,picture"
                scope="public_profile,user_friends,email"
                callback={this.responseFacebook}
                icon="fa-facebook"
              />
            )}
            {this.state.login && (
              <Image src={this.props.currentUser.picture} roundedCircle />
            )}
          </Card.Header>
          {this.state.login && (
            <Card.Body>
              <Card.Title>Hello {this.props.currentUser.name}</Card.Title>
              <Card.Text>
                Email:{" "}
                <span id="emailHere">{this.props.currentUser.email}</span>
              </Card.Text>
              <button className="btn btn-primary" onClick={this.handleLogOut}>
                Log out
              </button>
            </Card.Body>
          )}
        </Card>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
