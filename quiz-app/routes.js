const express = require("express");
const router = express.Router();
const QuizCtrl = require("./quiz-ctrl");




router.get('/category', QuizCtrl.category)

router.get('/myproblems', QuizCtrl.myproblems)

router.post('/createproblem', QuizCtrl.createproblem)

router.post("/login", QuizCtrl.login)

router.post("/register", QuizCtrl.register);

router.post("/addproblem", QuizCtrl.addproblem);

router.post("/search", QuizCtrl.search)

module.exports = router;