<template>
	<div class="header-mine-new">
		<el-row class="headerContent">
			<el-col :span="4" class="headerContentLeft"><img :src="getUsers.kings_lims" class="leftImg" /></el-col>
			<el-col :span="20" class="headerContenRight">
				<!-- <div class="RigInput" v-if="searchShow">
					<transition name="fold"><el-input placeholder="请输入内容" suffix-icon="el-icon-qz-iconsousuo"></el-input></transition>
				</div> -->
				<div class="rigcontent2">
					<!-- <i class="el-icon-qz-iconsousuo elfont" v-if="searchShow == false" @click="searchClick"></i> -->
					<i class="el-icon-qz-iconshouye1 elfont" @click="shouye"></i>
					<!-- <el-badge :value="12" class="item"><i class="el-icon-qz-iconxiaoxi elfont"></i></el-badge> -->
					<i class="el-icon-qz-iconoumu elfont" @click="keyboardBtn" :class="[keyboardOpen==false ? 'keyboard_btn_open':'keyboard_btn_close']"></i>
				</div>
				<div class="rigcontent">
					<div>
						<img
							:src="`${data.Pictureshows}${getUsers.avatar_icon_uri}`"
							class="rigHeaderImg"
							v-if="getUsers.avatar_icon_uri != '' && getUsers.avatar_icon_uri != undefined"
						/>
						<img src="../img/headerImg2.png" class="rigHeaderImg" v-else />
					</div>
					<div class="textPro">{{ getUsers.user_name }}</div>
					<div class="menuTab">
						<el-dropdown @command="handleCommand">
							<span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon--right"></i></span>
							<el-dropdown-menu slot="dropdown" class="el-dropdown-content">
								<el-dropdown-item command="a">
									<i class="el-icon-qz-icongerendangan dropIcon"></i>
									个人档案
								</el-dropdown-item>
								<el-dropdown-item command="b">
									<i class="el-icon-qz-iconxiugaimima dropIcon"></i>
									修改密码
								</el-dropdown-item>
								<!-- <el-dropdown-item command="c">
									<i class="el-icon-qz-iconxiugaizhuti dropIcon"></i>
									更改主题
								</el-dropdown-item> -->
								<el-dropdown-item command="d">
									<i class="el-icon-qz-icontuichudenglu dropIcon"></i>
									退出登录
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
			</el-col>
		</el-row>
		<!-- 资料修改 -->
		<el-dialog title="我的档案" :visible.sync="dialogFormVisible" class="header-main-dialog" :modal-append-to-body="true"
			:append-to-body="true">
			<el-form :model="form" label-width="42px" class="diLogFrom">
				<div class="formIParents">
					<div class="formIMgContent">
						<img
							:src="`${data.Pictureshows}${getUsers.avatar_icon_uri}`"
							class="dImage"
							v-if="getUsers.avatar_icon_uri != '' && getUsers.avatar_icon_uri != undefined"
						/>
						<img src="../img/headerImg1.png" class="dImage" v-else />
						<input id="fileId1" type="file" name="file" class="inputFile" @change="ImgUpLoad" />
						<div class="dtext">更改</div>
					</div>
					<div class="title">{{ getUsers.user_name }}</div>
				</div>
				<el-row>
					<el-col :span="12">
						<el-form-item label="姓名"><el-input v-model="getUsers.user_name" autocomplete="off" disabled></el-input></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="性别">
							<el-radio-group v-model="getUsers.sex" disabled>
								<el-radio label="XY">男</el-radio>
								<el-radio label="YY">女</el-radio>
							</el-radio-group>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="公司"><el-input v-model="getUsers.org_name" autocomplete="off" disabled></el-input></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="部门"><el-input v-model="getUsers.section_name" autocomplete="off" disabled></el-input></el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="岗位"><el-input v-model="getUsers.duty" autocomplete="off" disabled></el-input></el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="电话"><el-input v-model="getUsers.work_phone" autocomplete="off" type="number"></el-input></el-form-item>
					</el-col>
				</el-row>
				<el-form-item class="footerCont"><el-button type="primary" @click="saveFfrom">保存</el-button></el-form-item>
			</el-form>
			<!-- <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">保存</el-button>
        </div> -->
		</el-dialog>
		<!-- 皮肤系统 -->
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
				<li :key="i" v-for="(item, i) in skinBox">
					<div @click="selectSkin(item)" :class="item.css">
						{{ item.skinName }}
						<span v-show="item.show" class="icon_ok"><i class="el-icon-circle-check-outline"></i></span>
					</div>
				</li>
			</ul>
			<template slot="footer">
				<el-button size="small" type="primary" @click="setSkin">确 定</el-button>
				<el-button size="small" @click="centerDialogVisible = false">取 消</el-button>
			</template>
		</el-dialog>
		<!-- 修改密码 -->
		<el-dialog
			class="header-mine-dialog header-mine-password"
			title="修改密码"
			width="500px"
			center
			:modal-append-to-body="true"
			:append-to-body="true"
			:close-on-click-modal="false"
			:visible.sync="changPassVisible">
			<el-form ref="updateUserRef" label-width="100px" :rules="formDataRules" :model="updateUser_formData">
				<el-form-item label="用户名:"><el-input :disabled="true" v-model="updateUser_formData.username"></el-input></el-form-item>
				<el-form-item label="当前密码:" prop="passWord">
					<el-input clearable type="password" v-model="updateUser_formData.passWord" placeholder="请输入当前密码"></el-input>
				</el-form-item>
				<el-form-item label="新密码:" prop="newPassword">
					<el-input type="password" clearable v-model="updateUser_formData.newPassword"  placeholder="请输入新密码"></el-input>
				</el-form-item>
				<el-form-item label="确认密码:" prop="checkPw">
					<!-- :class="{isRedBorder:isPwDiffer,isGreenBorder:!isPwDiffer}" -->
					<el-input
						:class="isPwDiffer ? 'form-error-tips' : ''"
						type="password"
						clearable
						v-model="updateUser_formData.checkPw"
						placeholder="请再次输入新密码"
					></el-input>
					<span v-if="isPwDiffer">两次密码不一致!</span>
				</el-form-item>
			</el-form>
			<template slot="footer">
				<el-button size="small" type="primary" @click="setPw">确定</el-button>
				<el-button size="small" @click="changPassVisible = false">取消</el-button>
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
import Elcol from 'element-ui-qz/packages/col';
import ElRow from 'element-ui-qz/packages/row';
import ElDropDown from 'element-ui-qz/packages/dropdown';
import ElDropDownItem from 'element-ui-qz/packages/dropdown-item';
import ElIcon from 'element-ui-qz/packages/icon';
import ElBadge from 'element-ui-qz/packages/badge';
import ElSelect from 'element-ui-qz/packages/select';
import keyboard from '../keyBoard/keyboard';
import '../keyBoard/keyboard.css';
import logo from '../../../examples/assets/images/logo.png';
const _keyboard = keyboard();
export default {
  name: 'ElHeaderMineNew',
  components: {
    ThemePicker,
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElForm,
    ElInput,
    ElFormItem,
    ElButton,
    ElDialog,
    Elcol,
    ElRow,
    ElDropDown,
    ElDropDownItem,
    ElIcon,
    ElBadge,
    ElSelect
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          baseUrl: 'http://192.168.2.226:20100',
          btnCodeSetSkin: 'BTN_310682130088',
          JID: localStorage.getItem('__JID__'),
          setSkinUrl: '/ywpz-prj/gzyq/runGzyq',
          setPasswordUrl: '/tu-prj/cu/update/loginpwdbyToken',
          loginOutUrl: '/tu-prj/userLogOut',
          uploadImg: '/sz-prj/filemgr/addBusinessFile',
          Pictureshows: '/sz-prj/filemgr/downloadFile?prn=',
          getUserInfo: '/mhgl-prj/userInfo/search',
          saveModify: '/mhgl-prj/userInfo/modify'
        };
      }
    }
  },
  data() {
    const skin = localStorage.getItem('skin');
    const userInfo = localStorage.getItem('userInfo');
    const redirctUrl = localStorage.getItem('redirctUrl');
    return {
      headerBg: skin && skin.includes('green') ? '#0A3464' : '#4C85FF',
      isCollapse: true,
      dialogFormVisible: false /* 修改资料 */,
      changPassVisible: false /* 修改密码 */,
      leftMenuList: [],
      value: '',
      searchShow: false,
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
      centerDialogVisible: false,
      formDataRules: {
        passWord: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        newPassword: [{ required: true, trigger: 'blur', message: '请输入新密码' }],
        checkPw: [{ required: true, trigger: 'blur', message: '确认密码不能为空' }]
      },
      updateUser_formData: {
        username: userInfo ? JSON.parse(userInfo)['env$user_name'] : 'admin',
        passWord: '',
        newPassword: '',
        checkPw: ''
      },
      userInfo: JSON.parse(userInfo),
      getUsers: '',
      logo: logo,
      keyboardOpen: false,
      redirctUrl: redirctUrl
    };
  },
  created() {
    // this.loginRend();
  },
  mounted() {
    this.getUser();
  },
  methods: {
    loginRend() {
      let parmas = {};
      parmas.username = 'admin' ;
      parmas.password = '888888888' ;
      this.$http.post('http://192.168.2.226:20100/tu-prj/userLoginJson', parmas, { emulateJSON: true }).then(res => {
        localStorage.setItem('userInfo', JSON.stringify(res.data.data.TU_ENV));
        localStorage.setItem('__JID__', res.data.data.JID);
        this.JID = res.data.data.JID;
      });
    },
    getUser() {
      if (this.userInfo) {
        let parmas = {};
        parmas.prn = this.userInfo.env$user_prn;
        this.$http.post(this.data.baseUrl + this.data.getUserInfo, parmas, { emulateJSON: true }).then(res => {
          this.getUsers = res.data.obj;
          localStorage.setItem('myUserinfo', JSON.stringify(this.getUsers));
        });
      }
    },
    handleCommand(command) {
      if (command === 'a') {
        this.dialogFormVisible = true;
      } else if (command === 'd') {
        this.$confirm('您将退出系统, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loginOut();
        })
          .catch(() => {});
      } else if (command === 'c') {
        this.centerDialogVisible = true;
      } else if (command === 'b') {
        this.changPassVisible = true;
      }
    },
    searchClick() {
      this.searchShow = true;
    },
    loginOut() {
      this.$http.post(this.data.baseUrl + this.data.loginOutUrl, { JID: this.data.JID }, { emulateJSON: true }).then(res => {
        if (res.data.code !== -1) {
          _keyboard.close();
          this.$router.push({ path: '/' });
          localStorage.setItem('userInfo', '');
          localStorage.setItem('__JID__', '');
          location.href = this.redirctUrl;
        } else {
          this.$message.error(res.data.msg);
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
              this.data.baseUrl + this.data.setSkinUrl,
              {
                jsonDataStr: JSON.stringify(jsonDataStr),
                btnCode: this.data.btnCodeSetSkin
              },
              { emulateJSON: true }
            )
            .then(res => {
              if (!res.data.status) {
                this.$message.error(res.data.errors[0]);
              } else {
                localStorage.setItem('skin', v.css);
                this.$emit('skinSelect', v.css);
                // this.headerBg = v.css && v.css.includes('green') ? '#0A3464' : '#4C85FF';
              }
            });
        }
      });
    },
    setPw() {
      if (!this.isPwDiffer) {
        this.$refs.updateUserRef.validate(valid => {
          if (!valid) return;
          this.$http
            .post(
              this.baseUrl + this.data.setPasswordUrl,
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
                if (this.changPassVisible) {
                  // 关闭弹窗
                  this.changPassVisible = false;
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
    },
    keyboardBtn() {
      this.keyboardOpen = !this.keyboardOpen;
      this.keyboardOpen ? _keyboard.open() : _keyboard.close();
    },
    shouye() {
      if (this.getUsers.url1 !== '') {
        location.href = this.getUsers.url1;
      }
    },
    ImgUpLoad(e) {
      let formData = new FormData();
      formData.append('file', e.target.files[0]);
      formData.append('bus_type', 'report_user_signature');
      this.$http.post(this.data.baseUrl + this.data.uploadImg, formData, { emulateJSON: true }).then(res => {
        if (res.data.status === true) {
          this.getUsers.avatar_icon_uri = res.data.obj.prn;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    saveFfrom() {
      let parmas = {};
      parmas.work_phone = this.getUsers.work_phone;
      parmas.pic = this.getUsers.avatar_icon_uri;
      parmas.prn = this.userInfo.env$user_prn;
      this.$http.post(this.data.baseUrl + this.data.saveModify, parmas, { emulateJSON: true }).then(res => {
        if (res.data.status === true) {
          this.$message.success('修改资料成功');
          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.header-mine-new {
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.08);
	z-index: 200;
	.headerContent {
		height: 48px;
		padding-left: 24px;
		padding-right: 32px;
		display: -webkit-flex; /* 新版本语法: Chrome 21+ */
		display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
		display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
		display: -moz-box; /* 老版本语法: Firefox (buggy) */
		display: -ms-flexbox; /* 混合版本语法: IE 10 */
		display: flex;
		align-items: center;
		.headerContentLeft {
			.leftImg {
				display: inline-block;
				width: 128px;
				height: 21px;
			}
		}
		.headerContenRight {
			display: -webkit-flex; /* 新版本语法: Chrome 21+ */
			display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
			display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
			display: -moz-box; /* 老版本语法: Firefox (buggy) */
			display: -ms-flexbox; /* 混合版本语法: IE 10 */
			display: flex;
			align-items: center;
			justify-content: flex-end;
			.rigcontent {
				display: -webkit-flex; /* 新版本语法: Chrome 21+ */
				display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
				display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
				display: -moz-box; /* 老版本语法: Firefox (buggy) */
				display: -ms-flexbox; /* 混合版本语法: IE 10 */
				display: flex;
				align-items: center;
				padding-left: 24px;
				border-left: 1px solid #e6e6e6;
				.rigHeaderImg {
					display: inline-block;
					width: 32px;
					height: 32px;
				}
				.textPro {
					margin-left: 8px;
					margin-right: 15px;
					font-size: 14px;
					font-family: Microsoft YaHei;
					font-weight: 400;
					line-height: 22px;
					color: #333333;
				}
			}
			.rigcontent2 {
				padding-right: 28px;
				.elfont {
					font-size: 16px;
					margin-left: 32px;
					color: #999999;
					&:hover {
						color: #1a90fd;
						cursor: pointer;
					}
				}
			}
		}
	}
}

.el-dropdown-link {
	cursor: pointer;
	font-size: 16px;
}

.el-dropdown-content {
	.dropIcon {
		margin-right: 8px;
		font-size: 13px;
		color: #979797;
	}
}
.formIParents {
	text-align: center;
	margin-bottom: 26px;
	.formIMgContent {
		width: 80px;
		height: 80px;
		margin: 0 auto;
		position: relative;
		border-radius: 50%;
		overflow: hidden;
		.dImage {
			display: inline-block;
			width: 80px;
			height: 80px;
			border-radius: 50%;
		}
		.dtext {
			position: absolute;
			bottom: 0;
			text-align: center;
			height: 20px;
			line-height: 20px;
			background: rgba(0, 0, 0, 0.5);
			color: #ffffff;
			width: 100%;
			font-size: 14px;
		}
		.inputFile {
			position: absolute;
			display: block;
			width: 80px;
			height: 80px;
			top: 0px;
			left: 0px;
			opacity: 0;
			z-index:200;
		}
	}
	.title {
		height: 28px;
		line-height: 28px;
	}
}

.header-main-dialog {
	.diLogFrom {
		.el-form-item {
			height: 32px;
			margin-bottom: 12px;
			.el-form-item__label {
				font-size: 14px;
				font-weight: 400;
				color: #8c8c8c;
			}
			.el-form-item__content {
				.el-input {
					.el-input__inner {
						height: 28px;
						width: 160px;
						line-height: 28px;
					}
				}
			}
		}
	}
	.el-dialog__header {
		height: 55px;
		border-bottom: 1px solid #e6e6e6;
		padding-bottom: 0;
		padding: 0 16px;
		line-height: 55px;
		font-size: 14px;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}
	.el-dialog__headerbtn {
		top: 16px;
		/* 	padding:4px; */
		border: 1px solid #dcdcdc;
		border-radius: 50%;
		width: 24px;
		height: 24px;
		.el-icon {
			font-size: 12px;
			position: absolute;
			top: 50%;
			margin-top: -6px;
			left: 50%;
			margin-left: -6px;
			/*   border-radius:50%; */
			/*  border:1px solid #DCDCDC; */
		}
	}
	.el-dialog__body {
		padding: 39px 57px;
	}
	.footerCont {
		text-align: center;
		margin-top: 10px;
		button {
			width: 72px;
			height: 32px;
			padding: 0;
		}
	}
}

.el-dialog {
	width: 600px;
}
.RigInput {
	input {
		height: 32px;
		line-height: 32px;
	}
	.el-input__suffix {
		.el-input__suffix-inner {
			font-size: 16px;
			color: #999;
			.el-input__icon {
				line-height: 32px;
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
.keyboard_btn_open {
	opacity: 0.5;
	}
.keyboard_btn_close {
	opacity: 1;
	color:#1A90FD !important
}
</style>
