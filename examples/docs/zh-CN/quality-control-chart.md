## Quality-control-chart 质控图

用于展示设备质量控制图

## 基本用法

:::demo Quality-control-chart 组件。
```html
<template>
  <el-quality-control-chart :data="data"></el-quality-control-chart>
</template>

<script>
  export default {
    data() {
      return {
        data:{
            JID: '0FE6662335583E909cd99997-8dd2-4c07-a10e-24f572fe4721',
            echartsURL:'http://192.168.2.225/sbgl-prj/gzyq/runGzyq',
            prn: '294263760008',
            getEchartsDataParamBtnCode: "BTN_247335599528",
            getLineBaseParamBtnCode: "BTN_252753500664"
        }
      };
    }
  };
</script>
```
