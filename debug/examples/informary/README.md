# Test Harness

This index.html loads informary (in its non-minified form) and allows you to fill 
a form out and marshal it back and forth to simple JSON strings.  


## Minified versus non-minified version

The test harness uses the non minified version for easy breakpoints and testing of 
what's going on even without the browser map.  If you want to change this to use
the minified version, just change line 11 in index.html from:

```
<script src="../dist/informary.js"></script>
```

to:

```
<script src="../dist/informary.min.js"></script>
```

It is possible that minification could cause bugs that don't show up in the 
unfolded version of code, albeit very unlikely.


## Page load render
There is an onload override that also can force it to marshal in the data in the 
second text area labeled "Informary Input" when the page loads.  You will need to
uncomment the index.html line #70 containing the marshal call, which looks like this:

```
                // Uncomment this line to automatically load the data below into the form after page load
                //pushInformaryDataToForm();
```


## To render to PDF using wkhtmltopdf
wkhtmltopdf --enable-local-file-access --enable-javascript --debug-javascript index.html index.pdf


## Extra javascript wkhtmltopdf options if you want them
wkhtmltopdf --enable-local-file-access --enable-javascript --javascript-delay 1000 --no-stop-slow-scripts --debug-javascript index.html index.pdf