<script>
  export default {
    
    data() {
      return {
       baseUrl: 'http://192.168.2.52:30009',
			 btnCodeSetSkin: 'BTN_310682130088',
			 JID: localStorage.getItem('__JID__'),
			 setSkinUrl: '/ywpz-prj/gzyq/runGzyq',
			 setPasswordUrl: '/tu-prj/cu/update/loginpwdbyToken',
			 loginOutUrl: '/tu-prj/userLogOut',
			 uploadImg: '/sz-prj/filemgr/addBusinessFile',
			 Pictureshows: '/sz-prj/filemgr/downloadFile?prn=',
			 getUserInfo: '/mhgl-prj/userInfo/search',
			 saveModify: '/mhgl-prj/userInfo/modify',
      }
    }
  }
</script>

## Header-mine-new 公共头部

用于公共头部

## 基本用法

:::demo Header-mine-new 组件。
```html
<template>
  <el-header-mine-new
    :data="propData"
  >
  </el-header-mine-new>
</template>

<script>
  export default {
    data() {
      return {
        baseUrl: 'http://192.168.2.52:30009',（基本api前缀，若下方前缀网址不变可以只传基础网址和网址）
        btnCodeSetSkin: 'BTN_310682130088',（必要）
        JID: localStorage.getItem('__JID__'),（必传）
        setSkinUrl: '/ywpz-prj/gzyq/runGzyq',（必要）
        setPasswordUrl: '/tu-prj/cu/update/loginpwdbyToken',（必要）
        loginOutUrl: '/tu-prj/userLogOut',（必要）
        uploadImg: '/sz-prj/filemgr/addBusinessFile',（必要）
        Pictureshows: '/sz-prj/filemgr/downloadFile?prn=',（必要）
        getUserInfo: '/mhgl-prj/userInfo/search',（必要）
        saveModify: '/mhgl-prj/userInfo/modify',（必要）
      };
    },
  };
</script>

```
