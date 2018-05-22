"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
require('rxjs/add/operator/map');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var CONFIG = require('../../config');
var YoutubeService = (function () {
    function YoutubeService(http, _jsonp) {
        this.http = http;
        this._jsonp = _jsonp;
    }
    YoutubeService.prototype.getTrendingVideos = function (country) {
        this.params = new http_1.URLSearchParams();
        this.params.set('part', 'snippet');
        this.params.set('chart', 'mostPopular');
        this.params.set('regionCode', country);
        this.params.set('maxResults', '24');
        this.params.set('key', CONFIG.youtubeApiKey);
        this.options = new http_1.RequestOptions({
            search: this.params
        });
        return this.http.get(CONFIG.youtubeEndPoint, this.options)
            .map(function (res) { return res.json(); })
            .catch(this.throwError);
    };
    YoutubeService.prototype.getVideoDetails = function (videoId) {
        this.params = new http_1.URLSearchParams();
        this.params.set('part', 'statistics');
        this.params.set('id', videoId);
        this.params.set('key', CONFIG.youtubeApiKey);
        this.options = new http_1.RequestOptions({
            search: this.params
        });
        return this.http.get(CONFIG.youtubeEndPoint, this.options)
            .map(function (res) { return res.json(); })
            .catch(this.throwError);
    };
    YoutubeService.prototype.getTW = function () {
        var header = new http_1.Headers();
        header.append("Authorization", "OAuth oauth_consumer_key='0bkCb5SHZS45Hw34j0COlGJMJ',oauth_token='267615872-IEvDvezamGs2WJUdYZulRVfcNN4vxfkPkBuaoOXc',oauth_signature_method='HMAC-SHA256',oauth_timestamp='1487667635',oauth_nonce='5vG5kL',oauth_version='1.0',oauth_signature='BjtNV8HAbchOV4EhlfGa5wwg2wQnxnc3Tx6xSxa6k5o%3D'");
        return this.http.get('https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi', { headers: header })
            .map(function (res) { return res.json(); })
            .catch(this.throwError);
    };
    YoutubeService.prototype.throwError = function (error) {
        return Observable_1.Observable.throw(error.status);
    };
    YoutubeService = __decorate([
        core_1.Injectable()
    ], YoutubeService);
    return YoutubeService;
}());
exports.YoutubeService = YoutubeService;
