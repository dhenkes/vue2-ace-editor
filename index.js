var ace = require('brace');

module.exports = {
  template: '<div :style="{height: height, width: width}"></div>',

  props: {
    content: {
      type: String,
      required: true
    },
    lang: {
      type: String,
      default: 'javascript'
    },
    theme: {
      type: String,
      default: 'chrome'
    },
    height: {
      type: String,
      default: '300px'
    },
    width: {
      type: String,
      default: '100%'
    },
    sync: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: function () { return {}; }
    },
    id: {
      type: String,
      default: null
    }
  },

  data: function () {
    return {
      editor: null,
    };
  },

  mounted: function () {
    var vm = this;
    var lang = vm.lang;
    var theme = vm.theme;
    var editor = vm.editor = ace.edit(vm.$el);
    var options = vm.options;
    editor.$blockScrolling = Infinity;
    editor.getSession().setMode('ace/mode/' + lang);
    editor.setTheme('ace/theme/' + theme);
    editor.setValue(vm.content, 1);
    editor.setOptions(options);
    editor.on('change', function () {
      vm.$parent.$emit('editor-update', editor.getValue(), vm.id);
    });
  },

  watch: {
    content: function (newContent) {
      var vm = this;
      if (vm.sync) {
        vm.editor.setValue(newContent, 1);
      }
    },

    theme: function (newTheme) {
      var vm = this;
      vm.editor.setTheme('ace/theme/' + newTheme);
    }
  }
};
