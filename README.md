# grunt-lightweight-template-precompiler

> Ultra lightweight js template precompiler. You can compile the template without the need of any runtime compilation library

Converts the following template
```html
<!-- awesome-template.html -->
<div class="foo">
  <span class="bar">{value}</span>
</div>
```
into the following
```javascript
(function() {
  window.JST = window.JST || {};
  
  JST['awesome-template'] = function(data) {
    return '<div class="foo">' + 
              '<span class="bar">' + data.value + '</span>' +
            '</div>';
  }
})()
```
which you can use as follows
```javascript
var element = document.getElementById('some-element-id');

element.innerHTML = JST['awesome-template']({value: 'value'});
```

## Why not use JADE or Handlebars or Mustache ?
Sometimes all you need is dynamic html content for smaller things. For examples, the template defined in the above example. If you write those mini templates in javascript, the code becomes unreadable. Jade or Handlebars is kind of overkill for such small templates because even though you precompile them you still need to download their runtime libraries on the client side.

This precompiler tries to solve that problem, write those mini templates in html, precompile them using this grunt plugin & use it on client side without the need of any runtime template libraries. 

**P.S.:** If you have many templates & are not smaller, better go for JADE or Handlebars or Mustache

By the way I needed this while I was working on [stackoverflow-card](https://github.com/mudassir0909/stackoverflow-card) (I had only one template to compile).

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-lightweight-template-precompiler --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-lightweight-template-precompiler');
```

## The "lightweight_template_precompiler" task

### Overview
In your project's Gruntfile, add a section named `lightweight_template_precompiler` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  lightweight_template_precompiler: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.namespace
Type: `String`
Default value: `JST`

A string value that is used to do namespace your compiled templates

### Usage Examples

#### Default Options

```js
In this example, all the precompiled templates
grunt.initConfig({
  lightweight_template_precompiler: {
    options: {},
    files: {
      'dist/templates.js': 'templates/some-template.html'
    },
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
