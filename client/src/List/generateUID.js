export default function generateUID() {
  let length = 8;
  let timestamp = +new Date();
  
  function _getRandomInt( min, max ) {
   return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }
  
  function generate() {
    var ts = timestamp.toString();
    var parts = ts.split( "" ).reverse();
    var id = "";
    
    for( var i = 0; i < length; ++i ) {
     var index = _getRandomInt( 0, parts.length - 1 );
     id += parts[index];	 
    }
    
    return id;
  }

  return generate();
}