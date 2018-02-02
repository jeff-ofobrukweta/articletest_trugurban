/**
 * NaterialschemaController
 *
 * @description :: Server-side logic for managing naterialschemas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    Videoscreate(req, res) {

        const body = req.body;
        console.log(body)
        Questions.create({ data: body.questions}).then((result) => {
            body.questions = result.id;
            return Promise.all([result.id,Videosmodel.create(body)]);
        }).then((result) => {
            result[1].questions.add(result[0]);
            result[1].save().then(()=>{});
            
            res.ok(result);
        }).catch((err) => {
            console.log(err);
            res.badRequest(err.invalidAttributes);
        });
        // const body = req.body;
        // Videosmodel.findOne(6).then((result) => {
        //     const sd = Questions.create({ data: body.questions});
        //     return Promise.all([sd,result]);
        // }).then((result) => {
        //     result[1].questions.add(result[0].id);
        //     result[1].save().then(()=>{});
            
        //     res.ok(result);
        // }).catch((err) => {
        //     console.log(err);
        //     res.badRequest(err.invalidAttributes);
        // });
    },
    addOuestions(req, res) {
        const id = req.params.id;
        const body = req.body;
        Videosmodel.findOne(id).then((result) => {
            const sd = Questions.create({ data: body.questions});
            return Promise.all([sd,result]);
        }).then((result) => {
            result[1].questions.add(result[0].id);
            result[1].save().then(()=>{});
            
            res.ok(result);
        }).catch((err) => {
            console.log(err);
            res.badRequest(err.invalidAttributes);
        });
    },
    destroyQuestions(req, res) {
        const id = req.params.id;
        const username = req.body.username;
        Questions.destroy(id).then(function (err) {
            if (err) {
                return res.negotiate(err);
            }
            sails.log(`The user(s) named ${username} have now been deleted, if there were any.`);
            return res.ok();
        });
    },
    Allvideos(req, res) {
        const body = req.body;
        Videosmodel.find(body).populate('questions').then((videos) => {
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
    },
    // homeworkcreate(req, res) {

    //     const id = req.params.id;
    //     const body = req.body;
    //     Videosmodel.findOne(id).then((result) => {
    //         const sd = Exercises.create({ data1: body.exercises});
    //         return Promise.all([sd,result]);
    //     }).then((result) => {
    //         result[1].exercises.add(result[0].id);
    //         result[1].save().then(()=>{});
            
    //         res.ok(result);
    //     }).catch((err) => {
    //         console.log(err);
    //         res.badRequest(err.invalidAttributes);
    //     });
    // }
};

