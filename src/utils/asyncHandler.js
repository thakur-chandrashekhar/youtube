const async =(requestHandler) =>{
    (req,res,next) =>{
        promise.resolve(requestHandler).catch((err)=> next(err))
    }
}

export {asyncHandler}