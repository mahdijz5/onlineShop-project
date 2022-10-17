const short = require('short-uuid');
const appRoot = require("app-root-path");

exports.fileUpload = (files, path,callback) => {
 console.log(files);
    let filesNameList = []
    let filesList = []
    let filepath = ''
    if(files.thumbnail.length > 0) {
        files.thumbnail.map((thumbnail) => {
            const thumbnailName = `${short.generate()}${short.generate()}_${thumbnail.name}`
            const uploadPath = `${appRoot}${path}${thumbnailName}`
            thumbnail.mv(uploadPath, (err) => {
                if (err) {
                    console.log(err)
                }
            })
            filesList.push(thumbnail)
            filesNameList.push(thumbnailName)
            filepath = uploadPath
        })
    }else {
        const thumbnailName = `${short.generate()}${short.generate()}_${files.thumbnail.name}`
            const uploadPath = `${appRoot}${path}${thumbnailName}`
            files.thumbnail.mv(uploadPath, (err) => {
                if (err) {
                    return next(err);
                }
            })
            filesList.push(files.thumbnail)
            filesNameList.push(thumbnailName)
            filepath = uploadPath
    }
    console.log(filesList);
    callback(filesList,filesNameList,path)
}