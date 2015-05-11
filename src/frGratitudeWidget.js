// FreshRealm Instagram Gratitude Widget Module
(function() {
    'use strict';

    angular
        .module('freshrealm.instagramGratitudeWidget', [
            'ui.bootstrap'
        ])
        .provider('frInstagramGratitudeFeed', FrInstagramGratitudeFeedProvider)
        .provider('frGratitudeWidgetUrlPrefixes', FrGratitudeWidgetUrlPrefixesProvider)
        .directive('frGratitudeWidget', frGratitudeWidget)
        .controller('FrGratitudeWidgetModalCtrl', FrGratitudeWidgetModalCtrl);


    function FrInstagramGratitudeFeedProvider () {
        var instagramClientId = false;
        var instagramPostLimit = 30;

        this.instagramClientId = function (clientId) {
            instagramClientId = clientId;
        };

        this.instagramPostLimit = function (postLimit) {
            instagramPostLimit = postLimit;
        };

        this.$get = function frInstagramGratitudeFeedFactory ($http, $q) {
            return new FrInstagramGratitudeFeed(instagramClientId, instagramPostLimit, $http, $q);
        };
    }

    function FrGratitudeWidgetUrlPrefixesProvider() {
        var templateUrlPrefix = '/templates/frGratitudeWidget';

        this.setTemplateUrlPrefix = function(value) {
            if (!!value) {
                templateUrlPrefix = value;
            }
        };

        var imageUrlPrefix = '/images/frGratitudeWidget';

        this.setImageUrlPrefix = function(value) {
            if (!!value) {
                imageUrlPrefix = value;
            }
        };

        this.$get = function frGratitudeWidgetUrlPrefixesFactory() {
            return {
                templateUrlPrefix: templateUrlPrefix,
                imageUrlPrefix: imageUrlPrefix
            };
        };
    }

    var scrollEventBound = false;
    /* @ngInject */
    function frGratitudeWidget (frGratitudeWidgetUrlPrefixes) {
        // Runs during compile

        var directive = {
            scope: {},
            restrict: 'E',
            templateUrl: frGratitudeWidgetUrlPrefixes.templateUrlPrefix + '/widget.html',
            controller: GWController,
            link: link
        };
        return directive;

        function link () {
            if (iOSGreaterThan7()) {
                $("body").on("mouseover", ".gratitude-widget", bindScrollEvent);
                $("body").on("touchstart", ".gratitude-widget", bindScrollEvent);
            }


            function bindScrollEvent () {
                if (!scrollEventBound) {
                    scrollEventBound = true;
                    $('.gratitude-widget').scroll(function () {
                        $('#gw-title-fixed-to-top-container').toggleClass('hidden', ($(window).scrollTop() + 15) <= $('#gw-title').offset().top);
                        $('#gw-striplet-fixed-to-top').toggleClass('hidden', ($(window).scrollTop() + 61) <= $('#gw-header-striplet').offset().top);
                    });
                }
            }

            function iOSGreaterThan7 () {
                if (/iP(hone|od|ad)/.test(navigator.platform)) {
                    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
                    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
                    var versionPieces = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
                    return versionPieces[0] > 7;
                }
                return true;
            }
        }
    }

    /* @ngInject */
    function GWController ($timeout, $scope, $modal, frInstagramGratitudeFeed, frGratitudeWidgetUrlPrefixes) {
        $scope.imageUrlPrefix = frGratitudeWidgetUrlPrefixes.imageUrlPrefix;
        
        // Pre-fetch posts
        frInstagramGratitudeFeed.getPosts();

        $scope.openModal = openModal;

        function openModal () {

            var modalInstance = $modal.open({
                templateUrl: frGratitudeWidgetUrlPrefixes.templateUrlPrefix + '/modal.html',
                controller: 'FrGratitudeWidgetModalCtrl',
                windowClass: 'gratitude-widget',
                resolve: {
                    posts: function () {
                        return frInstagramGratitudeFeed.getPosts();
                    }
                }
            });

            modalInstance.result.then(resultHandler, resultHandler);


            function resultHandler () {
                $timeout(function () {
                    $('#gw-title-fixed-to-top-container').addClass('hidden');
                    $('#gw-title-fixed-to-top-container').addClass('hidden');
                    $('#gw-striplet-fixed-to-top').addClass('hidden');
                    scrollEventBound = false;
                });
            }
        }
    }

    /* @ngInject */
    function FrGratitudeWidgetModalCtrl ($scope, posts, frGratitudeWidgetUrlPrefixes) {
        $scope.imageUrlPrefix = frGratitudeWidgetUrlPrefixes.imageUrlPrefix;
        $scope.posts = (!!posts.data) ? posts.data : [];
    }

    // Instagram Gratitude Feed Class
    /* @ngInject */
    function FrInstagramGratitudeFeed (clientId, postLimit, $http, $q) {
        this.clientId = clientId;
        this.postLimit = postLimit;
        this.$http = $http;
        this.$q = $q;
        this.posts = [];
        this.deferred = null;
    }

    FrInstagramGratitudeFeed.prototype.getPosts = function () {
        var self = this;

        // Already have posts, just return those
        if (!!self.posts.data && self.posts.data.length > 0) {
            return self.posts;
        }

        // Already pulling data, return promise
        if (!!self.deferred) {
            return self.deferred.promise;
        }

        // Start new promise
        self.deferred = self.$q.defer();

        // Pull posts from Instagram API
        self.$http.jsonp('https://api.instagram.com/v1/tags/connectedbygratitude/media/recent', {
            params: {
                client_id: self.clientId,
                count: self.postLimit,
                callback: 'JSON_CALLBACK'
            }
        }).success(function(data, status, headers, config) {
            // Save posts and resolve deferred promise
            self.posts = data;
            self.deferred.resolve(data);
        }).error(function(data, status, headers, config) {
            // Error, reject deferred promise
            self.deferred.reject(data);
        });

        // Return promise
        return self.deferred.promise;
    };
})();

// TypeKit loading
(function(d) {
    var config = {
        kitId: 'mzn7hfo',
        scriptTimeout: 3000
    },
    h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='//use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
})(document);
