# vue2-ace

A Vue2 component for including the [ace editor](https://ace.c9.io/).

### Installation

```
npm install --save vue2-ace
```

### How to use

Import the component, the mode and the theme in `<script>`.

```
import editor from 'vue2-ace'
import 'brace/mode/javascript'
import 'brace/theme/chrome'
```

Register the component in the Vue options.

```
components: {
  editor
}
```

Use the component in your `template`. Make sure to change `variable` to a string
the editor should start with (it can be an empty string too).

```
<editor :value="variable"></editor>
```

Alternatively, create a two-way binding between editor content and component data using v-model:

```
<editor v-model="myVariable"></editor>
```

The value prop is required, the other props have the following defaults:

```
lang: javascript
theme: chrome
height: 300px
width: 100%
sync: false
options: {}
```

If you want to change any of these defaults, just include them when you use the
component in the template.

```
<editor :content="variable" :height="'500px'"></editor>

<editor :content="variable" :width="'50%'"></editor>

<editor :content="variable" :lang="'html'"></editor>

<editor :content="variable" :theme="'github'"></editor>

<editor :content="variable" :sync="true"></editor>

<editor :content="variable" :options="options"></editor>
```

The theme can be changed after the component already has been mounted. Just
change the string of the theme-variable.

To sync the content of the editor to the original content-variable, set the
sync prop to true. Watch out: Every time the the original variable updates, the
editor will also update it's content.

If you want to use another lang or theme, don't forget to import it.

You can pass extra options like font-family or font-size using the option prop.
It is set in the component using `editor.setOptions()`.

```
data () {
  return {
    options: {
      fontSize: '12pt'
    }
  }
}
```

Last but not least: listen to the `input` event. `onEditorContentUpdate`
is the function you'd like to call on update.

```
<editor @input="onEditorContentUpdate"></editor>
```
