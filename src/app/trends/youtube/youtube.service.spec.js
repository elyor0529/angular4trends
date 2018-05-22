/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require('@angular/core/testing');
var youtube_service_1 = require('./youtube.service');
describe('YoutubeService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [youtube_service_1.YoutubeService]
        });
    });
    it('should ...', testing_1.inject([youtube_service_1.YoutubeService], function (service) {
        expect(service).toBeTruthy();
    }));
});
