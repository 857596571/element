<script>
  export default {
    
    data() {
      return {
        propData:{
            prn:'HDZN/J20181226009',
            data_interface:'http://47.92.143.222:82/lcgl-prj/taskTrans/',
            JID:'524EF121515C6DE9c4c7436d-813c-4552-a756-358e63980dbb'
        },
      }
        
    }
  }
</script>

## flow-record 流转记录

流转记录

## 基本用法

:::demo flow-record 组件。
```html
<template>
  <el-flow-record
    :data="propData"
  >
  </el-flow-record>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        propData:{
            prn:'F1810163263',
            data_interface:'http://192.168.2.225:30024/lcgl-prj/taskTrans/',
            JID:'4919b69a-ee5b-4532-971b-974281789064'
        },
      };
    },
  };
</script>

```
