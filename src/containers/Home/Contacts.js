import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import {ImageCache, CachedImage} from "../../lib/img-cache";

global.ImageCache = ImageCache;


class Contacts extends Component {
  constructor() {
    super();
    this.url = "https://gl.clchat.com/avatar/T8ZHrxWfwiikCSW6D.jpg"
  }
  componentDidMount() {
    // ImageCache.get().clear();
    // const observer = (path) => {
    //     console.log(`path of the image in the cache: ${path}`);
    // };
    // ImageCache.get().on({ uri: this.url }, observer);
    // setTimeout(() => {
    //   ImageCache.get().bust(this.url);
    // }, 2000)
  }
  render() {
    return (
      <View>
        <Text>
          Contacts
        </Text>
        <CachedImage style={{ width: 200, height: 200 }} source={{ uri: this.url }} />
      </View>
    );
  }
}


const mapStateToProps = (state) => {
  return {
  };
};

// pass Actions creators as props to AllCommentAboutMe
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);