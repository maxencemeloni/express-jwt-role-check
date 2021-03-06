const jwt = require('jsonwebtoken');
/**
 *
 * @param lvl
 * @returns {{isAllowed: isAllowed}}
 */
function checkLvl(lvl = null) {
    let self = this;
    this._lvl = lvl;

    return {
        /**
         *
         * @param req
         * @param res
         * @param next
         */
        isAllowed: (req = null, res = null, next = null) => {
            if (req === null) {
                throw new Error('Houston we got a pwoblem !');
            }

            if (req['jwt-check'].key === null || req['jwt-check'].roleColumnName === null) {
                throw new Error('JWT CHECK : params key and roleColumnName must be set')
            }

            let token = req.headers?.Authorization.split(' ')[1];
            if (token !== undefined) {
                jwt.verify(token, req['jwt-check'].key, (err, payload) => {
                    if (err) {
                        res.sendStatus(401);
                    } else {
                        if (self._lvl !== null && (payload[req['jwt-check'].roleColumnName] > self._lvl) === req['jwt-check'].roleAsc) {
                            res.sendStatus(403);
                        } else {
                            next();
                        }
                    }
                });
            } else {
                res.sendStatus(401);
            }
        },
    };
}
module.exports.checkLvl = checkLvl;
