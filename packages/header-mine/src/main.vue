<template>
  <div class="el-header-mine clearfix" :style="{ background: headerBg }">
    <div class="headerleft">
      <img @click="toHome" src="/files/formal//logo//311531533984.png">
    </div>

    <div class="headerRight">
      <el-button icon="el-icon-qz-home" type="text" @click="toHome" title="门户首页"></el-button>
      <el-button icon="el-icon-qz-skin" type="text" @click="openSkinPop" title="换肤"></el-button>
      <el-button
        icon="el-icon-qz-ohm"
        type="text"
        @click="keyboardBtn"
        title="特殊字符"
        :class="keyboardOpen?'keyboard_btn_open':'keyboard_btn_close'"
      ></el-button>
      <el-dropdown @command="openInfo" trigger="click">
        <div>
            <el-button icon="el-icon-qz-user" type="text"></el-button>
            <span>{{updateUser_formData.username}}，欢迎您！</span>
            <i class="el-icon-arrow-down"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="outHome">退出系统</el-dropdown-item>
          <el-dropdown-item command="setInfo">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <el-dialog
        class="header-mine-dialog header-mine-password"
        title="修改密码"
        width="500px"
        center
        append-to-body
        :close-on-click-modal="false"
        :visible.sync="dialogFormVisible"
    >
        <el-form
            ref="updateUserRef"
            label-width="100px"
            :rules="formDataRules"
            :model="updateUser_formData"
        >
            <el-form-item label="用户名:">
                <el-input :disabled="true" v-model="updateUser_formData.username"></el-input>
            </el-form-item>
            <el-form-item label="当前密码:" prop="passWord">
                <el-input
                    clearable
                    type="password"
                    v-model="updateUser_formData.passWord"
                    placeholder="请输入当前密码"
                ></el-input>
            </el-form-item>
            <el-form-item label="新密码:" prop="newPassword">
                <el-input
                    type="password"
                    clearable
                    v-model="updateUser_formData.newPassword"
                    @blur="checkPW"
                    placeholder="请输入新密码"
                ></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="checkPw">
                <!-- :class="{isRedBorder:isPwDiffer,isGreenBorder:!isPwDiffer}" -->
                <el-input
                    :class="isPwDiffer?'form-error-tips':''"
                    type="password"
                    clearable
                    @blur="checkPW"
                    v-model="updateUser_formData.checkPw"
                    placeholder="请再次输入新密码"
                ></el-input>
                <span v-if="isPwDiffer">两次密码不一致!</span>
            </el-form-item>
        </el-form>
        <template slot="footer">
            <el-button size="small" type="primary" @click="setPw">确定</el-button>
            <el-button size="small" @click="dialogFormVisible=false">取消</el-button>
        </template>
    </el-dialog>

    <el-dialog
        class="header-mine-dialog header-mine-skin"
        title="系统皮肤"
        width="380px"
        center
        append-to-body
        :close-on-click-modal="false"
        :visible.sync="centerDialogVisible"
    >
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
        <template slot="footer">
            <el-button size="small" type="primary" @click="setSkin">确 定</el-button>
            <el-button size="small" @click="centerDialogVisible = false">取 消</el-button>
        </template>
    </el-dialog>
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
    const skin = localStorage.getItem('skin');
    const userInfo = localStorage.getItem('userInfo');
    return {
      headerBg: skin && skin.includes('green') ? '#0A3464' : '#4C85FF',
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
        username: userInfo ? JSON.parse(userInfo)['env$user_name'] : 'admin',
        passWord: '',
        newPassword: '',
        checkPw: ''
      },
      formDataRules: {
        passWord: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        newPassword: [
          { required: true, trigger: 'blur', message: '请输入新密码' }
        ],
        checkPw: [
          { required: true, trigger: 'blur', message: '确认密码不能为空' }
        ]
      }
    };
  },
  methods: {
    openSkinPop() {
      const skin = localStorage.getItem('skin') || 'blueSkin';
      this.centerDialogVisible = true;
      this.skinBox.forEach(v => {
        if (v.css === skin) {
          v.show = true;
        } else {
          v.show = false;
        }
      });
    },
    selectSkin(val) {
      this.skinBox.forEach(v => {
        if (v.css === val.css) {
          v.show = true;
        } else {
          v.show = false;
        }
      });
    },
    setSkin() {
      this.centerDialogVisible = false;
      this.skinBox.forEach(v => {
        if (v.show) {
          const userInfo = localStorage.getItem('userInfo');
          const jsonDataStr = {
            login_name: userInfo ? JSON.parse(userInfo)['env$login_na'] : '',
            skin_code: v.css
          };
          this.$http
            .post(
              this.data.setSkinUrl,
              {
                jsonDataStr: JSON.stringify(jsonDataStr),
                btnCode: this.data.btnCodeSetSkin
              },
              { emulateJSON: true }
            ).then(res => {
              if (!res.data.status) {
                this.$message.error(res.data.errors[0]);
              } else {
                localStorage.setItem('skin', v.css);
                this.$emit('skinSelect', v.css);
                //
                this.headerBg = v.css && v.css.includes('green') ? '#0A3464' : '#4C85FF';
              }
            });
        }
      });
    },
    toHome() {
      // location.href = '/#/home';
      location.href = location.origin + '/#/home';
    },
    keyboardBtn() {
      this.keyboardOpen = !this.keyboardOpen;
      this.keyboardOpen ? _keyboard.open() : _keyboard.close();
      // this.$emit('isOpenKeyboard', this.keyboardOpen);
    },
    openInfo(val) {
      if (val === 'setInfo') {
        this.isPwDiffer = false;
        setTimeout(() => {
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
      this.$http
        .post(
          this.data.loginOutUrl,
          { JID: this.data.JID },
          { emulateJSON: true }
        )
        .then(res => {
          if (res.data.code !== -1) {
            _keyboard.close();
            // this.$router.push({ path: '/' });
            localStorage.setItem('userInfo', '');
            localStorage.setItem('__JID__', '');
            location.href = location.origin;
          } else {
            this.$message.error(res.data.msg);
          }
        });
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
          this.$http
            .post(
              this.data.setPasswordUrl,
              Object.assign({
                plainOldPassword: this.updateUser_formData.passWord,
                plainNewPassword: this.updateUser_formData.newPassword,
                JID: this.data.JID
              }),
              { emulateJSON: true }
            )
            .then(res => {
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
            });
        });
      }
    }
  }
};
</script>

<style lang='scss'>
.el-header-mine {
  padding: 0 20px;
  &.clearfix {
    zoom: 1;
    &:after {
    content: ".";
      width: 0;
      height: 0;
      visibility: hidden;
      display: block;
      clear: both;
      overflow: hidden;
    }
  }
  .headerleft,
  .headerRight {
    height: 60px;
    line-height: 60px;
    img {
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .headerleft {
    float: left;
    // line-height: 90px;
  }
  .headerRight {
    float: right;
    // .el-dropdown {
    //   line-height: 60px;
    // }
    .el-button--text {
      height: 100%;
      font-size: 26px;
      margin-right: 12px;
      color: white;
      &+.el-button {
        margin-left: 0;
      }
    }
    .keyboard_btn_open {
      opacity: 0.5;
    }
    .keyboard_btn_close {
      opacity: 1;
    }
    .el-dropdown {
      float: right;
      color: white;
      margin-left: 12px;
      .el-dropdown-selfdefine {
        height: 100%;
        display: flex;
        align-items: center;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
.header-mine-dialog {
  .el-dialog {
    border-radius: 10px;
    .el-dialog__title {
      font-size: 16px;
      font-weight: bold;
    }
    .el-dialog__body {
      padding: 20px;
    }
  }
}
.header-mine-password {
  .el-dialog__header {
    text-align: left;
  }
  .el-dialog__body {
    .el-form {
      margin-top: 0;
      margin-bottom: 0;
    }
    .el-form-item {
      /* &:last-child {
        margin-bottom: 0;
      } */
      .form-error-tips {
        .el-input__inner {
          border-color: #f56b6b;
        }
        &+span {
          font-size: 12px;
          color: #f56b6b;
          line-height: normal;
          position: absolute;
          bottom: -17px;
          left: 0;
          z-index: 9;
        }
      }
    }
  }
}
.header-mine-skin {
  /* .el-dialog__header {
      border-bottom: 2px solid #67bcff;
  } */
  .el-dialog__body {
    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        display: inline-block;
        padding: 8px;
        width: 50%;
        box-sizing: border-box;
        div {
          background-color: #67bcff;
		  color: #fff;
		  height: 100px;
		  line-height: 100px;
		  text-align: center;
          position: relative;
          cursor: pointer;
          .icon_ok {
			position: absolute;
			top: -34px;
			right: 5px;
			.el-icon-circle-check-outline {
			  font-size: 20px;
			}
          }
          &:hover {
            opacity: 0.5;
          }
        }
        .greenSkin {
          background-color: #2dcf49;
        }
      }
    }
  }
}
</style>