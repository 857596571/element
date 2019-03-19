<script>
  export default {
    
    data() {
      return {
        JID: localStorage.getItem('__JID__'),
        Url: 'http://192.168.2.225:83/tu-prj/getFeMenuResToken',
        reqType: 'post'
      }
    }
  }
</script>

## Menue-mine 系统左侧菜单

用于公共左侧菜单

## 基本用法

:::demo Menue-mine 组件。
```html
<template>
  <el-menue-mine
    :data="propData"
  >
  </el-menue-mine>
</template>

<script>
  export default {
    data() {
      return {
        JID: localStorage.getItem('__JID__'),
        Url: 'http://192.168.2.225:83/tu-prj/getFeMenuResToken',
        reqType: 'post'
      };
    },
  };
</script>

```
