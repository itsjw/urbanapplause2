export const getUploadsImUrl = (file) => {
  return new Promise((resolve, reject) => {
      if (!file || !file.type.match(/image.*/)) return;
        document.body.className = "uploading";
        var fd = new FormData();
        fd.append("upload", file); // Append the file
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://uploads.im/api");
        xhr.onload = function() {
        var url = JSON.parse(xhr.responseText).data.img_url
          console.log(url);
          resolve(url);
        }
        xhr.send(fd);
  })
}

export const getAddressComponents = (place) => {
  var address = {};
        place.address_components.forEach(function(c) {
            switch(c.types[0]){
                case 'street_number':
                    address.StreetNumber = c;
                    break;
                case 'route':
                    address.StreetName = c;
                    break;
                case 'neighborhood': case 'locality':    // North Hollywood or Los Angeles?
                    address.City = c;
                    break;
                case 'administrative_area_level_1':     //  Note some countries don't have states
                    address.State = c;
                    break;
                case 'postal_code':
                    address.Zip = c;
                    break;
                case 'country':
                    address.Country = c;
                    break;
            }
        });

  return address;
}

export const memberSince = (date) => {
  return new Date(date).getFullYear()
}

