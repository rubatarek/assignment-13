import { env } from "../../../config/env.service.js"


export const ErrorResponse = ({
    //default values 3shan law mtb3tsh
    status=400,
    message="Something went wrong",
    extra=undefined
} = {}) => { // ==obj fady 3shan mydesh error law haga mtb3tsh double check keda


throw new Error(message, { cause:{status, extra}})
//throw ba2ol ll js ba3tlk error 
//ely hyshofo howa global handler bt catch w tbt3to ll frontend 

}


export const BadRequestException =({message="Bad Request",extra=undefined}={}) => {
// msh hazwd el status 3shan haeml return ll error response
//fun ely already bt5od hagat de 
return ErrorResponse({status:400, message: message, extra: extra})

}
export const NotFoundException =({message="Not found error",extra=undefined}={}) => {
return ErrorResponse({status:404, message, extra})

}
export const ConflictException =({message="Conflict error",extra=undefined}={}) => {
return ErrorResponse({status:409, message, extra})

}
export const UnauthorizedException =({message="Unauthorized error",extra=undefined}={}) => {
return ErrorResponse({status:401, message, extra})

}
export const ForbiddenException =({message="Forbidden error",extra=undefined}={}) => {
return ErrorResponse({status:403,  message, extra})  

}

export const globalHandlingError = (err, req, res, next) => {

    console.log(err.stack,"from error stack");
    const mood= env.mood=="dev"
    console.log(mood)
    const status=err.status ?err.status : err.cause? err.cause.status : 500
    const defaultMessage= "Something went wrong"
    const displayErrorMessage=err.message || defaultMessage
// console.log(err.cause,"from test status");
res.status(status).json({
    stack: mood? err.stack : null
    ,message: mood? displayErrorMessage : defaultMessage,
    extra:mood? err.cause?.extra : null
});


}




