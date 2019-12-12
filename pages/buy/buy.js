//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    conHeight: 0,
    contentActive: 'type1',
    tabIndex: 0,
    // 统计商品数量和价格
    orderCount: {
      num: 0,
      money: 0
    },
    bottomFlag: false,
    // 提交的订单
    orders: true,
    menus: [
      { id: 1, menu: '菜单一' },
      { id: 2, menu: '菜单二' },
      { id: 3, menu: '菜单三' },
      { id: 4, menu: '菜单四' }
    ],
    // 商品列表
    items: [
      { id: 1, name: "菜单一", goods: [
          { id: 1, title: '湖南辣椒小炒肉1', price: 12, active: false, num: 1 },
          { id: 2, title: '湖南辣椒小炒肉2', price: 13, active: false, num: 1 },
          { id: 3, title: '湖南辣椒小炒肉3', price: 14, active: false, num: 1 },
          { id: 4, title: '湖南辣椒小炒肉4', price: 15, active: false, num: 1 },
      ]},
      {
        id: 2, name: "菜单二", goods: [
          { id: 5, title: '湖南辣椒小炒肉5', price: 15, active: false, num: 1 },
          { id: 6, title: '湖南辣椒小炒肉6', price: 15, active: false, num: 1 },
          { id: 7, title: '湖南辣椒小炒肉7', price: 15, active: false, num: 1 },
          { id: 8, title: '湖南辣椒小炒肉8', price: 12, active: false, num: 1 },
        ]
      },
      {
        id: 3, name: "菜单三", goods: [
          { id: 9, title: '湖南辣椒小炒肉9', price: 13, active: false, num: 1 },
          { id: 10, title: '湖南辣椒小炒肉10', price: 14, active: false, num: 1 },
          { id: 11, title: '湖南辣椒小炒肉11', price: 15, active: false, num: 1 },
          { id: 12, title: '湖南辣椒小炒肉12', price: 15, active: false, num: 1 },
        ]
      },
      {
        id: 4, name: "菜单四", goods: [
          { id: 13, title: '湖南辣椒小炒肉13', price: 12, active: false, num: 1 },
          { id: 14, title: '湖南辣椒小炒肉14', price: 13, active: false, num: 1 },
          { id: 15, title: '湖南辣椒小炒肉15', price: 14, active: false, num: 1 },
          { id: 16, title: '湖南辣椒小炒肉16', price: 15, active: false, num: 1 },
        ]
      }
    ]
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    setTimeout(() => {
      wx.showToast({
        title: '成功加载数据',
        icon: 'success',
        duration: 500
      });
      wx.stopPullDownRefresh()
    }, 500);
  },
  tabMenu: function (event) {
    let dataset = event.target.dataset;
    this.setData({
      tabIndex: dataset.index,
      contentActive: dataset.id
    });
  },
  // 点击去购物车结账
  card: function () {
    let that = this;
    // 判断是否有选中商品
    if (that.data.orderCount.num !== 0) {
      // 跳转到购物车订单也
      wx.redirectTo({
        url: '../order/order'
      });
    } else {
      wx.showToast({
        title: '您未选中任何商品',
        icon: 'none',
        duration: 2000
      })
    }
  },
  addOrder: function (event) {
    let that = this;
    let id = event.target.dataset.id;
    let index = event.target.dataset.index;
    let param = this.data.items[index];
    let subOrders = []; // 购物单列表存储数据
    param.active ? param.active = false : param.active = true;
    // 改变添加按钮的状态
    this.data.items.splice(index, 1, param);
    that.setData({
      items: this.data.items
    });
    // 将已经确定的菜单添加到购物单列表
    this.data.items.forEach(item => {
      if (item.active) {
        subOrders.push(item);
      }
    });
    // 判断底部提交菜单显示隐藏
    if (subOrders.length == 0) {
      that.setData({
        bottomFlag: false
      });
    } else {
      that.setData({
        bottomFlag: true
      });
    }
    let money = 0;
    let num = subOrders.length;
    subOrders.forEach(item => {
      money += item.price; // 总价格求和
    });
    let orderCount = {
      num,
      money
    }
    // 设置显示对应的总数和全部价钱
    this.setData({
      orderCount
    });
    // 将选中的商品存储在本地
    wx.setStorage({
      key: "orders",
      data: subOrders
    });
  },
  initWith: function(){
    var _this = this;
    //这里的绑定的高度是scroll - view的高度，因为我这里有240的head和150的foot，所以才减 - 240 - 150，请根据实际情况决定写法
    wx.getSystemInfo({
      success: function (res) {
        //将高度乘以换算后的该设备的rpx与px的比例
        let windowHeight = (res.windowHeight * (750 / res.windowWidth));
        //console.log(windowHeight) //最后获得转化后得rpx单位的窗口高度
        _this.setData({
          conHeight: windowHeight,
        })
      }
    })

    //获得每个元素据顶部的高度，组成一个数组，通过高度与scrollTop的对比来知道目前滑动到那个区域
    let heightArr = [];
    let h = 0;
    //创建节点选择器
    const query = wx.createSelectorQuery();
    //选择id
    query.selectAll('.goodslist').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为contlist的元素的信息 的数组
      res[0].forEach((item) => {
        h += item.height;
        heightArr.push(h);
      })
      _this.setData({
        heightArr: heightArr
      })
      console.log(heightArr)
    })
  },
  onScroll: function (e) {
    const scrollTop = e.detail.scrollTop;
    const scorllArr = this.data.heightArr;
    const _this = this;
    if (scrollTop >= scorllArr[scorllArr.length - 1] - (_this.data.conHeight / 2)) {
      return;
    } else {
      for (let i = 0; i < scorllArr.length; i++) {
        if (scrollTop >= 0 && scrollTop < scorllArr[0]) {
          if (0 != _this.data.lastActive) {
            _this.setData({
              tabIndex: 0,
              lastActive: 0,
            })
          }
        } else if (scrollTop >= scorllArr[i - 1] && scrollTop < scorllArr[i]) {
          if (i != _this.data.lastActive) {
            _this.setData({
              tabIndex: i,
              lastActive: i,
            })
          }

        }
      }
    }
  },
  onLoad: function () {
    this.initWith();
  }
})