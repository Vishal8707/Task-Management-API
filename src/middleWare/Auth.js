const jwt = require("jsonwebtoken")
const taskModel = require("../Models/taskModel")

const authentication = async function (req, res, next) {
    try {
        let token = req.Header["x-api-key"]
        if (!token) return res.status(401).send({ status: false, msg: "Token must be filled" })
        const decodedToken = jwt.verify(token, "very-very-secret-key")
        if (!decodedToken) return res.status(400).send({ status: false, msg: "Token Not Verified Please Enter Valid Token" })
        req.decodedToken = decodedToken
        next()
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.msg })
    }
}

const authorization = async function(req, res, next){
    try{
        const userLoggedIn = req.decodedToken.userId
        const taskId = req.params.taskId
        const checkTaskId = await taskModel.findById(taskId)
        if(!checkTaskId) return res.status(400).send({status:false, msg: "Task not found"})
        if(checkTaskId.userId != userLoggedIn) return res.status(402).send({status:false, msg: "LoggedIn users are not allowed to modify the changes."})
        next()
    }
    catch(err){
        res.status(402).send({status:false, msg:err.msg})
    }
}

module.exports = {authentication, authorization}