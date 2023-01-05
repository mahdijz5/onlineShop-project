const short = require('short-uuid');
const appRoot = require("app-root-path");

exports.fileUpload = (files, path,callback) => {
    let filesNameList = []
    let filesList = []
    let filepath = ''
    if(files.image.length > 0) {
        files.image.map((image) => {
            const imageName = `${short.generate()}${short.generate()}_${image.name}`
            const uploadPath = `${appRoot}${path}${imageName}`
            image.mv(uploadPath, (err) => {
                if (err) {
                    callback(false,false,false ,err)
                }
            })
            filesList.push(image)
            filesNameList.push(imageName)
            filepath = uploadPath
        })
    }else {
        const imageName = `${short.generate()}${short.generate()}_${files.image.name}`
            const uploadPath = `${appRoot}${path}${imageName}`
            files.image.mv(uploadPath, (err) => {
                if (err) {
                    callback(false,false,false ,err)
                }
            })
            filesList.push(files.image)
            filesNameList.push(imageName)
            filepath = uploadPath
    }
    console.log(filesList);
    callback(filesList,filesNameList,path )
}