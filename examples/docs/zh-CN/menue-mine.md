<script>
  export default {
    
    data() {
      return {
        // JID: localStorage.getItem('__JID__'),
        JID: '92A87730EB59E3C786f2fd5f-5f54-4056-a08f-cfe5cbb1f32c',
        Url: 'https://234728c28e.iok.la:10021/tu-prj/getFeMenuResToken'
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
        // JID: localStorage.getItem('__JID__'),
        JID: '92A87730EB59E3C786f2fd5f-5f54-4056-a08f-cfe5cbb1f32c',
        Url: 'https://234728c28e.iok.la:10021/tu-prj/getFeMenuResToken'
      };
    },
  };
</script>

```
