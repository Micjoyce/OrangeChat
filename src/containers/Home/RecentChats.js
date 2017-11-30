import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  FlatList,
  AsyncStorage,
  Alert,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 10,
  }
});

const DEFAULT_URLS = [
  'wss://gl.clchat.com/websocket',
  'ws://139.224.34.238:18080/websocket',
  'ws://139.196.252.87:9011/websocket',
  'wss://demo.rocket.chat/websocket',
]

class RecentChats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: DEFAULT_URLS[0],
      createTm: 0,
      openTm: 0,
      connectedTm: 0,
      err: '',
      urls: DEFAULT_URLS,
    }
    this.ws = null;
  }

  componentDidMount() {
    this.initUrls();
  }
  initUrls = async () => {
    let urls = await AsyncStorage.getItem('urls');
    if (!urls) {
      urls = JSON.stringify(DEFAULT_URLS)
      await AsyncStorage.setItem('urls', urls);
    }
    let arrUrls;
    try {
      arrUrls = JSON.parse(urls);
    } catch (error) {
      arrUrls = DEFAULT_URLS;
    }
    this.setState({
      urls: arrUrls
    });
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

  activeUrl = (url) => {
    this.setState((state) => {
      return {
        url: url,
      };
    });
  }

  saveExtenalUrl = async () => {
    if (!this.state.txtUrl || /^ws/.test(this.state.txtUrl) === false) {
      Alert.alert(this.state.txtUrl + ' not a ddp url');
      return;
    }
    let urls = this.state.urls;
    urls.unshift(this.state.txtUrl);
    try {
      urls = JSON.stringify(urls);
      await AsyncStorage.setItem('urls', urls);
      this.activeUrl(this.state.txtUrl);
      const newUrls = JSON.parse(urls);
      this.setState({
        urls: newUrls
      })
    } catch (error) {
      Alert.alert('saveExtenalUrl' + JSON.stringify(error));
    }
  }

  clear = async () => {
    await AsyncStorage.clear();
    this.setState({
      urls: DEFAULT_URLS
    })
  }

  _keyExtractor = (item, index) => index + item;

  renderItem = ({item, index}) => {
    return (
      <Button
        onPress={() => {
          this.activeUrl(item)
        }}
        title={item}
      >
      </Button>
    );
  }

  render() {
    return (
      <View>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-around' }}
        >
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
        </View>
        <View>
            <TextInput
              placeholder="输入自定义ddp服务器地址"
              style={[{padding: 0}, styles.textInput]}
              underlineColorAndroid="transparent"
              onChange={(event) => this.updateText(event.nativeEvent.text)}
            />
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-around' }}
            >
              <Button
                onPress={this.saveExtenalUrl}
                title={'保存地址'}
              >
              </Button>
              <Button
                onPress={this.clear}
                title={'清除所有缓存'}
              >
              </Button>
            </View>
        </View>
        <View style={{height: 200}}>
          <FlatList
            data={this.state.urls}
            renderItem={this.renderItem}
            keyExtractor={this._keyExtractor}
          />
        </View>
        <View>
          <Button
            color="green"
            onPress={this.createSocket}
            title={'创建ddp链接'}
          >
          </Button>
          <Button
            color="red"
            onPress={this.close}
            title={'断开ddp链接'}
          >
          </Button>
        </View>
        <View>
          <Text>socket地址:{this.state.url}</Text>
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