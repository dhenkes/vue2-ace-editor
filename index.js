var ace = require('brace');

module.exports = {
  template: '<div :style="{height: height, width: width}"></div>',
  model: {
    prop: 'content'
  },
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
    options: {		
      type: Object,		
      default: function () { return {}; }
    }
  },

  data: function () {
    return {
      editor: null,
      lastContent: ""
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
      vm.$emit('input', editor.getValue());
      vm.$parent.$emit('editor-update', editor.getValue());
      vm.lastContent = vm.content;
    });
  },

  watch: {
    content(newContent) {
      var vm = this;
      if (vm.lastContent != newContent){
        vm.editor.setValue(newContent, 1);
      }
    },

    theme(newTheme) {
      var vm = this;
      vm.editor.setTheme('ace/theme/' + newTheme);
    }
  }
};
