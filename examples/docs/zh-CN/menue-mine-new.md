<script>
  export default {
    
    data() {
      return {
        JID: localStorage.getItem('__JID__'),
        Url: 'http://192.168.2.225:83/tu-prj/getFeMenuResToken',
				defaultPic: '/mhgl-prj/userInfo/defaultPic',
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
  <el-menue-mine-new
    :data="propData"
  >
  </el-menue-mine-new>
</template>

<script>
  export default {
    data() {
      return {
        JID: localStorage.getItem('__JID__'),
        Url: 'http://192.168.2.225:83/tu-prj/getFeMenuResToken'（获取左侧菜单网址）,
        defaultPic: '/mhgl-prj/userInfo/defaultPic',(左侧菜单默认图片)
        reqType: 'post'
      };
    },
  };
</script>

```
