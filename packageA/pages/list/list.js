// packageA/pages/list/list.js
// import * from "./photos"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "imgUrl": './photos/',
    "saveDir": `${wx.env.USER_DATA_PATH}/my-directory`,

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
          imagePaths: res.files.map(i => `${wx.env.USER_DATA_PATH}/my-directory/` + i)
        });
        console.log(res.files);
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    });

  },
  deletePhoto: function (e) {
    var index = e.currentTarget.dataset.index; // 获取当前点击的照片项的索引
    var imagePath = this.data.imagePaths[index]; // 根据索引获取对应的照片路径

    // 弹出确认删除的模态框
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这张照片吗？',
      success: (res) => {
        if (res.confirm) {
          // 用户点击了确定按钮
          // 执行删除操作
          // 调用删除函数或者发送请求到服务器删除照片
          // 删除成功后更新页面上的照片列表
          this.deletePhotoAtIndex(index);
        } else if (res.cancel) {
          // 用户点击了取消按钮
          // 可以不做任何操作或者给出提示信息
        }
      }
    });
  },

  deletePhoto: function (e) {
    var index = e.currentTarget.dataset.index; // 获取当前点击的照片项的索引
    var imagePath = this.data.imagePaths[index]; // 根据索引获取对应的照片路径

    // 弹出确认删除的模态框
    wx.showModal({
      title: '确认删除',
      content: '确定要删除这张照片吗？',
      success: (res) => {
        if (res.confirm) {
          // 用户点击了确定按钮
          // 执行删除操作
          this.deletePhotoAtIndex(index, imagePath);
        } else if (res.cancel) {
          // 用户点击了取消按钮
          // 可以不做任何操作或者给出提示信息
        }
      }
    });
  },

  deletePhotoAtIndex: function (index, imagePath) {
    // 删除文件
    wx.getFileSystemManager().unlink({
      filePath: imagePath,
      success: () => {
        console.log('文件删除成功');
        // 文件删除成功后更新页面上的照片列表

        // 获取当前的照片列表
        var imagePaths = this.data.imagePaths;

        // 从数组中移除被删除的照片路径
        imagePaths.splice(index, 1);

        // 更新页面上的照片列表
        this.setData({
          imagePaths: imagePaths
        });
      },
      fail: (res) => {
        console.log('文件删除失败', res);
        // 文件删除失败的处理逻辑，可以给出提示信息等
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
    setTimeout(() => {
      var that = this;
      wx.getFileSystemManager().readdir({
        // dirPath: '/packageA/pages/list/photos/',
        dirPath: this.data.saveDir,
        success: function (res) {
          that.setData({
            imagePaths: res.files.map(i => `${wx.env.USER_DATA_PATH}/my-directory/` + i)
          });
          console.log(res.files);
        },
        fail: function (res) {
          console.log(res.errMsg);
        }
      });

    }, 1000);


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