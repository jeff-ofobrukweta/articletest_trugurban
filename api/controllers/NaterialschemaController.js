/**
 * NaterialschemaController
 *
 * @description :: Server-side logic for managing naterialschemas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    subquestionscreate(req, res) {
        const body = req.body;
        const subquestionsflow= body.subquestionsflow
        const questions= body.questions
        const videourl= body.videourl
        const language= body.language
        //for the video-model
        const lesson_title= body.lesson_title
        const lesson_number= body.lesson_number
        const read_preview= body.read_preview
        const level= body.level
        
        //for the question-model
        const answer= body.answer
        //this is for the other attributes model
        const subquestions= body.subquestions
        const subquestions2= body.subquestions2
        // console.log("this is the user input"+body)
        Exercises.create({ exercises: body.exercises}).then((result) => {
            body.exercises = result.id;

        
            return Promise.all(
                [result.id,Subquestions.create({"subquestions":subquestions,"subquestions2":subquestions2}),
                Questions.create({"questions":questions,"answer":answer,"subquestionsflow":subquestionsflow}),Videosmodel.create({"lesson_title":lesson_title,"level":level,"language":language,"lesson_number":lesson_number,"read_preview":read_preview,"videourl":videourl,})
            ]
            );
        })
        .then((result) => {
            //the id of the subquestion model
            const subvalue = result[1].id
            // the id of the Question model
            const questionvalue = result[2].id
            
            //add each of the models to each other and save them correspondingly
            result[1].exercises.add(result[0]);
            result[2].subquestions.add(subvalue);
            result[3].questions.add(questionvalue);


            result[1].save().then(()=>{
                console.log('the first is saved :::')
            });
            result[2].save().then(()=>{
                console.log('the second is saved :::')
            });
            result[3].save().then(()=>{
                console.log('the third is saved :::')
            });
            res.ok(result);
        }).catch((err) => {
            console.log(err);
            res.badRequest(err.invalidAttributes);
        });
    },
    Videoscreate(req, res) {

        const body = req.body;
        console.log(body)
        Questions.create({ data: body.questions}).then((result) => {
            body.questions = result.id;
            console.log(":::question:>>>>"+body.questions)
            console.log("::result.id::>>>>"+result.id)
            return Promise.all([result.id,Videosmodel.create(body)]);
        }).then((result) => {
            console.log("::resultnew.id::>>>>"+result)
            result[1].questions.add(result[0]);
            result[1].save().then(()=>{
              res.json('the file has been succesfully saved')
            });
            console.log("::resultnew[1].id::>>>>"+JSON.stringify(result,null,2))
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
        const questions = req.body.questions;
        const answer = req.body.answer;
        const language = req.body.language;
        const subquestionsflow = req.body.subquestionsflow;
        
        Videosmodel.findOne(id).then((result) => { 
            const sd = Questions.create({"questions":questions,"answer":answer,"subquestionsflow":subquestionsflow,"language":language});
            return Promise.all([sd,result]);
        }).then((result) => { 
            result[1].questions.add(result[0].id);
            result[1].save().then(()=>{});
            //this is to log out if the model is valid and not null
            console.log(JSON.stringify(result,null,2))
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
            sails.log(`The question(s) named ${username} have now been deleted, if there were any.`);
            return res.ok();
        });
    },
    Allvideos(req, res) {
        const body = req.body;
        Videosmodel.find(body).populate('questions').then((videos) => {
           // sails.log(videos)
            // console.log(sails.hooks.http.app);    
            return res.json(videos);
        })
    },
    //this find all intermediate videos
    Allintermediate(req, res) {
        const body = req.body;
        Videosmodel.find({level:"intermediate",language:"English"}).populate('questions').then((videos) => {   
            return res.json(videos);
        })
    },

    Allquestionmodel(req, res) {
        const body = req.body;
        Questions.find(body).populate('subquestions').then((videos) => {
           // sails.log(videos)
            // console.log(sails.hooks.http.app);    
            return res.json(videos);
        })
    },

    findintermediate(req, res) {
        // const category = req.body.category;
        //this is to find all the questions in the intermediate level 
        Questions.find({ exercisesflow: 'intermediate' }).exec(function (err, result) {
            if (err) {
                return res.serverError(err);
            }
            return res.json(result);
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

