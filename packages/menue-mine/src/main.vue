<template>
   <el-menu :unique-opened="true" :default-active="$route.path" router class="el-menu-vertical-demo el-menue-mine" :collapse="isCollapse" :style='{ width: isCollapse ? "45px" : "200px" }'>
      <el-menu-item @click="change" :index="$route.path">
         <img src="../img/menue.png" style="margin:0 auto;width: 25px;height: 25px;"/>
         <span style="color: #303133!important;font-weight:normal;">&nbsp;&nbsp;网站导航</span>
      </el-menu-item>

      <el-submenu :index="String(i)" v-for="(v,i) in leftMenuList" :key="i" class="firstLevelMenue">
         <template slot="title">
           <img v-if="v.resIconNo" :src="v.resIconNo" style="width: 22px;height: 22px;padding-right: 10px"/>
           <img v-else src="@/assets/nomenueimg.png" style="width: 22px;height: 22px;padding-right: 10px"/>
           <span :title="v.name?v.name:v.res_na">{{get_menu_name(v.name?v.name:v.res_na)}}</span>
         </template>
         <el-submenu v-show="!isCollapse" :index="String(vv.treeId?vv.treeId:vv.id)" v-for="(vv,ii) in v.children?v.children:v.childsList" :key="ii" class="secondLevelMenue">
           <template slot="title">
             <span :title="vv.name?vv.name:vv.res_na">
               {{get_menu_name(vv.name?vv.name:vv.res_na)}}
             </span>
           </template>
           <el-menu-item :index="String(vvv.uri?vvv.uri.split('/#')[1]:vvv.res_url_ca.split('/#')[1])" v-for="(vvv,iii) in vv.children?vv.children:vv.childsList" :key="iii" class="threeLevelMenue">
             <span class="text-center" :title="vvv.name?vvv.name:vvv.res_na" @click.stop="see(vvv)">• {{get_menu_name(vvv.name?vvv.name:vvv.res_na)}}</span>
           </el-menu-item>
         </el-submenu>

          <!--hover展示的-->
          <el-menu-item :index="$route.fullPath" v-for="(vv,ii) in v.children?v.children:v.childsList" :key="ii+'-second'" v-show="isCollapse">
              <p class="hover_secondMenu"><span>{{vv.name?vv.name:vv.res_na}}</span>&nbsp;&gt;<span class="hoverColor" @click.stop="see(vvv)" :index="String(vvv.name?vvv.name.split('/#')[1]:vvv.res_url_ca.split('/#')[1])" v-for="(vvv,iii) in vv.children?vv.children:vv.childsList" :key="iii+'-three'">{{vvv.name?vvv.name:vvv.res_na}}</span></p>
          </el-menu-item>
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
    mounted() {
      this.getMenueList();
    },
    methods: {
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
      change() {
        this.isCollapse = !this.isCollapse;
      },
      getMenueList() {
        if (this.data.reqType === 'post') {
          this.$http.post(
            this.data.Url,
            {JID: this.data.JID},
            { emulateJSON: true }
          ).then(
            res => {
              if (res.data.resultCode !== 'SUCCESS') {
                // 返回登录
                location.href = res.data.redirectUrl;
                localStorage.setItem('userInfo', '');
                localStorage.setItem('__JID__', '');
                return;
              }
              let data = res.data.payload;
              data.forEach((parent)=>{
                parent.isSetFast = false;
                data.forEach((son)=>{
                  if (parent.treeId === son.parentId) {
                    if (!parent.children) {
                      parent.children = [];
                    }
                    parent.children.push(son);
                  }
                });
              });
              let arr = [];
              data.forEach((v, i)=>{
                if (v.parentId === '1') {
                  arr.push(v);
                }
              });
              this.leftMenuList = arr;
            });
        } else {
          this.$http.get(
            this.data.Url,
            {
              params: Object.assign({
                JID: this.data.JID
              })
            },
            { emulateJSON: true }
          ).then(
            resp => {
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
    }
  };
</script>

<style lang='scss'>
  .el-menue-mine{
      .el-submenu__icon-arrow{
          display: none;
      }
      &>li:nth-child(1){
      padding:0 0 0 13px!important;
    }
    li{
      text-align: left;
    }
    .el-submenu__title{
      padding: 0!important;
      padding-left: 14px!important;
    }
    .el-submenu__title:hover{
      background: #ecf5ff;
    }
      .firstLevelMenue .el-submenu__title span{
          font-weight: 700;
      }
      .secondLevelMenue .el-submenu__title{
           padding:0 0 0 47px!important;
          font-weight: 700;
          font-size: 12px;
      }
      .threeLevelMenue span {
            padding:0 0 0  3px!important;
      }
  }
  .hover_secondMenu{
      color: #303133;
      span:nth-child(1){
          font-weight: 700;
      }
      span:nth-child(1):hover{
          cursor: default;
      }
      .hoverColor{
          padding: 0 10px;
          border-right: 2px solid #ddd;
      }
      span:last-child{
          border-right: none;
      }
  }
</style>
