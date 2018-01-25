/**
 * NaterialschemaController
 *
 * @description :: Server-side logic for managing naterialschemas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    Videoscreate(req, res) {
        const body = req.body;
        Videosmodel.create(body).then((Videosmodel) => {
            res.json(Videosmodel);
        }).catch((err) => {
            res.badRequest(err.invalidAttributes);
        });
    },
    Allvideos(req, res) {
        const body = req.body;
        Videosmodel.find(body).then((videos) => {
            sails.log(videos)
            // console.log(sails.hooks.http.app);    
            return res.json(videos);
        })
    },
    findcategory(req, res) {
        const category = req.body.category;
        Videosmodel.find({ category: category }).exec(function (err, Videosmodel) {
            if (err) {
                return res.serverError(err);
            }
            sails.log(':::::::', Videosmodel);
            return res.json(Videosmodel);
        });
    },
    french(req, res) {
        Videosmodel.find({ category: 'biginners', language: 'french' }).exec(function (err, Videosmodel) {
            if (err) {
                return res.serverError(err);
            }
            sails.log(':::::::', Videosmodel);
            return res.json(Videosmodel);
        });
    }
};

