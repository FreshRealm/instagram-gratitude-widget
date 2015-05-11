(function() {
    'use strict';

    angular
        .module('frGWApp', [
            'freshrealm.instagramGratitudeWidget'
        ])
        .constant('frInstagramClientId', window.frInstagramClientId)
        .constant('frGWTemplateUrlPrefix', window.frGWTemplateUrlPrefix)
        .constant('frGWImageUrlPrefix', window.frGWImageUrlPrefix)
        .config(config);

    /* @ngInject */
    function config (frInstagramGratitudeFeedProvider, frGratitudeWidgetUrlPrefixesProvider, frInstagramClientId, frGWTemplateUrlPrefix, frGWImageUrlPrefix) {
        frInstagramGratitudeFeedProvider.instagramClientId(frInstagramClientId);
        frInstagramGratitudeFeedProvider.instagramPostLimit(10);

        frGratitudeWidgetUrlPrefixesProvider.setTemplateUrlPrefix(frGWTemplateUrlPrefix);
        frGratitudeWidgetUrlPrefixesProvider.setImageUrlPrefix(frGWImageUrlPrefix);
    }
})();