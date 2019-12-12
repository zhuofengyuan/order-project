// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['../../image/banner2.jpg', '../../image/banner3.jpg', '../../image/banner4.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: false,
    interval: 2000,
    duration: 500,
    enums: [
      [{ icon: '../../image/icon_menu1_product@2x.png', title: '标题' }, 
       { icon: '../../image/icon_menu1_product@2x.png', title: '标题' }, 
       { icon: '../../image/icon_menu1_product@2x.png', title: '标题' }, 
       { icon: '../../image/icon_menu1_product@2x.png', title: '标题' }], 
      [{ icon: '../../image/icon_menu1_product@2x.png', title: '标题' }, 
       { icon: '../../image/icon_menu1_product@2x.png', title: '标题' },
       { icon: '../../image/icon_menu1_product@2x.png', title: '标题' }, 
       { icon: '../../image/icon_menu1_product@2x.png', title: '标题' }]
    ],
    logo1: '../../image/home_logo1.png'
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