class ApiError extends Error{
    constructor(
        statuscode,
        message="something went wrong",
        error=[],
        statck = ""
    ){
        super(message)
        thiss.statuscode=statuscode
        this.data = null
        this.message = message
        this.error= error

        if (statck){
            this.stack= statck

        }else{
            error.captureStackTrace(this,this.constructor)
        }
    }
}
export {ApiError}