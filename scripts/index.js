(function() {

	document.addEventListener('deviceready', onDeviceReady.bind(this), false);
	var pictureSource;
	var destinationType;
	function onDeviceReady() {
		pictureSource = navigator.camera.PictureSourceType;
		destinationType = navigator.camera.DestinationType;

		document.getElementById("capturePhoto").onclick = function() {
			navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
				quality : 50,

				destinationType : destinationType.DATA_URL
			});
		}
		  
		  
	
	};
	function onPhotoDataSuccess(imageData) {

		var smallImage = document.getElementById('smallImage');

		smallImage.style.display = 'block';

		smallImage.src = "data:image/jpeg;base64," + imageData;

	}

	function onFail(message) {

		alert('Failed because: ' + message);

	}

})();


(function() {

	document.addEventListener('deviceready', onDeviceReady.bind(this), false);
	
	function onDeviceReady() {
		

		document.getElementById("scanBarcode").onclick = function() {
			cordova.plugins.barcodeScanner.scan(
			      function (result) {
				  alert("We got a barcode\n" +
					"Result: " + result.text + "\n" +
					"Format: " + result.format + "\n" +
					"Cancelled: " + result.cancelled);
			      },
			      function (error) {
				  alert("Scanning failed: " + error);
			      },
			      {
				  "preferFrontCamera" : true, // iOS and Android 
				  "showFlipCameraButton" : true, // iOS and Android 
				  "prompt" : "Place a barcode inside the scan area", // supported on Android only 
				  "formats" : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED 
				  "orientation" : "landscape" // Android only (portrait|landscape), default unset so it rotates with the device 
			      }
			   );
		}
	
	};

})();


(function() {

	document.addEventListener('deviceready', onDeviceReady.bind(this), false);
	
	function onDeviceReady() {
		//Get User’s location using Geolocation plugin
		navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });
		
		function onSuccess(position) {
			var lat=position.coords.latitude;
			var lang=position.coords.longitude;

			//Google Maps
			var myLatlng = new google.maps.LatLng(lat,lang);
			var mapOptions = {zoom: 20,center: myLatlng}
			var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			var marker = new google.maps.Marker({position: myLatlng,map: map});
		}
		
		function onError(error) {
			alert('code: ' + error.code + '\n' +
			'message: ' + error.message + '\n');
		}
		google.maps.event.addDomListener(window, 'load', onSuccess);
	
	};

})();
