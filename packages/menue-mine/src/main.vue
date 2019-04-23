<template>
  <el-menu
    :unique-opened="true"
    :default-active="$route.path"
    router
    class="el-menue-mine"
    :collapse="isCollapse"
    :style="{ width: isCollapse ? '45px' : '200px' }"
  >
    <el-menu-item @click="isCollapse = !isCollapse" :index="$route.path" class="navigate">
      <i class="el-icon-qz-menu"></i>
      <span>网站导航</span>
    </el-menu-item>

    <el-submenu
      :index="String(i)"
      @mouseenter.native="mouseenter"
      v-for="(v,i) in leftMenuList"
      :key="i"
      class="firstLevelMenue"
    >
      <template slot="title">
        <img v-if="v.resIconNo" :src="v.resIconNo" style="width: 22px;height: 22px;">
        <img v-else src="../img/nomenueimg.png" style="width: 22px;height: 22px;">
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
        class="el-menu-item"
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
</template>

<script>
export default {
  name: 'ElMenueMine',
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          JID: localStorage.getItem('__JID__'),
          Url: 'http://192.168.2.225:83/tu-prj/getFeMenuResToken',
          reqType: 'post'
        };
      }
    }
  },
  data() {
    return {
      isCollapse: true,
      leftMenuList: []
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
              location.href = res.data.redirectUrl;
              localStorage.setItem('userInfo', '');
              localStorage.setItem('__JID__', '');
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
              location.href = location.origin;
              localStorage.setItem('userInfo', '');
              localStorage.setItem('__JID__', '');
              return;
            }
            this.leftMenuList = resp.data.obj.childsList;
          });
      }
    }
  },
  mounted() {
    this.getMenueList();
    // ks
    var value = this.$route.path.split('ks')[1];
    if (value) {
      this.$emit('selectMenue', value);
    }
  }
};
</script>

<style lang='scss'>
.el-menue-mine {
  .navigate {
    i {
      font-size: 24px;
      color: #898989 !important;
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
  & > li:nth-child(1) {
    padding: 0 0 0 11px !important;
  }
  li {
    text-align: left;
  }
  .el-submenu__title {
    padding: 0 0 0 11px !important;
  }
  .el-submenu__title:hover {
    background: #ecf5ff;
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
      padding-left: 0;
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
  color: #303133;
  span:nth-child(1) {
    font-weight: 700;
  }
  span:nth-child(1):hover {
    cursor: default;
  }
  .hoverColor {
    padding: 0 10px;
    border-right: 2px solid #ddd;
  }
  span:last-child {
    border-right: none;
  }
}
</style>
