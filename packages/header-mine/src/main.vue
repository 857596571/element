<template>
      <div class='el-header-mine clearfix' :style='{ background: headerBg }'>
        <div class='headerleft'>
          <img class="hoverItem" @click='toHome' src='http://47.92.143.222:82/files/formal/logo/311531533984.png'/>
        </div>

        <div class='headerRight'>
          <el-button class="homeIcon" type='text' @click='toHome' title='门户首页'></el-button>

          <!--<ThemePicker v-on:setHeaderBg="setSkin" title='换肤' class="skinIcon"></ThemePicker>-->
          <el-button type="text" @click="openSkinPop" title="换肤" class="skinIcon"></el-button>

          <el-button class="tezfIcon" type='text' @click='keyboardBtn' :class='{keyboard_btn_open:keyboardOpen,keyboard_btn_close:!keyboardOpen}' title='特殊字符'></el-button>

          <el-dropdown @command='openInfo' trigger='click'>
            <div class="hoverItem">
              <el-button class="userIcon" type='text'></el-button>
              {{updateUser_formData.username}}，欢迎您！
              <i class='el-icon-arrow-down'></i>
            </div>
            <el-dropdown-menu slot='dropdown'>
              <el-dropdown-item command='outHome'>退出系统</el-dropdown-item>
              <el-dropdown-item command='setInfo'>修改密码</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-dialog class='editeInfo' :modal='false' title='修改密码'  width='500px' :visible.sync='dialogFormVisible'>
            <el-form ref='updateUserRef' :rules='formDataRules' :model='updateUser_formData' label-width='100px'>
              <el-form-item label='用户名:'>
                <el-input :disabled='true' v-model='updateUser_formData.username'></el-input>
              </el-form-item>
              <el-form-item label='当前密码:' prop='passWord'>
                <el-input clearable type='password' v-model='updateUser_formData.passWord' placeholder='请输入当前密码'></el-input>
              </el-form-item>
              <el-form-item label='新密码:' prop='newPassword'>
                <el-input type="password"  clearable v-model="updateUser_formData.newPassword"  @blur="checkPW" placeholder="请输入新密码"></el-input>
              </el-form-item>
              <el-form-item label='确认密码:' prop='checkPw'>
                <el-input :class='{isRedBorder:isPwDiffer,isGreenBorder:!isPwDiffer}' type='password' clearable  @blur='checkPW' v-model='updateUser_formData.checkPw' placeholder='请再次输入新密码'></el-input>
                <span class='erroInput' v-if='isPwDiffer'>两次密码不一致!</span>
              </el-form-item>
            </el-form>
            <div style="text-align: center">
              <el-button size="small" class='setPwBtn' type="success" @click='setPw'>确定</el-button>
              <el-button size="small" @click='dialogFormVisible=false'>取消</el-button>
            </div>
          </el-dialog>
          <el-dialog title="系统皮肤" :modal='false' :visible.sync="centerDialogVisible" width='380px' :show-close="false" custom-class="dialog_skin" center>
            <ul>
              <li :key="i" v-for="(item,i) in skinBox">
                <div @click="selectSkin(item)" :class="item.css">
                  {{item.skinName}}
                  <span v-show="item.show" class="icon_ok">
                  <i class="el-icon-circle-check-outline"></i>
                </span>
                </div>
              </li>
            </ul>

            <span slot="footer" class="dialog-footer ">
              <el-button size="small" type="success" @click="setSkin">确 定</el-button>
		      <el-button size="small" @click="centerDialogVisible = false">取 消</el-button>
		  </span>
          </el-dialog>
        </div>
      </div>
</template>

<script>
  import ThemePicker from 'element-ui-qz/examples/components/theme-picker.vue';
  import ElDropdown from 'element-ui-qz/packages/dropdown';
  import ElDropdownItem from 'element-ui-qz/packages/dropdown-item';
  import ElDropdownMenu from 'element-ui-qz/packages/dropdown-menu';
  import ElForm from 'element-ui-qz/packages/form';
  import ElInput from 'element-ui-qz/packages/input';
  import ElFormItem from 'element-ui-qz/packages/form-item';
  import ElButton from 'element-ui-qz/packages/button';
  import ElDialog from 'element-ui-qz/packages/dialog';

  import keyboard from '../keyBoard/keyboard';
  import '../keyBoard/keyboard.css';
  const _keyboard = keyboard();

  export default {
    name: 'ElHeaderMine',
    components: {
      ThemePicker,
      ElDropdown,
      ElDropdownItem,
      ElDropdownMenu,
      ElForm,
      ElInput,
      ElFormItem,
      ElButton,
      ElDialog
    },
    props: {
      data: {
        type: Object,
        default: () => {
          return {
            btnCodeSetSkin: 'BTN_310682130088', // 设置皮肤
            JID: localStorage.getItem('__JID__'),
            setSkinUrl: 'http://192.168.2.225/ywpz-prj/gzyq/runGzyq',
            setPasswordUrl: 'http://192.168.2.225/tu-prj/cu/update/loginpwdbyToken',
            loginOutUrl: 'http://192.168.2.225/tu-prj/userLogOut'
          };
        }
      }
    },
    data: function() {
      let color = localStorage.getItem('skin') ? (localStorage.getItem('skin').includes('green') ? '#2DCF49' : '#4C85FF') : '#4C85FF';
      let username = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).env$user_name : 'admin';
      return {
        headerBg: color,
        centerDialogVisible: false,
        skinBox: [
          {
            css: 'blueSkin',
            skinName: '经典蓝',
            show: false
          },
          {
            css: 'greenSkin',
            skinName: '经典绿',
            show: false
          }
        ],
        keyboardOpen: false,
        dialogFormVisible: false,
        isPwDiffer: false,
        updateUser_formData: {
          username: username,
          passWord: '',
          newPassword: '',
          checkPw: ''
        },
        formDataRules: {
          passWord: [{required: true, trigger: 'blur', message: '请输入密码' }],
          newPassword: [{required: true, trigger: 'blur', message: '请输入新密码' }],
          checkPw: [{required: true, trigger: 'blur', message: '确认密码不能为空' }]
        }
      };
    },
    methods: {
      openSkinPop() {
        this.centerDialogVisible = true;
        let skin = localStorage.getItem('skin');
        this.skinBox.forEach(v=>{
          if (v.css === skin) {
            v.show = true;
          }
        });
      },
      selectSkin(val) {
        this.skinBox.forEach(v=>{
          v.show = false;
        });
        if (!val.show) {
          val.show = true;
        }
      },
      // setSkin(v) {
      //   this.headerBg = v;
      //   let param = {
      //     jsonDataStr: {}
      //   };
      //   let loginName = JSON.parse(localStorage.getItem('userInfo')).env$login_na;
      //   param.jsonDataStr.login_name = loginName;
      //   param.jsonDataStr.skin_code = v;
      //   this.$http.post(
      //     this.data.setSkinUrl,
      //     {
      //       jsonDataStr: JSON.stringify(param.jsonDataStr),
      //       btnCode: this.data.btnCodeSetSkin
      //     },
      //     { emulateJSON: true }
      //   )
      //     .then(
      //       res => {
      //         if (!res.data.status) {
      //           this.$message.error(res.data.errors[0]);
      //         } else {
      //           localStorage.setItem('skin', v);
      //           this.$message.success('更换皮肤成功！');
      //         }
      //       }
      //     );
      // },
      setSkin() {
        this.centerDialogVisible = false;
        this.skinBox.forEach(v=>{
          if (v.show) {
            let param = {
              jsonDataStr: {}
            };
            let loginName = JSON.parse(localStorage.getItem('userInfo')).env$login_na;
            param.jsonDataStr.login_name = loginName;
            param.jsonDataStr.skin_code = v.css;
            this.$http.post(
              this.data.setSkinUrl,
              {
                jsonDataStr: JSON.stringify(param.jsonDataStr),
                btnCode: this.data.btnCodeSetSkin
              },
              { emulateJSON: true }
            )
              .then(
                res => {
                  if (!res.data.status) {
                    this.$message.error(res.data.errors[0]);
                  } else {
                    localStorage.setItem('skin', v.css);
                    this.$emit('skinSelect', v.css);
                  }
                }
              );
          }
        });
      },
      toHome() {
        location.href = '/#/home';
      },
      keyboardBtn() {
        this.keyboardOpen = !this.keyboardOpen;
        this.keyboardOpen ? _keyboard.open() : _keyboard.close();
        // this.$emit('isOpenKeyboard', this.keyboardOpen);
      },
      openInfo(val) {
        if (val === 'setInfo') {
          this.isPwDiffer = false;
          setTimeout(()=>{
            this.$refs.updateUserRef.clearValidate();
          }, 10);
          // 清空表单
          this.updateUser_formData.passWord = '';
          this.updateUser_formData.newPassword = '';
          this.updateUser_formData.checkPw = '';
          this.dialogFormVisible = true;
        } else {
          // 退出系统
          this.$confirm('您将退出系统, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.loginOut();
          });
        }
      },
      loginOut() {
        this.$http.post(
          this.data.loginOutUrl,
          {JID: this.data.JID},
          { emulateJSON: true }
        ).then(
          res => {
            if (res.data.code !== -1) {
              _keyboard.close();
              this.$router.push({ path: '/' });
              localStorage.setItem('userInfo', '');
              localStorage.setItem('__JID__', '');
            } else {
              this.$message.error(res.data.msg);
            }
          }
        );
      },
      checkPW() {
        let pw = this.updateUser_formData.checkPw;
        let oldPw = this.updateUser_formData.newPassword;
        if (pw) {
          this.isPwDiffer = pw !== oldPw;
        } else {
          this.isPwDiffer = false;
        }
      },
      setPw() {
        if (!this.isPwDiffer) {
          this.$refs.updateUserRef.validate(valid => {
            if (!valid) return;
            this.$http.post(
              this.data.setPasswordUrl,
              Object.assign({
                plainOldPassword: this.updateUser_formData.passWord,
                plainNewPassword: this.updateUser_formData.newPassword,
                JID: this.data.JID
              }),
              { emulateJSON: true }
            )
              .then(
                res => {
                  if (res.data.resultCode === 'FAIL') {
                    this.$message.error(res.data.errors[0]);
                  } else {
                    if (this.dialogFormVisible) {
                      // 关闭弹窗
                      this.dialogFormVisible = false;
                      this.$message.success('修改密码成功，请重新登录');
                      localStorage.setItem('userInfo', '');
                      localStorage.setItem('__JID__', '');
                    } else {
                      this.loginOut();
                    }
                  }
                }
              );
          });
        }
      }
    }
  };
</script>

<style lang='scss' scoped>
  .hoverItem:hover{
    cursor: pointer;
  }
  .clearfix {
    zoom: 1;
  }
  .clearfix:after {
    content: '.';
    width: 0;
    height:0;
    visibility: hidden;
    display: block;
    clear: both;
    overflow: hidden;
  }
  .el-header-mine {
    padding: 0 10px;
    .headerleft, .headerRight {
      height: 60px;
    }
    .headerleft {
      float: left;
      line-height: 90px;
    }
    .headerRight {
      float: right;
      .el-dropdown{
        line-height: 60px;
      }
      .el-color-picker__color-inner {
        background: transparent !important;
      }
      .el-color-picker__trigger {
        height: 21px;
        .el-icon-close {
          display: none;
        }
      }
      .el-color-picker__trigger, .el-color-picker__color {
        border: none;
      }
      .homeIcon, .tezfIcon, .skinIcon {
        width: 29px;
        height: 34px;
        margin-right: 10px;
        background-repeat: no-repeat;
      }
      .el-color-picker__trigger{
        width: 29px;
      }
      .userIcon {
        width: 35px;
        height: 35px;
        margin-left: 18px;
        background-repeat: no-repeat;
        background-image: url("../img/user.png");
      }
      .homeIcon {
        background-image: url("../img/home.png");
      }
      .keyboard_btn_close {
        background-image: url("../img/tszf.png");
      }
      .keyboard_btn_open {
        background-image: url("../img/tszfOn.png");
      }
      .skinIcon {
        display: inline-grid;
        background-image: url("../img/skin.png");
      }
      .el-dropdown-selfdefine, .el-icon-arrow-down {
        color: #fff;
      }
      .editeInfo {
        .el-dialog__header {
          height: 40px;
          line-height: 40px;
          border-bottom: none;
          span {
            float: none;
            font-size: 16px;
            font-weight: bold;
          }
        }
        .el-dialog__body {
          padding: 24px 20px;
          .el-form-item {
            width: 94%;
            line-height: 50px;
          }
          .erroInput {
            position: absolute;
            top: 28px;
            left: 0;
            color: #F56B6B;
            font-size: 12px;
          }
          // 验证框色
          .isRedBorder .el-input__inner {
            border-color: #f56c6c !important;
          }
          .el-form-item.is-success .isGreenBorder .el-input__inner {
            border-color: #4C85FF !important;
          }
          .el-form-item.is-error .isGreenBorder .el-input__inner {
            border-color: #f56c6c !important;
          }
        }
      }
      .dialog_skin {
        .el-dialog__header {
          padding: 0!important;
          height: 40px!important;
          line-height: 40px!important;
          .el-dialog__title {
            font-weight: bold;
          }
        }
        .el-dialog__body{
          padding: 0 25px!important;
          ul{
            padding: 0;
            margin: 0 auto;
            li{
              display: inline-block;
              padding: 8px;
              width: 45%;
              &>div{
                background-color: #67BCFF;
                color: #fff;
                height: 100px;
                text-align: center;
                line-height: 100px;
                position: relative;
                .icon_ok {
                  position: absolute;
                  top: -34px;
                  right: 5px;
                  .el-icon-circle-check-outline{
                    font-size: 20px;
                  }
                }
              }
              &>div:hover {
                cursor: pointer;
                opacity: .5;
              }
              .greenSkin {
                background-color: #2DCF49;
              }
            }
          }
        }
      }
    }
  }
</style>