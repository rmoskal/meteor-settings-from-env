/**
 * Created by rob on 6/7/16.
 */
var expect = require('chai').expect;
var  should = require('chai').should();

describe ("meteor-settings-from-env", function(){
    

    it('pulls out the configs with the default prefix', function(){
        var toTest = require( '../lib/main')();
        var res = toTest._extractKeys({"METEOR.one":"one", two:'two', "METEOR.three":'three'});
        res.should.deep.equal({"one":"one", "three":'three'});
    });

    it('pulls out the configs with a different prefix', function(){
        var toTest = require( '../lib/main')('FOO.');
        var res = toTest._extractKeys({"FOO.one":"one", two:'two', "METEOR.three":'three'});
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


});