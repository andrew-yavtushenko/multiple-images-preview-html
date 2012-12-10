function load_image_previews (input, previewsWraper) {
  var previews = [],
      readers = [],
      rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;

  function build_previews (source) {
    var li = document.createElement("li");
    var img = new Image();
    previewsWraper.appendChild(li);
    li.appendChild(img);
    img.src = source;
  }

  function read_file (file) {
    var reader = new window.FileReader ();
    if (!rFilter.test(file.type)) { 
      alert("File " + file.name + " has type " + file.type + " and it's not an image."); 
      return; 
    }
    reader.readAsDataURL(file);
    reader.onload = function (event) {
      build_previews(event.target.result);
    };
  };
  function collect_files () {
    var files = input.files;
    if (files.length === 0) { return; }
    for (var i = 0; i < files.length; i++) {
      read_file (files[i]);
    }
  };
  return collect_files();
};
window.addEventListener('load', init, false);

function init() {
  var previews = document.getElementById('previews')
  var input = document.getElementById('image_input');
  input.onchange = function() {
    load_image_previews(this, previews);
  };
};