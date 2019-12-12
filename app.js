//app.js
App({
  globalData: {
    baseUrl: 'http://fengtoos.ittun.com/',
    userInfo: null,
    openid: null,
    client_id: 'client_1',
    client_secret: '123456',
    servertoken: null,
    serverid: null,
    oauth:{
      grant_type: 'client_credentials',
      scope: 'select',
      client_id: 'client_1',
      client_secret: '123456'
    }
  },
  onLaunch: function () {
    //云开发初始化
    wx.cloud.init({
      env: 'fengtoos-lwuj1',
      traceUser: true,
    })
    this.db = wx.cloud.database(); //云数据库初始化
    this.getOpenid();
  },
  getOpenid: function () {
    var app = this;
    var openidStor = wx.getStorageSync('openid');
    if (openidStor) {
      console.log('本地获取openid:' + openidStor);
      app.globalData.openid = openidStor;
      app._getUserInfo();
      app._getServerToken();
    } else {
      wx.cloud.callFunction({
        name: 'getOpenid',
        complete: res => {
          console.log('云函数获取到的openid: ', res.result.openId)
          var openid = res.result.openId;
          wx.setStorageSync('openid', openid)
          app.globalData.openid = openid;
          app._getUserInfo();
        }
      })
    }
  },
  _getServerToken: function () {
    var app = this;
    var tokenInfo = wx.getStorageSync('servertoken')
    if (tokenInfo.token && (new Date().getTime() < tokenInfo.time)){
      app.globalData.servertoken = tokenInfo.token;
    } else {
      wx.request({
        url: app.globalData.baseUrl + 'oauth/token?' + app.globalData.openid,
        method: 'get',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        data: app.globalData.oauth,
        success: function (res) {
          app.globalData.servertoken = res.data.access_token
          var sync = {};
          sync['token'] = res.data.access_token
          sync['time'] = res.data.expires_in * 1000 + new Date().getTime()
          wx.setStorageSync('servertoken', sync)
        }
      })
    }
  },
  // 获取用户信息，如果用户没有授权，就获取不到
  _getUserInfo: function () {
    var app = this;
    wx.getUserInfo({ //从网络获取最新用户信息
      success: function (res) {
        var user = res.userInfo;
        user.openid = app.globalData.openid;
        app.globalData.userInfo = user;
        console.log('请求获取user成功')
        console.log(user)
        app._saveUserInfo(user);
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        if (app.userInfoReadyCallback) {
          app.userInfoReadyCallback(res)
        }
      },
      fail: function (res) { //请求网络失败时，再读本地数据
        console.log('请求获取user失败')
        var userStor = wx.getStorageSync('user');
        if (userStor) {
          console.log('本地获取user')
          app.globalData.userInfo = userStor;
        }
      }
    })
  },
  // 保存userinfo
  _saveUserInfo: function (user) {
    this.globalData.userInfo = user;
    this._getMyUserInfo();
  },
  //获取自己后台的user信息
  _getMyUserInfo() {
    let app = this
    let userInfo = app.globalData.userInfo;
    wx.request({
      url: app.globalData.baseUrl + 'user/wx/' + app.globalData.openid,
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        avatarUrl: app.globalData.userInfo.avatarUrl,
        nickname: app.globalData.userInfo.nickName
      },
      success: function (res) {
        app.globalData.serverid = res.data.payload
      }
    })
    //缓存到sd卡里
    wx.setStorageSync('user', userInfo);
  },
  /*onPullDownRefresh: function () {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    });
    Console.log('xialale')
  }*/
})