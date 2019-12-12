// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bg_mine: 'https://s2.ax1x.com/2019/09/24/uAtyo6.png',
    bg_icon: '../../image/my_portrait@2x.png',
    titles: [
      { name: '我的会员', icon: '../../image/my_member@2x.png' }, 
      { name: '我的收入', icon: '../../image/icon_earning_income@2x.png' }, 
      { name: '我的积分', icon: '../../image/my_integral@2x.png' }
    ],
    titles2: [
      { name: '待付款', icon: '../../image/my_no_pay@2x.png' },
      { name: '待发货', icon: '../../image/my_no_goods@2x.png' },
      { name: '待收货', icon: '../../image/my_no_receive@2x.png' },
      { name: '待评价', icon: '../../image/my_no_comment@2x.png' }
    ],
    titles3: [
      { name: '活动订单', icon: '../../image/icon_post_activity@3x.png', tips: "查询您参与的活动订单" },
      { name: '收货地址', icon: '../../image/my_address@2x.png', tips: "默认地址（按需要更改）" },
      { name: '我的积分', icon: '../../image/my_publish@2x.png', tips: "查询您的可用积分" },
      { name: '商家电话', icon: '../../image/my_publish@2x.png', tips: "点击拨打商家电话", action: "clickPhone" },
      { name: '预设功能', icon: '../../image/my_publish@2x.png', tips: "预设提示" }
    ],
    istrue: false
  },
  bindGetUserInfo: function(e){
    let user = e.detail.userInfo;
    if (user){

      //保存用户信息
      app.getOpenid();

      //关闭弹出
      this.closeDialog();
    }
  },
  closeDialog: function () {
    this.setData({
      istrue: false
    })
  },
  clickPhone: function () {
    wx.makePhoneCall({
      phoneNumber: '18825070249' //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!app.globalData.userInfo){
      this.setData({
        istrue: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})