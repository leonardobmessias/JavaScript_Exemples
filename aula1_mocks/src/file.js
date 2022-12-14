const {readFile} = require('fs/promises')
const User = require('./user')
const{ error }= require('./constants')
const DEFAULT_OPTION= {
    maxLines:3,
    filds:["id","name","profession","age"]
}
class File{
  static async csvToJson(filePath){
    const content = await File.getFileContent(filePath)
    const validation =  File.isValid(content)
    if(!validation.valid) throw new Error(validation.error)
    const users =  File.parseCSVToJSON(content)
    return users
  }
  static async getFileContent(filePath){
    return (await readFile(filePath)).toString()
  }
  static  isValid(csvString,options=DEFAULT_OPTION){
    const [header,...fileWithoutHeader] = csvString.split('\n')
    const isHeaderValid = header.trim() === options.filds.join(',')
     const isContaentLenghthAccepted = (
      fileWithoutHeader.length > 0 &&
      fileWithoutHeader.length <= options.maxLines
    )
    if(!isHeaderValid){
      return {
        error:error.FILE_FIELDSERROR_MESSAGE,
        valid:false
      }
    }
    if(!isContaentLenghthAccepted){
      return{
        error:error.FILE_LENGTH_ERROR_MESSAGE,
        valid:false
      }
    }
      return {valid:true}
  }
  static parseCSVToJSON(csvString){
    const lines = csvString.split('\r\n')
    const firtLines = lines.shift()
    const header = firtLines.split(',')
    const users =  lines.map(line=>{
      const columns  = line.split(',')
      let user = {}
      for(const index in columns){
        user[header[index]] = columns[index]
      }
      return new User(user)
    })
    return users
  }
}

module.exports = File