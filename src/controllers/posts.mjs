import restful from 'node-restful'
import { PostSchema } from '../models/post.mjs'

const Controller = restful.model('Post', PostSchema)

Controller.methods(['get'])
Controller.updateOptions({ new: true, runValidators: true })

Controller.after('get', (req, res, next) => {
    if (req.query.count == 'true') {
        delete req.quer.options
        req.quer.count((error, total) => {
            res.locals.bundle = {
                total: total,
                data: res.locals.bundle
            }
            next()
        })
    } else {
        next()
    }
})

export default Controller