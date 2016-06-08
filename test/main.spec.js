/**
 * Created by rob on 6/7/16.
 */

require('chai').should();

describe ("meteor-settings-from-env", function(){
    

    it('pulls out the configs with the default prefix', function(){
        var toTest = require( '../lib/main')();
        var res = toTest._extractKeys({"METEOR.one":"one", two:'two', "METEOR.three":'three'}, {});
        res.should.deep.equal({"one":"one", "three":'three'});
    });

    it('pulls out the configs with a different prefix', function(){
        var toTest = require( '../lib/main')('FOO.');
        var res = toTest._extractKeys({"FOO.one":"one", two:'two', "METEOR.three":'three'}, {});
        res.should.deep.equal({"one":"one"});
    });


    it("merges all the keys starting with 'public' ", function(){
        var toTest = require( '../lib/main')();
        var res = toTest._remapPublicKeys({"one":"one", two:'two', "public.three":'three'});
        res.should.deep.equal({"one":"one", two:'two', "public" :{three:'three'}});
    });

    it("handles the edge case of all public 'public' ", function(){
        var toTest = require( '../lib/main')();
        var res = toTest._remapPublicKeys({"public.one":"one", "public.two":'two', "public.three":'three'});
        res.should.deep.equal({"public" :{"one":"one", two:'two',three:'three'}});
    });

    it("does the full job", function(){
        var toTest = require( '../lib/main')();
        process.env["METEOR.one"] = "test";
        var settings = {one:'hey'};
        var res = toTest.do(settings);
        res.should.deep.equal({"one":"test"});
    });

    it("does the full job with public variables", function(){
        var toTest = require( '../lib/main')();
        process.env["METEOR.public.one"] = "test";
        var settings = {one:'hey'};
        var res = toTest.do(settings);
        res.should.deep.equal({ one: 'test', public: { one: 'test' } });
    });



});