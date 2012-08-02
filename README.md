vewJS
=====

Video Element Watcher - A script to watch &lt;video> element

Still testing. To do it, you have to:

* Add a class named `vew` to the `<video>` element
* Add this bookmarklet to your modern browser: [vewJS](javascript\:\(function\(\)\{function r\(\)\{var e=document.createElement\(\'script\'\)\;e.src=\'https://raw.github.com/danielfilho/vewJS/dev/vew.js\',document.getElementsByTagName\(\'head\'\)[0].appendChild\(e\)\}var e=\'1.4.4\'\;if\(window.jQuery===undefined||window.jQuery.fn.jquery<e\)\{var t=!1,n=document.createElement\(\'script\'\)\;n.src=\'https://ajax.googleapis.com/ajax/libs/jquery/\'+e+\'/jquery.min.js\',n.onload=n.onreadystatechange=function\(\)\{!t&&\(!this.readyState||this.readyState==\'loaded\'||this.readyState==\'complete\'\)&&\(t=!0,r\(\)\)\},document.getElementsByTagName\(\'head\'\)[0].appendChild\(n\)\}else r\(\)\}\)\(\)\;)
* Click it when your page is loaded
* Play the video and watch it :)