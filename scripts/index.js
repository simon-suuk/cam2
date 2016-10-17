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
	var Latitude = undefined;
	var Longitude = undefined;
	function onDeviceReady() {
		// Get geo coordinates 
		 
		function getMapLocation() {
		 
		    navigator.geolocation.getCurrentPosition
		    (onMapSuccess, onMapError, { enableHighAccuracy: true });
		}
		 
		// Success callback for get geo coordinates 
		 
		var onMapSuccess = function (position) {
		 
		    Latitude = position.coords.latitude;
		    Longitude = position.coords.longitude;
		 
		    getMap(Latitude, Longitude);
		 
		}
		 
		// Get map by using coordinates 
		 
		function getMap(latitude, longitude) {
		 
		    var mapOptions = {
			center: new google.maps.LatLng(0, 0),
			zoom: 1,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		    };
		 
		    map = new google.maps.Map
		    (document.getElementById("map"), mapOptions);
		 
		 
		    var latLong = new google.maps.LatLng(latitude, longitude);
		 
		    var marker = new google.maps.Marker({
			position: latLong
		    });
		 
		    marker.setMap(map);
		    map.setZoom(15);
		    map.setCenter(marker.getPosition());
		}
		 
		// Success callback for watching your changing position 
		 
		var onMapWatchSuccess = function (position) {
		 
		    var updatedLatitude = position.coords.latitude;
		    var updatedLongitude = position.coords.longitude;
		 
		    if (updatedLatitude != Latitude && updatedLongitude != Longitude) {
		 
			Latitude = updatedLatitude;
			Longitude = updatedLongitude;
		 
			getMap(updatedLatitude, updatedLongitude);
		    }
		}
		 
		// Error callback 
		 
		function onMapError(error) {
		    console.log('code: ' + error.code + '\n' +
			'message: ' + error.message + '\n');
		}
		 
		// Watch your changing position 
		 
		function watchMapPosition() {
		 
		    return navigator.geolocation.watchPosition
		    (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
		}
	
	};

})();
