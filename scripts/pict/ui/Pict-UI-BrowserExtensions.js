/**
* This file provides extensions to the browser libraries such as jquery
*
* @license     MIT
*
* @author      Steven Velozo <steven@velozo.com>
*
* @description Main RequireJS application.
*/
if (typeof define !== 'function') { var define = require('amdefine')(module); }

define
(
	function()
	{
		// ### Detect which browser version a user is connecting with
		var BrowserDetect = (
		{
			init: function () {
				this.browser = this.searchString(this.dataBrowser) || "Other";
				this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
			},
			searchString: function (data) {
				for (var i = 0; i < data.length; i++) {
					var dataString = data[i].string;
					this.versionSearchString = data[i].subString;

					if (dataString.indexOf(data[i].subString) !== -1) {
						return data[i].identity;
					}
				}
			},
			searchVersion: function (dataString) {
				var index = dataString.indexOf(this.versionSearchString);
				if (index === -1) {
					return;
				}

				var rv = dataString.indexOf("rv:");
				if (this.versionSearchString === "Trident" && rv !== -1) {
					return parseFloat(dataString.substring(rv + 3));
				} else {
					return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
				}
			},

			dataBrowser: [
				{string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
				{string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
				{string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
				{string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
				{string: navigator.userAgent, subString: "Safari", identity: "Safari"},
				{string: navigator.userAgent, subString: "Opera", identity: "Opera"}
			]

		});
		BrowserDetect.init();

		// If they are using ie, add some custom classes to the body in order to deal with eccentricities
		switch (BrowserDetect.browser.toLowerCase()) 
		{
			case 'explorer':
				$('body').addClass('ie ie-'+ BrowserDetect.version);
				break;
		}

		// Add a scrollView function to jquery, to gently slide to specific elements
		$.fn.scrollView = function ()
		{
			return this.each(
				function ()
				{
					$('html, body').animate(
						{
							scrollTop: $(this).offset().top
						},
						1000
					);
				}
			);
		};

		// Add a fast scroll view function to jquery to quickly slide to specific elements
		$.fn.scrollViewFast = function ()
		{
			return this.each(
				function ()
				{
					$('html, body').animate(
						{
							scrollTop: $(this).offset().top
						},
						150
					);
				}
			);
		};

		// Extend jquery to have a case insensitive contains selector
		$.extend
		(
			$.expr[":"],
			{
				"containsNC":
				function (elem, i, match, array)
				{
					return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
				}
			}
		);

		Mousetrap.stopCallback = function(pEvent, pElement, pKeyCombination)
		{
			/* From default implementation -- We don't use this.
			// if the element has the class "mousetrap" then no need to stop
			if ((' ' + element.className + ' ').indexOf(' mousetrap ') > -1)
			{
				return false;
			}
			*/
			// stop for input, select, and textarea
			if (pKeyCombination == 'ctrl+esc')
				return false;
			return pElement.tagName == 'INPUT' || pElement.tagName == 'SELECT' || pElement.tagName == 'TEXTAREA' || (pElement.contentEditable && pElement.contentEditable == 'true');
		};

		return true;
	}
);