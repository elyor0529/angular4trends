"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var moment = require('moment');
var YoutubeComponent = (function () {
    function YoutubeComponent(youtubeService, sanitizer, appContext) {
        this.youtubeService = youtubeService;
        this.sanitizer = sanitizer;
        this.appContext = appContext;
        this.trendingVideos = [];
    }
    YoutubeComponent.prototype.loadVideo = function () {
        console.log('AAA');
        this.videoLoader = false;
    };
    YoutubeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.modal.backdrop = false;
        this.loadVideos('');
        this.appContext.countryChanged.subscribe(function (lang) {
            _this.country = _this.appContext.getCountry();
            _this.loadVideos(_this.country);
        });
    };
    YoutubeComponent.prototype.loadVideos = function (countryCode) {
        var _this = this;
        this.loader = true;
        this.youtubeService.getTrendingVideos(this.country).subscribe(function (result) {
            for (var i = 0; i < result.items.length; i++) {
                _this.trendingVideos[i] = {
                    id: result.items[i].id,
                    title: result.items[i].snippet.title,
                    thumbnail: result.items[i].snippet.thumbnails.high.url,
                    publishedAt: moment(result.items[i].snippet.publishedAt).fromNow()
                };
                _this.getVideoStats(i, result.items[i].id);
            }
            _this.loader = false;
        });
    };
    YoutubeComponent.prototype.getVideoStats = function (videoIndex, videoId) {
        var _this = this;
        this.youtubeService.getVideoDetails(videoId).subscribe(function (result) {
            _this.trendingVideos[videoIndex].viewCount = result.items[0].statistics.viewCount;
            _this.trendingVideos[videoIndex].likeCount = result.items[0].statistics.likeCount;
        });
    };
    YoutubeComponent.prototype.openVideoPlayer = function (videoId) {
        this.videoLoader = true;
        this.videoId = videoId;
        this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + videoId + '?autoplay=1');
        this.modal.open();
    };
    YoutubeComponent.prototype.modalDismiss = function () {
        this.embedUrl = null;
    };
    YoutubeComponent.prototype.modalClose = function () {
        console.log('VIDEO PLAYER CLOSED !!');
        this.modal.close();
        this.embedUrl = null;
    };
    __decorate([
        core_1.ViewChild('modal')
    ], YoutubeComponent.prototype, "modal", void 0);
    YoutubeComponent = __decorate([
        core_1.Component({
            selector: 'youtube',
            templateUrl: './youtube.component.html',
            styleUrls: ['./youtube.component.css'],
        })
    ], YoutubeComponent);
    return YoutubeComponent;
}());
exports.YoutubeComponent = YoutubeComponent;
