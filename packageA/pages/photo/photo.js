// packageA/pages/photo/photo.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAuth: false,
    src: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    //console.log(that);
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
        console.log(this.data.src);
        wx.previewImage({
          current: res.tempImagePath, // 当前显示图片的http链接
          urls: [res.tempImagePath] // 需要预览的图片http链接列表
        })
        // 通过获取文件系统管理器实例
        const fileManager = wx.getFileSystemManager();

        // 指定存储目录
        const saveDir = `${wx.env.USER_DATA_PATH}/my-directory`;

        // 创建目录
        fileManager.mkdir({
          dirPath: saveDir,
          recursive: true,
          success: function (res) {
            console.log('目录创建成功');

            // 将图片保存到指定目录
            
          },
          fail: function (res) {
            console.log('目录创建失败：', res.errMsg);
          }
        });

        fileManager.saveFile({
          tempFilePath: res.tempImagePath,
          filePath: `${saveDir}/${res.tempImagePath.slice(30)}`,
          success: function (res) {
            var savedFilePath = res.savedFilePath;
            console.log('图片保存成功，路径为：', savedFilePath);
            // 这里可以将保存的图片路径保存到本地，或进行其他操作
          },
          fail: function (res) {
            console.log('图片保存失败：', res.errMsg);
          }
        });
      },
      fail: (err) => {
        console.log(err);
      },
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


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})