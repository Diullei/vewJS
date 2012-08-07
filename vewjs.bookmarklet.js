(function(){
  var v     = '1.4.4';
  if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
    var done      = false;
    var script    = document.createElement('script');
    script.src    = 'https://ajax.googleapis.com/ajax/libs/jquery/'+ v +'/jquery.min.js';
    script.onload = script.onreadystatechange = function(){
      if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) {
        done = true;
        initMyBookmarklet();
      }
    };
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    initMyBookmarklet();
  }
  function initMyBookmarklet() {
    var script    = document.createElement('script');
    script.src    = 'https://raw.github.com/danielfilho/vewJS/dev/vew.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  }
})();
