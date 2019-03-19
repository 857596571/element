<template>
    <div class="capture-box">
        <div class="capture-box-title">
            拍照上传
            <i class="el-icon-error" @click="cancel"></i>
        </div>
        <div class="capture-box-main">
            <div class="capture-box-main-video">
                <div class="main-video_">
                    <div id="non-video" class="non-video">
                        <img src="../images/non-video-icon.png"/>
                        <div class="title">没有连接到摄像头!</div>
                    </div>
                    <video id="video" ref="video" autoplay style="display:none"></video>
                    <video id="video_bak" style="width:640px; height:360px;background: black;" autoplay></video>

                </div>
                <!--<button id="btn-take-picture" @click="takePicture" style="display:block;">拍照</button>-->
                <a class="tab" @click="take_picture_handle" :style="$parent.navigatorStream && $parent.navigatorStream.active ? '' : 'background: #e8e8e8'"><img src="../images/cut-pic.png" />拍照</a>
                <a class="tab" @click="switchStream" style="margin-left: 10px;" :style="$parent.exArray.length > 1 ? '' : 'background: #e8e8e8'">切换摄像头</a>
                <a class="tab" @click="picturesOpen" style="margin-left: 10px;" :style="$parent.navigatorStream && $parent.navigatorStream.active && images_data.length > 0 ? '' : 'background: #e8e8e8'">下一步</a>
            </div>
            <i class="icon-scala" v-if="picturesBox == 'open'" @click="picturesClose">
                <svg viewBox="64 64 896 896" class="" data-icon="menu-fold" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 0 0 0 13.8z"></path></svg>
            </i>
            <i class="icon-scala" v-if="picturesBox != 'open'" @click="picturesOpen">
                <svg viewBox="64 64 896 896" class="" data-icon="menu-unfold" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"></path></svg>
            </i>
            <div style="width: 90px;position: absolute;top: 0;right: 17px;height:360px; overflow-y: scroll;">
                <div v-for="(item, index) in images_data" style="width: 80px;height:50px">
                    <img v-bind:src="item" width="80" @dblclick="preview = item;isPreview = true"/>
                    <i class="el-icon-error" @click="() => {delPicture(index)}" style="position: relative;top: -45px;left: 60px;"></i>
                </div>
            </div>
            <div id="pictures-box" class="pictures-box"
                 v-if="picturesBox == 'open'">


                <el-dialog class="pictures-box-dialog" :append-to-body="true" :visible.sync="progressDialog" width="130px" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
                    <el-progress type="circle" :percentage="~~(percentageValue / images_data.length * 50)"></el-progress>
                </el-dialog>
                <!--<canvas  id="canvas" width="122" height="122"></canvas>-->
                <div class="context">
                    <div v-for="(item, index) in images_data" class="picture">
                        <img v-bind:src="item" width="160" @dblclick="preview = item;isPreview = true"/>
                        <i class="el-icon-error" @click="() => {delPicture(index)}"></i>
                    </div>
                </div>
                <div class="save" @click="savePicture">
                    <el-select v-model="form.upload_category" style="width:150px" size="mini">
                        <el-option
                                v-for="item in type_options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <div class="btn"  @click="upload">保存</div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <el-dialog
                :visible.sync="isPreview"
                :append-to-body="true"
                :before-close="() => {isPreview = false}"
                title="预览"
                width="640px">
            <img v-bind:src="preview" style="width: 100%"/>
        </el-dialog>
        <el-dialog
                title="修改图片"
                :visible.sync="modify_dialog"
                width="70%"
                class="pictures-edit-dialog">
            <!--:before-close="handleClose"-->

            <div>
                <div class="left">
                    <div class="pic-list">
                        <a v-for="(item,key,index) in images_data">
                            <img v-bind:src="item" width="100"/>
                        </a>
                    </div>
                    <img v-bind:src="images_data[0]" width="640" height="360"/>
                    <el-button>撤销</el-button>
                    <el-button>剪裁</el-button>
                </div>
                <div class="right">
                    <ul>
                        <li>
                            预览
                        </li>
                        <li>
                            名称：
                            <el-input placeholder="请输入内容" width="100"></el-input>
                        </li>
                        <li>
                            加密级别：
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </li>
                        <li>
                            业务属性
                        </li>
                        <li>
                            客户数据
                        </li>
                        <li>
                            <el-button type="primary">保存</el-button>
                            <el-button>取消</el-button>
                        </li>
                    </ul>
                </div>
                <div class="clear"></div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  import ElButton from 'element-ui-qz/packages/button';
  import ElDialog from 'element-ui-qz/packages/dialog';
  import ElForm from 'element-ui-qz/packages/form';
  import ElFormItem from 'element-ui-qz/packages/form-item';
  import ElProgress from 'element-ui-qz/packages/progress';

  export default {
    name: 'capture',
    components: {
      ElButton,
      ElDialog,
      ElForm,
      ElFormItem,
      ElProgress
    },
    computed: {
      type_options() {
        return this.$parent.type_options;
      }
    },
    data: function() {
      return {
        modify_dialog: false,
        pictures_count: 1,
        images_data: [],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        form: {
          upload_category: 'KHWJ',
          upload_remark: ''
        },
        picturesBox: 'close',
        preview: undefined,
        isPreview: false,
        percentageValue: 0,
        progressDialog: false
      };
    },
    methods: {
      switchStream: function() {
        this.$parent.exArray.reverse();
        this.$parent.navigatorStream && this.$parent.navigatorStream.getTracks() && this.$parent.navigatorStream.getTracks()[0] && this.$parent.navigatorStream.getTracks()[0].stop();
        this.$parent.start_video();
      },
      take_picture_handle: function() { // 3703 x 2614
        if (!this.$parent.navigatorStream || !this.$parent.navigatorStream.active) {
          return;
        }
        let canvas_node = document.createElement('canvas');
        let video = this.$refs.video;
        canvas_node.width = 3703;
        canvas_node.height = 2614;
        let context = canvas_node.getContext('2d');
        context.drawImage(video, 0, 0, 3703, 2614);
        // base64
        let img_data = canvas_node.toDataURL('image/png');
        this.images_data.push(img_data);
        // this.form.imgData = img_data;
        console.log('capture---this.$parent', this.$parent);
      },
      open_modify_dialog: function() {
        this.modify_dialog = true;
      },
      cancel: function() {
        this.$parent.navigatorStream && this.$parent.navigatorStream.getTracks() && this.$parent.navigatorStream.getTracks()[0] && this.$parent.navigatorStream.getTracks()[0].stop();
        this.$parent.current_child_component = 'attachment-view';
      },
      delPicture: function(index) {
        this.images_data.splice(index, 1);
      },
      picturesClose: function() {
        this.picturesBox = 'close';
      },
      picturesOpen: function() {
        if (!this.$parent.navigatorStream || !this.$parent.navigatorStream.active || this.images_data.length === 0) {
          return;
        }
        this.picturesBox = 'open';
      },
      savePicture: function() {

      },
      save: function() {
        console.log('url', this.$parent.pre_interface_url + 'dataUpload');
        let url = this.$parent.pre_interface_url + 'dataUpload';
        this.$http.post(url, Object.assign({
          bus_type: this.form.upload_category,
          data: JSON.stringify(this.images_data)
        }, this.$parent.data), {
          emulateJSON: true
        }).then(function(response) {
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          });
          this.cancel();
          this.$parent.refresh_files_data();
        }, function(response) {

        });
      },
      upload: function() {
        if (!this.images_data || this.images_data.length === 0) {
          this.$message.warning('请先拍摄！');
          return;
        }
        let url = this.$parent.pre_interface_url + 'dataUpload';
        let upload_submit_url = this.$parent.pre_interface_url + 'add';
        let self = this;
        this.progressDialog = true;
        // 保存
        const saveImg = (data) => {
          this.$http.post(upload_submit_url, Object.assign({
            file_name: data.obj.obj.name,
            busin_co: this.$parent.upload_business_no,
            bus_type: this.form.upload_category,
            encr_lev: this.$parent.upload_encrypt_value,
            remark: '拍摄',
            file_prn: data.obj.obj.prn,
            file_size: data.obj.obj.file_size,
            file_uri: data.obj.obj.file_uri,
            prn: this.$parent.data.prn,
            source: '拍摄',
            JID: this.$parent.data.JID
          }, this.data), {
            emulateJSON: true
          }).then(response => {
            self.percentageValue++;
            if (self.images_data.length === this.percentageValue / 2) {
              // self.$message.success('上传完成');
              self.progressDialog = false;
              self.cancel();
              self.$parent.refresh_files_data && self.$parent.refresh_files_data();
            }
          });
        };
        // 上传
        this.images_data.forEach((item, index) => {
          this.$http.post(url, Object.assign({
            bus_type: this.form.upload_category,
            data: item
          }, this.$parent.data), {
            emulateJSON: true
          }).then((response) => {
            if (response.status === 200 && response.body.status) {
              saveImg(response.body);
              self.percentageValue++;
            } else {
              self.$message.error(`第${index + 1}张上传失败`);
              self.percentageValue = this.percentageValue + 2;
              if (this.images_data.length === this.percentageValue / 2) {
                // self.$message.success('上传完成');
                self.progressDialog = false;
                self.cancel();
                self.$parent.refresh_files_data();
              }
            }
          });
        });
      }
    },
    props: {},
    watch: {
      images_data(newValue) {
        if (newValue.length === 0) {
          this.picturesBox = 'close';
        }
      }
    },
    beforeDestroy: function() {
      this.cancel();
    }

  };

  window.onload = function() {
  };

</script>

<style scoped>

</style>
