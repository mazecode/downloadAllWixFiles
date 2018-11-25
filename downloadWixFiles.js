'use strict';

// var links = document.querySelectorAll("a.download");
// var uris = [];

/**
 *  Download into file system
 */
// links.forEach(link => {
// 	uris.push(link.href);
// });
// var jsonData = {
// 	'uris': uris
// };
// downloadToFile(jsonData, 'json.txt', 'text/json');

/**
 * Direct donwload
 */
// links.forEach(link => {
// 	setInterval(() => {
// 		setTimeout(() => {
// 			window.downloadFile(link.href);
// 		}, 2000)
// 	}, 10000)
// });

// Source: http://pixelscommander.com/en/javascript/javascript-file-download-ignore-content-type/


window.downloadFile = function (sUrl) {
	//iOS devices do not support downloading. We have to inform user about this.
	if (/(iP)/g.test(navigator.userAgent)) {
		//alert('Your device does not support files downloading. Please try again in desktop browser.');
		window.open(sUrl, "_blank");
		return false;
	}

	//If in Chrome or Safari - download via virtual link click
	if (window.downloadFile.isChrome || window.downloadFile.isSafari) {
		//Creating new link node.
		var link = document.createElement("a");
		link.href = sUrl;
		link.setAttribute("target", "_blank");

		if (link.download !== undefined) {
			//Set HTML5 download attribute. This will prevent file from opening if supported.
			var fileName = sUrl.substring(sUrl.lastIndexOf("/") + 1, sUrl.length);
			link.download = fileName;
		}

		//Dispatching click event.
		if (document.createEvent) {
			var e = document.createEvent("MouseEvents");
			e.initEvent("click", true, true);
			link.dispatchEvent(e);
			return true;
		}
	}

	// Force file download (whether supported by server).
	if (sUrl.indexOf("?") === -1) {
		sUrl += "?download";
	}

	window.open(sUrl, "_blank");
	return true;
}

window.downloadFile.isChrome = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
window.downloadFile.isSafari = navigator.userAgent.toLowerCase().indexOf("safari") > -1;

function downloadToFile(json, name) {
	var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));

	var a = document.createElement('a');
	a.href = 'data:' + data;
	a.download = name;
	a.innerHTML = 'download .txt file of json';
	a.click();
}

async function doDownloadAll() {
	console.log('starting...');

	processArray(jsonData.uris);
}

//*** */

function delay() {
	return new Promise(resolve => setTimeout(resolve, 3000));
}

async function delayedLog(item) {
	await delay();

	window.downloadFile(item);

	var fileCheked = document.createElement('li');
	fileCheked.innerText = item;
	document.getElementById('downloaded').appendChild(fileCheked);
}

async function processArray(array) {
	for (const item of array) {
		await delayedLog(item);
	}
	console.log('Done!');
}

async function processArray2(array) {
	const promises = array.map(delayedLog);
	await Promise.all(promises);
	console.log('Done!');
}