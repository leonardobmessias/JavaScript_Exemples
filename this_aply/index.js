'use strict';
const {watch, promises:{readFile}} = require('fs')

class File{
  watch(event,filename){
    this.showContent(filename)
  }
  async showContent(filename){
    console.log((await readFile(filename)).toString()) 
  }
}
/*
watch(__filename,async (event,filename)=>{
  console.log((await readFile(filename)).toString()) 
})
*/

const file = new File()
watch(__filename,file.watch.bind(file))    