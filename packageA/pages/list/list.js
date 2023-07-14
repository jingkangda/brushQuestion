// packageA/pages/list/list.js
// import * from "./photos"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "imgUrl": './photos/',
    "saveDir" : `${wx.env.USER_DATA_PATH}/my-directory`,

    "imagePaths": [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this;
    wx.getFileSystemManager().readdir({
      // dirPath: '/packageA/pages/list/photos/',
      dirPath: this.data.saveDir,
      success: function (res) {
        that.setData({
          imagePaths: res.files.map(i => this.dirPath +'/'+ i)
        });
        console.log(res.files);
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    });

  },
  clickImg: function (e) {
    console.log(e);
    // var imgUrl = this.data.imgUrl;
    // console.log((this.data.items.map(i => i.imageUrl)));
    console.log(this.data.imagePaths)
    wx.previewImage({
      urls: [this.data.imagePaths[e.target.id]], //需要预览的图片http链接列表，注意是数组l
      current: this.data.imagePaths[e.target.id], // 当前显示图片的http链接，默认是第一个
      success: function (res) {},
      fail: function (res) {},
      complete: function (res) {},
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log(this.data.imagePaths);

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
    wx.navigateTo({
      url: './list.wxml',
      success: function (res) {
      },
      fail: function (res) { },
      complete: function (res) { },
    })
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