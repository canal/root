This share is used for loading ExtJS, or any other javascript common libraries into the multiplan web environment.


Syntax:

<script src="http://uix.multiplan.com/jsloader/jsloader.js"></script>
<script>
  JSLoader.load("extjs", "ext", "2.0.2");
</script>


The JSLoader will be available to all portlets from the page decorator and they can load any required libraries via a JSLoader.load(..).

JSLoader will load libraries once by maintaining a list of loaded modules. Any subsequent load calls on an already loaded library will simply be ignored.

