
//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    background: '/pages/image/new_index.jpg',
    motto: '欢迎来到刷题小程序',
    enter: '开始答题',
    userInfo: {},
    hasUserInfo: false,
    num: 0,
    isAuth: false,
    src: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    menuClickFunctions: ['menuClick1', 'menuClick2', 'menuClick3', 'menuClick4', 'menuClick5'],
    menuOptions: [
      { value: 5, text: '题库5' },
      { value: 1, text: '题库1' },
      { value: 2, text: '题库2' },
      { value: 3, text: '题库3' },
      { value: 4, text: '题库4' }
    ],
    problems: [
      "../../packageA/pages/python/python",
      "../../packageA/pages/python2/python",
      "../../packageA/pages/python3/python",
      "../../packageA/pages/python4/python",
      "../../packageA/pages/python5/python"
    ]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../../packageB/pages/echarts/echarts'
    })
  },
  onLoad: function () {
    var that = this;
    //console.log(that);
    let base64 = wx.getFileSystemManager().readFileSync   (this.data.background, 'base64');
    that.setData({
      'background': 'data:image/png;base64,' + base64
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            
          })
        }
      })
    }
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.camera']) {
          // 用户已经授权
          that.setData({
            isAuth: true
          })
        } else {
          // 用户还没有授权，向用户发起授权请求
          wx.authorize({
            scope: 'scope.camera',
            success() { // 用户同意授权
              that.setData({
                isAuth: true
              })
            },
            fail() { // 用户不同意授权
              that.openSetting().then(res => {
                that.setData({
                  isAuth: true
                })
              })
            }
          })
        }
      },
      fail: res => {
        console.log('获取用户授权信息失败')
      }
    })

  },
   // 打开授权设置界面
   openSetting() {
    const that = this
    let promise = new Promise((resolve, reject) => {
      wx.showModal({
        title: '授权',
        content: '请先授权获取摄像头权限',
        success(res) {
          if (res.confirm) {
            wx.openSetting({
              success(res) {
                if (res.authSetting['scope.camera']) { // 用户打开了授权开关
                  resolve(true)
                } else { // 用户没有打开授权开关， 继续打开设置页面
                  that.openSetting().then(res => {
                    resolve(true)
                  })
                }
              },
              fail(res) {
                console.log(res)
              }
            })
          } else if (res.cancel) {
            that.openSetting().then(res => {
              resolve(true)
            })
          }
        }
      })
    })
    return promise;
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
        wx.previewImage({
          current: res.tempImagePath, // 当前显示图片的http链接
          urls: [res.tempImagePath] // 需要预览的图片http链接列表
        })
      }
    })
  },
  getUserInfo: function (e) {
    //console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  onPullDownRefresh: function () {
    var i = 0;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //模拟加载
    setTimeout(function () {
      // complete

      wx.navigateTo({
        url: '/pages/python/python',
        success: function (res) {
        },
        fail: function (res) { },
        complete: function (res) { },
      })
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  },
  menuClick1: function (e) {
    console.log(e)
    this.setData({
      _num: e.target.dataset.num
    })
  },

  menuClick2: function (e) {

    this.setData({
      _num: e.target.dataset.num
    })
  },
  menuClick3: function (e) {

    this.setData({
      _num: e.target.dataset.num
    })
  },
  menuClick4: function (e) {

    this.setData({
      _num: e.target.dataset.num
    })
  },
  menuClick5: function (e) {

    this.setData({
      _num: e.target.dataset.num
    })
  },
    onShareAppMessage: function () {

  },
  menuChange: function(e) {
    this.setData({
      num: e.detail.value,
      _num: e.target.value
    });
  }
  
})


