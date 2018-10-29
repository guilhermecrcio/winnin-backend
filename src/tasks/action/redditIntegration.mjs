import '../../config/database.mjs'
import axios from 'axios'
import { PostModel } from '../../models/post.mjs'

(async () => {
    const response = await axios.get('https://api.reddit.com/r/artificial/hot')
    
    if (response.status == 200) {
        const posts = response.data.data.children.map((redditPost, i) => {
            let { title, author, created_utc, id, ups, num_comments, preview, url } = redditPost.data
            let image = null
            
            if (preview != undefined) {
                image = preview.images[0].resolutions.filter((redditImage, i) => {
                    if (redditImage.width == 108) {
                        return true
                    }
                    
                    return false
                })[0].url
            }
            
            return new Promise((resolve, reject) => {
                console.log('INIT')
                let postObject = {
                    title,
                    author,
                    createdAt: new Date(created_utc * 1000),
                    externalId: id,
                    ups,
                    comments: num_comments,
                    image,
                    url
                }
                
                PostModel.findOne({ externalId: id })
                    .then((post) => {
                        if (post == null) {
                            console.log(id, 'INSERTED')
                            post = new PostModel(postObject)
                        } else {
                            console.log(id, 'UPDATED')
                            Object.keys(postObject).forEach((k, i) => {
                                post[k] = postObject[k]
                            })
                        }
                        
                        console.log('SAVE')
                        post.save().then(() => resolve()).catch((error) => reject(error))
                    })
                    .catch((error) => reject(error));
            })
        })
        
        Promise.all(posts)
            .then(() => process.exit())
            .catch((error) => console.log(error))
    }
})()
