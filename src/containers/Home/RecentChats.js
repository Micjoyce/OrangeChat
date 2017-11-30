import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
} from 'react-native';


class RecentChats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: 'wss://gl.clchat.com/websocket',
      createTm: 0,
      openTm: 0,
      connectedTm: 0,
      err: ''
    }
    this.ws = null;
  }
  createSocket = () => {
    const timer = new Date();
    this.ws = new WebSocket(this.state.url);
    const createTm = new Date() - timer;
    this.setState({
      createTm,
      err: '',
    });
    this.ws.onopen = () => {
        // 打开一个连接
        const openTm = new Date() - timer;
        this.setState({
          openTm
        });
        this.ws.send(JSON.stringify({
            msg: "connect",
            version: "1",
            support: ["1"]
        }));
    };
    
    this.ws.onmessage = (e) => {
        try {
          const message = JSON.parse(e.data);
          console.log(message);
          if (message.msg === "connected") {
            const connectedTm = new Date() - timer;
            this.setState({
              connectedTm,
            });
          }
        } catch (error) {
          this.setState({
            err: 'onmessage' + JSON.stringify(error)
          })
        }
    };
    
    this.ws.onerror = (e) => {
      // 发生了一个错误
      this.setState({
        err: 'onerror' + JSON.stringify(e)
      })
    };
    
    this.ws.onclose = (e) => {
      console.log(e);
      // 连接被关闭了
      this.setState({
        err: 'onclose',
        createTm: 0,
        openTm: 0,
        connectedTm: 0,
      })
    };
  }

  close = () => {
    /*
    *   Avoid throwing an error if `rawSocket === null`
    */
    if (this.ws) {
      this.ws.close();
    }
  }

  setDdpPro = () => {
    this.setState({
      url: 'wss://gl.clchat.com/websocket',
    });
  }
  setDdpDev = () => {
    this.setState({
      url: 'ws://139.224.34.238:18080/websocket',
    });
  }
  setDdpProTest = () => {
    this.setState({
      url: 'ws://139.196.252.87:9011/websocket',
    });
  }
  testRocketDemo = () => {
    this.setState({
      url: 'wss://demo.rocket.chat/websocket',
    });
  }

  goToChatDetail = () => {
    const { navigate } = this.props.navigation;
    if (navigate) {
      navigate('ChatRoom', { user: 'Lucy' })
    }
  }
  gotoNews = () => {
    const { navigate } = this.props.navigation;
    if (navigate) {
      navigate('NewsDetail', { user: 'Lucy' })
    }
  }

  updateText = (text) => {
    this.setState((state) => {
      return {
        txtUrl: text,
      };
    });
  }

  setCustomUrl = () => {
    this.setState((state) => {
      return {
        url: state.txtUrl,
      };
    });
  }


  render() {
    return (
      <View>
        <Text>
          RecentChats
        </Text>
        <Button
          onPress={this.goToChatDetail}
          title={'go to chat detail'}
        >
        </Button>
        <Button
          onPress={this.gotoNews}
          title={'go to news detail'}
        >
        </Button>
        <Button
          onPress={this.setDdpPro}
          title={'wss://gl.clchat.com/websocket'}
        >
        </Button>
        <Button
          onPress={this.setDdpProTest}
          title={'ws://139.196.252.87:9011/websocket'}
        >
        </Button>
        <Button
          onPress={this.setDdpDev}
          title={'ws://139.224.34.238:18080/websocket'}
        >
        </Button>
        <Button
          onPress={this.testRocketDemo}
          title={'wss://demo.rocket.chat/websocket'}
        >
        </Button>
        <View>
          <TextInput
            placeholder="输入自定义ddp服务器地址"
            style={{padding: 0}}
            underlineColorAndroid="transparent"
            onChange={(event) => this.updateText(event.nativeEvent.text)}
          />
          <Button
            onPress={this.setCustomUrl}
            title={'使用输入的地址'}
          >
          </Button>
        </View>
        <Button
          onPress={this.createSocket}
          title={'创建ddp链接'}
        >
        </Button>
        <Button
          onPress={this.close}
          title={'断开ddp链接'}
        >
        </Button>
        <View>
          <Text>createTm:{this.state.url}</Text>
          <Text>createTm:{this.state.createTm}</Text>
          <Text>openTm:{this.state.openTm}</Text>
          <Text>connectedTm:{this.state.connectedTm}</Text>
          <Text>err:{this.state.err}</Text>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(RecentChats);