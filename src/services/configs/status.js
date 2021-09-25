const isErrorExpected = (error) => {
    return (
        error.response &&
        error.response.status >= 400 && // >= 400
        error.response.status < 500
    );
};

module.exports = {
    Successful: 200,
    CreatedSuccessfully: 201,
    BadRequest: 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    NotAcceptable: 406,
    Conflict: 409,
    UnprocessableEntity: 422,
    InternalServerError: 500,
    isErrorExpected,
};
