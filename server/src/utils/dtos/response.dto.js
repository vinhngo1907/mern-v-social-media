class responseDTO{
    success(message = 'Success', data){
        return {
            status: 200,
            message: message,
            results: data,
        };
    }
    badRequest(message = 'Bad request.'){
        return {
            status: 400,
            message: message,
        };
    }

    unauthorization(message = 'Unauthorized.') {
        return {
            status: 401,
            message: message,
        };
    }

    forbiden(message = "You don't have permission to access") {
        return {
            status: 403,
            message: message,
        };
    }

    urlNotFound(message = 'URL not found.') {
        return {
            status: 404,
            message: message,
        };
    }

    serverError(message = 'Server error') {
        return {
            status: 500,
            message: message,
        };
    }

    responseWithOther(status, message, data) {
        return {
            status: status,
            message: message,
            results: data,
        };
    }
}

module.exports = responseDTO;