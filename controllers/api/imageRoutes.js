const router = require('express').Router();
const {cloudinary} = require('../../utils/cloudinary')

router.get('/', async (req, res) => {
  const {resources} = await cloudinary.search.expression('folder:dev_setups')
  .sort_by('public_id', 'desc')
  .max_results(30)
  .execute()
  const publicIds = resources.map( file => file.public_id);
  res.send(publicIds)
})

router.post('/upload', async (req,res) => {
  try {
    const fileStr = req.body.data;
    console.log('THIS IS THE BODY DATA!!!!!',req.body.data);
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setups"
    })
    console.log(uploadedResponse);
    res.json({ msg: "YAAAAAAY PICTURE UPLOADED" })
    
  } catch (error) {
    console.error(error)
    res.status(500).json({ err: 'Something went wrong!' })
  }
})



module.exports = router;
