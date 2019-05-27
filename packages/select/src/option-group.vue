<template>
  <!-- <ul class="el-select-group__wrap" v-show="visible"> -->
  <ul v-if="!fold" class="el-select-group__wrap" v-show="visible">
    <li class="el-select-group__title">{{ label }}</li>
    <li>
      <ul class="el-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
  <ul v-else class="el-select-group__wrap" v-show="visible">
    <li class="el-select-group__title" @click="foldFun" style="cursor: pointer;font-weight: 900;color: #000;padding-left: 0px">
      <i :class="['el-select__caret', 'el-input__icon', 'el-icon-caret-right']" :style="liVisible ? 'transform: rotate(90deg)' : ''"></i>
      {{ label }}
    </li>
    <li v-show="liVisible && foldItem === label">
      <ul class="el-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
  import Emitter from 'element-ui/src/mixins/emitter';

  export default {
    mixins: [Emitter],

    name: 'ElOptionGroup',

    componentName: 'ElOptionGroup',

    props: {
      label: String,
      disabled: {
        type: Boolean,
        default: false
      },
      fold: Boolean,
      foldItem: String
    },

    data() {
      return {
        visible: true,
        liVisible: false
      };
    },

    watch: {
      disabled(val) {
        this.broadcast('ElOption', 'handleGroupDisabled', val);
      },
      foldItem(val) {
        if (val !== this.label) {
          this.liVisible = false;
        }
      }
    },

    methods: {
      foldFun() {
        this.liVisible = !this.liVisible;
        console.log(this.foldItem);
        if (this.liVisible) {
          this.$emit('update:foldItem', this.label);
        }
      },
      queryChange() {
        this.visible = this.$children &&
          Array.isArray(this.$children) &&
          this.$children.some(option => option.visible === true);
      }
    },

    created() {
      this.$on('queryChange', this.queryChange);
    },

    mounted() {
      if (this.disabled) {
        this.broadcast('ElOption', 'handleGroupDisabled', this.disabled);
      }
    }
  };
</script>
