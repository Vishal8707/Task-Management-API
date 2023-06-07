const taskModel = require("../Models/taskModel")

const createTask = async function(req, res){
    try{
        let data = req.body;
        let saveData = await taskModel.create(data)
        return req.status(201).send({status:true, msg:"Task has been successfully created.", data:saveData})

    }
    catch(err){
        res.status(500).send({status:false, msg:err.msg})
    }
}
module.exports = {createTask}