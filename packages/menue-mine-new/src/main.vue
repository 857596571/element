<template>
	  <div class="el-menu-Content">
		 <div class="topMenu">
		 <el-menu
		  :unique-opened="true"
		  :default-active="$route.path"
		  router
		  class="el-menue-mine-new"
		  :collapse="isCollapse"
		  :style="{ width: isCollapse ? '48px' : '200px' }">
		  <el-submenu
		    :index="String(i)"
		    @mouseenter.native="mouseenter"
		    v-for="(v,i) in leftMenuList"
		    :key="i"
		    class="firstLevelMenue"
		  >
		    <template slot="title">
				<div  class="navigateMenu" v-if="v.resIconNo"> 
				     <img :src="v.resIconNo" class="listImgMenu"/>
				 </div>
				 <div  class="navigateMenu" v-else> 
				      <img src="../img/nomenueimg.png" class="listImgMenu"/>
				  </div>
		      <span :title="v.name?v.name:v.res_na">{{get_menu_name(v.name?v.name:v.res_na)}}</span>
		    </template>
		    <el-submenu
		      v-show="!isCollapse"
		      :index="String(vv.treeId?vv.treeId:vv.id)"
		      v-for="(vv,ii) in v.children?v.children:v.childsList"
		      :key="ii"
		      class="secondLevelMenue"
		    >
		      <template slot="title">
		        <span :title="vv.name?vv.name:vv.res_na">{{get_menu_name(vv.name?vv.name:vv.res_na)}}</span>
		      </template>
		      <el-menu-item
		        :index="String(vvv.uri?vvv.uri.split('/#')[1]:vvv.res_url_ca.split('/#')[1])"
		        v-for="(vvv,iii) in vv.children?vv.children:vv.childsList"
		        :key="iii"
		        class="threeLevelMenue"
		      >
		        <span
		          class="text-center"
		          :title="vvv.name?vvv.name:vvv.res_na"
		          @click.stop="see(vvv)"
		        >• {{get_menu_name(vvv.name?vvv.name:vvv.res_na)}}</span>
		      </el-menu-item>
		    </el-submenu>
		    <!-- hover -->
		    <div
		      class="el-menu-new-hover"
		      v-for="(vv,ii) in v.children?v.children:v.childsList"
		      :key="ii+'-second'"
		      v-show="isCollapse"
		    >
		      <p class="hover_secondMenu">
		        <span>{{vv.name?vv.name:vv.res_na}}</span>&nbsp;&gt;
		        <span
		          class="hoverColor"
		          @click.stop="see(vvv)"
		          :index="String(vvv.name?vvv.name.split('/#')[1]:vvv.res_url_ca.split('/#')[1])"
		          v-for="(vvv,iii) in vv.children?vv.children:vv.childsList"
		          :key="iii+'-three'"
		        >{{vvv.name?vvv.name:vvv.res_na}}</span>
		      </p>
		    </div>
		  </el-submenu>
		</el-menu>
		</div>
			<div class="bootomMenu">
			 <div  class="navigateMenu"> 
			      <img src="../img/u1.svg" class="listImgMenu" @click="tapClick1"/>
			  </div>
			   <div   class="navigateMenu">
			  <el-tooltip placement="right">
					 <div slot="content" class="qrcodeCont">
						 <div class="qrcodeContChid">
							 <img :src="qrcodeImg" class="qrcodeImg"/>
								<div class="qrcodeTest">扫一扫获取帮助</div>
						 </div>
					 </div>
				 <div  class="navigateMenu"> 
				     <img src="../img/u2.svg" class="listImgMenu"/>
				 </div>
			 </el-tooltip>
			  </div>
			   <div  class="navigateMenu">
			       <img src="../img/u3.svg" class="listImgMenu" @click="tapClick2"/>
			  </div>
			  </div>
			</div>
</template>

<script>
import qrcodeImg from '../img/qrcode.png';
import moImg from '../img/heart.svg';
export default {
  name: 'ElMenueMineNew',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          JID: localStorage.getItem('__JID__'),
          Url: 'http://192.168.2.226:20100/tu-prj/getFeMenuResToken',
          reqType: 'post'
        };
      }
    }
  },
  data() {
    const myUserinfo = localStorage.getItem('myUserinfo');
    return {
      isCollapse: true,
      leftMenuList: [],
      qrcodeImg: qrcodeImg,
      moImg: moImg,
      myUserinfo: JSON.parse(myUserinfo)
    };
  },
  methods: {
    // hover
    mouseenter() {
      setTimeout(() => {
        if (this.isCollapse) {
          let doms = document.body.getElementsByClassName('el-menu--vertical');
          for (var key = 0; key <= doms.length; key++) {
            if (doms[key] && doms[key].style.display === '') {
              let dom = doms[key].children[0];
              dom.style.maxHeight = document.body.clientHeight - doms[key].style.top.split('px')[0] + 'px';
              dom.style.maxWidth = document.body.clientWidth - doms[key].style.left.split('px')[0] + 'px';
              dom.style.overflow = 'auto';
            }
          }
        }
      }, 400);
    },
    see(vvv) {
      let JID = localStorage.getItem('__JID__');
      // 判断是否是ks
      if (vvv.res_url_ca) {
        if (vvv.res_url_ca.includes('/ks-www')) {
          this.$router.push({ path: vvv.res_url_ca.split('/#')[1] });
          this.$emit('selectMenue', vvv);
        } else {
          location.href = `${vvv.res_url_ca}?JID=${JID}`;
        }
      } else {
        location.href = `${vvv.uri}?JID=${JID}`;
      }
    },
    get_menu_name(name) {
      let len = name.length;
      if (len > 6) {
        return name.substring(0, 6) + '...';
      } else {
        return name;
      }
    },
    // 获取数据
    getMenueList() {
      if (this.data.reqType === 'post') {
        this.$http.post(this.data.Url, { JID: this.data.JID }, { emulateJSON: true })
          .then(res => {
            if (res.data.resultCode !== 'SUCCESS') {
              // 返回登录
              // location.href = res.data.redirectUrl;
              // localStorage.setItem('userInfo', '');
              // localStorage.setItem('__JID__', '');
              return;
            }
            let data = res.data.payload;
            data.forEach(parent => {
              parent.isSetFast = false;
              data.forEach(son => {
                if (parent.treeId === son.parentId) {
                  if (!parent.children) {
                    parent.children = [];
                  }
                  parent.children.push(son);
                }
              });
            });
            let arr = [];
            data.forEach((v, i) => {
              if (v.parentId === '1') {
                arr.push(v);
              }
            });
            this.leftMenuList = arr;
          });
      } else {
        this.$http
          .get(
            this.data.Url,
            {
              params: Object.assign({
                JID: this.data.JID
              })
            },
            { emulateJSON: true }
          ).then(resp => {
            if (resp === undefined || resp.data.obj === undefined) {
              // location.href = location.origin;
              // localStorage.setItem('userInfo', '');
              // localStorage.setItem('__JID__', '');
              return;
            }
            this.leftMenuList = resp.data.obj.childsList;
          });
      }
    },
    tapClick1() {
      if (this.myUserinfo.url2 !== '' && this.myUserinfo.url2 !== undefined) {
        location.href = location.origin.this.myUserinfo.url2;
      }
    },
    tapClick2() {
      if (this.myUserinfo.url3 !== '' && this.myUserinfo.url3 !== undefined) {
        location.href = location.origin.this.myUserinfo.url3;
      }
    }
  },
  mounted() {
    this.getMenueList();
    // ks
    var path = this.$route.path;
    var value = path && (path.includes('/ks') || path.includes('/preview/'));
    if (value) {
      this.$emit('selectMenue', value);
    }
  }
};
</script>

<style lang='scss'>
.el-menu--vertical {
   .el-menu{
      background:#1A90FD;
      padding:24px 18px;
      margin-left:0;
   }
}
.el-menu-new-hover{
  background:#1A90FD;
  color: #ffffff !important;
	p{
		 display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
	}
	.hoverColor{
		&:hover{
		   cursor:pointer;
			 color:aqua !important;
		}
	}
	
}

.el-menue-mine-new {
	overflow:hidden;
}

.el-menue-mine-new {
 background:#1A90FD; 
 /* padding-bottom:168px;
  height:100%;
  overflow:auto; */
  .navigate {
    i {
      font-size: 20px;
      color: #ffffff !important;
    }
    span {
      margin-left: 5px;
      font-weight: normal;
      color: #303133;
    }
  }
  .el-submenu__icon-arrow {
    display: none;
  }
  li {
     text-align:left;
  }
  .el-submenu__title {
   /* padding:0; */
		padding-left:0 !important;
    color:white
  }
  .el-submenu__title:hover {
    background:#006AC3;
  }
  .navigate is-active{
     background:#006AC3;
  }
  .firstLevelMenue .el-submenu__title span {
    font-weight: 700;
    display: inline-block;
    width: calc(100% - 22px);
    height: 100%;
    padding: 0 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .secondLevelMenue .el-submenu__title {
    padding: 0 0 0 47px !important;
    font-weight: 700;
    font-size: 12px;
    span {
      padding-left:0;
      width: 100%;
    }
  }
  .threeLevelMenue {
    padding-right: 12px;
    span {
      padding: 0 0 0 3px !important;
      display: inline-block;
      width: 100%;
      height: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.hover_secondMenu {
  color:#ffffff;
  span:nth-child(1) {
    font-size:14px;
    font-family:Microsoft YaHei;
    font-weight:400;
		margin-right:4px;
  }
  span:nth-child(1):hover {
    cursor: default;
  }
  .hoverColor {
    padding:0 16px;
    border-right:1px solid #ddd;
		border-right-style:0.8;
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    line-height:20px;
    color:rgba(255,255,255,1);
  }
  span:last-child {
    border-right: none;
  }
}
.bootomMenu{
 /*  z-index:200; */
   background:#1A90FD;
    width:48px;
   text-align:left;
}
 .navigateMenu{
		 height:48px;
		 line-height:48px;
	   padding-left:0 !important;
		 width:48px;
		 text-align:center;
		  &:hover{
		    background:#006AC3;
		 }
		 .listImgMenu{
			 display:inline-block;
			 width:17px;
			 height:17px;
		 }
	 }
.el-tooltip__popper.is-dark {
    background: #ffffff;
    border:1px solid rgba(0,0,0,0);
    box-shadow:0px 2px 8px rgba(0,0,0,0.15);
    font-size:12px;
    color:#595959;
    text-align:center
}
.qrcodeCont{

}
.listImg{
      width:22px;
			height:22px;
			background-color:#ffffff;
			mask-repeat:no-repeat;
			-webkit-mask-repeat:no-repeat;
			mask-position: center;
			mask-size:100% 100%;
			-webkit-mask-position:center;
			-webkit-mask-size:100% 100%;
      position: absolute;
      top:50%;
      margin-top:-11px;
      left:50%;
      margin-left: -11px;
    /*  // -webkit-mask-image:url(../img/heart.svg); 
      // mask-image: url(../img/heart.svg); */
}
.el-menu-Content{
	 .topMenu{
		 background:#1A90FD;
		 overflow-x:hidden;
		 width:48px;
		 &::-webkit-scrollbar {
			display: none;
		}
	 }
}
</style>
