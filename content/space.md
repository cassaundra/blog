+++
title = "Spacebar: the final frontier"
date = 2020-04-21
slug = "space"
draft = true

[taxonomies]
tags = []
categories = []
+++

## Demo

<form autocomplete="off">
  <input id="demo-simple">
  <select id="case" name="case">
    <option value="snake">snake_case</option>
    <option value="kebab">kebab-case</option>
    <option value="camel">camelCase</option>
    <option value="class">ClassCase</option>
    <option value="train">Train-Case</option>
  </select>
</form>

Type `let file reader = file lib::File reader::from file();`.

<textarea id="demo-contextual"></textarea>
<div id="editor">function foo(items) {
    var x = "All this is syntax highlighted";
    return x;
}</div>
    
<script src="/ace-builds/src-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>
<script>
    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");
</script>

<script src="/js/spacebar.js"></script>
