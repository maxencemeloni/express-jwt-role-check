exports.checker = (params) => {
    let self = this;
    let paramsDefault = {
        key: null, // JWT key
        roleColumnName: null, // object key of lvl (ex: jwtPayload.role_id)
        roleAsc: true // ASC higher role (admin) is the lowest (ex: admin: 1, visitor: 5)
    }
    this._params = {...paramsDefault, params};

    return {
        init: (req, res, next) =>{
            if (req === null) {
                throw new Error('Houston we got a pwoblem !');
            }

            if (self._params.key === null || self._params.roleColumnName === null) {
                throw new Error('JWT CHECK : params key and roleColumnName must be set')
            }

            req['jwt-check'] = self._params;
            next();
        },
    };
}
