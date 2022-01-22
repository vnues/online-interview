// pages/detail/index.js
import Toast from '@vant/weapp/toast/toast';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid: "",
    mdContent: "",
    isLoading: false,
    title:"",
  },
  onLike() {
    // 判断是否登录
    if (!app.globalData.userInfo) {
      // 未登录
      Toast.fail("请到个人中心登录")
      return
    }
    // 登录，是否激活？
    if (app.globalData.userInfo.active == 0) {
      // 未激活
      Toast.fail("请到个人中心我的收藏激活")
      return
    }
    // 已激活，发送
   wx.request({
     url: `${app.globalData.baseUrl}items/likecount/add`,
     data: {
       item_uuid: this.data.uuid,
       user_uuid: app.globalData.userInfo.uuid
     },
     success(res) {
       if (res.data.re_code !== "0") {
         Toast.fail("已收藏")
       } else {
         Toast.success("收藏成功")
       }
     }
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("页面加载：", options);
    this.setData({
      uuid: options.uuid,
      title: options.title,
      isLoading: true
    })
    let that = this
    // const eventChannel = this.getOpenerEventChannel()
    // eventChannel.on('fromMj', function(data) {
    //   console.log(data.data['content'])
    //   let obj = app.towxml(data.data['content'],'markdown',{});
    //   that.setData({
    //     mdContent: obj,
    //     isLoading: false
    //   });
    // })
    wx.request({
      url: `${app.globalData.baseUrl}items/count`,
      data: {
        uuid: this.data.uuid
      },
      success (res) {
        console.log(res.data.data)
        if (res.data.re_code === '0') {
          let obj = app.towxml(res.data.data['content'],'markdown',{
            // theme: 'dark'
            events: {
              tap:e => {
                console.log('tap:', e.currentTarget.dataset)
                // 在这里可以做图片点击预览... 
                // 在这里也可以长按复制
              }
            }
          });
          that.setData({
            isLoading: false,
            mdContent: obj,
            title: res.data.data['title']
          })
        }
      }
    })
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    console.log("das")
    return {
      title: this.data.title,
      path: `/pages/detail/index?uuid=${this.data.uuid}`
    }
  },
  onShareTimeline: function(res) {
    // 来自页面内转发按钮
    if (res.from === 'button') {
      console.log(res.target)
    }

    return {
      title: this.data.title,
      query:{
        uuid: this.data.uuid,
        type: this.data.type
      }
      // path: `/pages/detail/index?id=${this.data.id}&type=${this.data.type}`
    }
  }
})