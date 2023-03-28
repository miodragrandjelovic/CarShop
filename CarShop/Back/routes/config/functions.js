
var fs = require('fs')
const path = require( "path" );

async function getNames(pathImages) {
    try {

      return await fs.promises.readdir(pathImages);

    } catch (err) {
      console.error('Error occurred while reading directory!', err);
    }
  }

module.exports={
    getNames
}