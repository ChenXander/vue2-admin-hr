<template>
  <!-- 图片上传组件 -->
  <div>
    <!-- 上传到腾讯云，需要自定义的上传方式，action给个#防止报错 -->
    <el-upload
      action="#"
      list-type="picture-card"
      :limit="1"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :file-list="fileList"
      :class="{ disabled: fileComputed }"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <!-- 上传进度条 -->
    <el-progress
      v-if="showPercent"
      style="width: 180px"
      :percentage="percent"
    />
    <!-- 预览弹出层 -->
    <el-dialog title="图片预览" :visible.sync="showDialog">
      <img :src="imgUrl" style="width: 100%" alt="" />
    </el-dialog>
  </div>
</template>

<script>
// 腾讯云的js sdk包
import COS from 'cos-js-sdk-v5'

const cos = new COS({
  SecretId: 'AKIDjNq7AyXs35xd8PREm6HH5h7IDtKbidNv',
  SecretKey: 'NUM3av2tUqwnOlx0sX0FEJAmEWcWFjyx'
})

export default {
  data () {
    return {
      fileList: [], // 图片地址设置为数组
      showDialog: false, // 控制显示弹层
      imgUrl: '',
      currentFileUid: '', // 当前上传的uid
      percent: 0, // 当前的百分比
      showPercent: false // 控制显示进度条
    }
  },
  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
    fileComputed () {
      return this.fileList.length === 1
    }
  },
  methods: {
    // 预览图片
    preview (file) {
      // 这里应该弹出一个层 层里是点击的图片地址
      this.imgUrl = file.url
      this.showDialog = true
    },
    // 删除文件
    handleRemove (file) {
      // file是点击删除的文件
      //   将原来的文件给排除掉了 剩下的就是最新的数组了
      this.fileList = this.fileList.filter((item) => item.uid !== file.uid)
    },
    // 修改文件时触发
    // 此时可以用fileList 因为该方法会进来很多遍 不能每次都去push
    // fileList因为fileList参数是当前传进来的最新参数 我们只需要将其转化成数组即可 需要转化成一个新的数组
    // [] => [...fileList] [] => fileList.map()
    // 上传成功之后 还会进来 需要实现上传代码的逻辑 这里才会成功
    changeFile (file, fileList) {
      this.fileList = fileList.map((item) => item)
    },
    // 文件上传的检查
    beforeUpload (file) {
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false // 上传终止
      }
      //  检查大小 5M: 1M = 1024KB; 1KB = 1204B
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      // 已经确定当前上传的就是当前的这个file了
      this.currentFileUid = file.uid
      this.showPercent = true
      // 最后一定要返回true
      return true
    },

    // 自定义上传动作 有个参数 有个file对象，是我们需要上传到腾讯云服务器的内容
    upload (params) {
      if (params.file) {
        // 执行上传操作
        cos.putObject(
          {
            // 上传到腾讯云 =》 哪个存储桶 哪个地域的存储桶 文件  格式  名称 回调
            Bucket: 'cx-icon-1253978799', // 存储桶
            Region: 'ap-nanjing', // 地域
            Key: params.file.name, // 文件名
            Body: params.file, // 要上传的文件对象
            StorageClass: 'STANDARD', // 上传的模式类型 直接默认 标准模式即可
            // 进度条
            onProgress: (params) => {
              this.percent = params.percent * 100
            }
          },
          function (err, data) {
            // data返回数据之后 应该如何处理
            console.log(err || data)
            // data中有一个statusCode === 200 的时候说明上传成功
            if (!err && data.statusCode === 200) {
              // 此时说明文件上传成功 要获取成功的返回地址
              // fileList才能显示到上传组件上 此时我们要将fileList中的数据的url地址变成 现在上传成功的地址
              // 需要知道当前上传成功的是哪一张图片
              this.fileList = this.fileList.map((item) => {
                // uid等于刚刚记录下来的id
                if (item.uid === this.currentFileUid) {
                  // 将成功的地址赋值给原来的url属性
                  // upload 为true 表示这张图片已经上传完毕
                  return { url: 'http://' + data.Location, upload: true }
                  // 保存  => 图片有大有小 => 上传速度有快又慢 =>要根据有没有upload这个标记来决定是否去保存
                }
                return item
              })
              setTimeout(() => {
                this.showPercent = false // 隐藏进度条
                this.percent = 0 // 进度归0
              }, 2000)
              // 将上传成功的地址 回写到了fileList中 fileList变化  => upload组件 就会根据fileList的变化而去渲染视图
            }
          }
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
