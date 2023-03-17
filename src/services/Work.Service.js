const Work = require('../models/Work.model')
const UploadImg = require('./Image.Service')
const CreateWorkService = async (data, file) => {
    try {
        const image = await UploadImg(file)
    
        const work = new Work({
            title: data.title,
            description: data.description,
            image: image ? image.url : '',
        })
    
        if(work) {
            work.save()
            
            return {
                result: 'success',
                work: work
            }
        }
    
        return {
            result: 'failed'
        }
        
    } catch (error) {
        return {
            result: 'error',
            error: error
        }
    }



}
module.exports = {CreateWorkService}