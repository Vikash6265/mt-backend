const expressAsyncHandler = require("express-async-handler");
const Crud = require("../models/crudModel");

const getCrud = expressAsyncHandler(async (req,res)=>{

    const cruds = await Crud.find();

    if(!cruds)
    {
        res.status(401)
        throw new Error("No Data Found!")
    }

    res.status(200).json(cruds)

})

// get single

const getSingleCrud = expressAsyncHandler(async (req,res)=>{

    const crud = await Crud.findById(req.params.id);   // req.params.id esliye kyuki udhar hmne id de rahkhi he
    if(!crud){
        res.status(404)
        throw new Error('Data Not Found')
    }

    res.json(crud).status(200);
});


const addCrud = expressAsyncHandler(async (req,res)=>{

    const {title} = req.body;
    if(!title)
    {
        res.status(401)
        throw new Error("Please Fill All Detail !")
    }

    const add = await Crud.create({
        title,
    })

    res.status(201).json(add);

}) 


const removeCrud = expressAsyncHandler(async (req,res)=>{

    await Crud.findByIdAndDelete(req.params.id);
    res.json({success : true});
    
})

const updateCrud = expressAsyncHandler(async(req,res)=>{

    const update = await Crud.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
    })

    if(!update)
    {
        res.status(400)
        throw new Error("Data Not Updated !")
    }

    res.status(200).json(update);

})


module.exports = {getCrud,addCrud,removeCrud,updateCrud,getSingleCrud};