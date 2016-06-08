/**
 * Pass in the Meteor settings object which will get decorated from the
 * environment
 * @param prefix  what the environment variable is prefixed by, defults to "METEOR."
 */
module.exports = function (prefix) {

    prefix = prefix || "METEOR.";


    /**
     * Piblic api
     * @param settings  the Meteor settings
     */
    exports.do = function(settings) {
        var res = exports._extractKeys(process.env, settings);
        res = exports._remapPublicKeys(res);

        try {
            __meteor_runtime_config__.PUBLIC_SETTINGS = res.public;
        }
        catch (ReferenceError){
            
            //Swallow if meteor is not accessible

        }

        return res;

    };

    /**
     * Pull out all the special keys from the environment
     * @param _env
     */
    exports._extractKeys = function (_env, settings) {

       return Object.keys(_env).reduce(function (prev, current) {

           if (current.startsWith(prefix))
                prev[current.replace(prefix,'')] = _env[current];

            return prev;
        }, settings);
    }

    /**
     * remaps everyting prefixed with a 'public." prefix to the
     * right place in teh meteor settings
     * 
     * @param _in
     */
    exports._remapPublicKeys = function (_in) {


        return Object.keys(_in).reduce(function (prev, current) {

            var pfx = 'public.';

            if (current.startsWith(pfx)) {
                prev.public =prev.public || {};
                prev.public[current.replace(pfx, '')] = _in[current];
                delete _in[current];
            }

            return prev;
        }, _in);
    }

    return exports;

}