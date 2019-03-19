<script>
  export default {
    
    data() {
      return {
        JID: localStorage.getItem('__JID__'),
        setSkinUrl: 'http://192.168.2.225/ywpz-prj/gzyq/runGzyq',
        setPasswordUrl: 'http://192.168.2.225/tu-prj/cu/update/loginpwdbyToken',
        loginOutUrl: 'http://192.168.2.225/tu-prj/userLogOut'
      }
    }
  }
</script>

## Header-mine 公共头部

用于公共头部

## 基本用法

:::demo Header-mine 组件。
```html
<template>
  <el-header-mine
    :data="propData"
  >
  </el-header-mine>
</template>

<script>
  export default {
    data() {
      return {
        JID: localStorage.getItem('__JID__'),
        setSkinUrl: 'http://192.168.2.225/ywpz-prj/gzyq/runGzyq',
        setPasswordUrl: 'http://192.168.2.225/tu-prj/cu/update/loginpwdbyToken',
        loginOutUrl: 'http://192.168.2.225/tu-prj/userLogOut'
      };
    },
  };
</script>

```
