FreshRealm Instagram Gratitude Widget
=====================================

The FreshRealm Instagram Gratitude Widget is an [Angular.js](https://angularjs.org) module that allows for easy inclusion of the #connectedbygratitude Instagram tag feed on your website. This project includes a sample demo application that includes the FreshRealm Instagram Gratitude Widget module.


## Angular.js Module Usage
If your webiste includes an Angular.js application already complete the following steps:

* Include the module javascript file in your application's html source:

```html
<script type="text/javascript" src="PATH_TO_BOWER_COMPONENTS/fr-instagram-gratitude-widget/dist/js/app/fr-instagram-gratitude-widget-module.min.js"></script>
```

* In your Angular.js application's module definition add `freshrealm.instagramGratitudeWidget` to the list of dependancies
* In your application's config method use the following (see the `/src/app.js` file for an example):
    * `frInstagramGratitudeFeedProvider` provider to configure the Instagram Client ID and Instagram Post Limit (using `frInstagramGratitudeFeedProvider.instagramClientId` and `frInstagramGratitudeFeedProvider.instagramPostLimit` attributes respectively)
    * `frGratitudeWidgetUrlPrefixesProvider` provider to config the Template and Image URL Prefixes (using the `frGratitudeWidgetUrlPrefixesProvider.setTemplateUrlPrefix` and `frGratitudeWidgetUrlPrefixesProvider.setImageUrlPrefix` methods)
* Use `<fr-gratitude-widget></fr-gratitude-widget>` in your html to add the Gratitude button.

## Angular.js App Usage
If your website does not include an Angular.js application, you can still use the FreshRealm Instagram Gratitude Widget. To do so you will need to include some additional javascript libraries in your application's html source as well as a small snippet of javascript code. For a full example of how to do this see the `/demo/index.html` file. Below is a summary of the required steps

* Obtain an Instagram API Client ID.
* Copy the `/templates/` and `/images/` files into your public webroot.
* Copy the `/dist/js/app/` and `/dist/css/` files into your public webroot.
* Include the Bootstrap and FreshRealm Gratitude Widget CSS files within your HTML `<head></head>` tag.
*  At the bottom of your HTML `<body></body>` tag include the following javascript snippet.
    
```html
    <script type="text/javascript">
        // Your Instagram Client ID
        window.frInstagramClientId = 'YOUR INSTAGRAM API CLIENT ID GOES HERE';
        // Paths to where you coppied /templates/ and /images/ files
        window.frGWTemplateUrlPrefix = '/templates';
        window.frGWImageUrlPrefix = '/images';
    </script>
```

* Include the jQuery, Angular.js, and Angular UI Bootstrap javascript library files if they are not already included in your html source.
* Include the FreshRealm Instagram Gratitude Widget App javscript file after the javascript libraries and the javascript configuration snippet.
* Add the following HTML snippet where you want the Gratitude Widget button to appear.

```html
    <div ng-app="frGWApp">
        <!-- Insert the gratitude widget -->
        <fr-gratitude-widget></fr-gratitude-widget>
    </div>
```

## Demo Page Usage
To view the Demo page you must:

* Add your Instagram API Client ID to the configuration options javascript snippet within the `/demo/index.html` file.
* Make sure that [Bower](http://bower.io/#install-bower) and [Grunt](http://gruntjs.com/getting-started) are installed on your machine.
* Run `grunt serve` within the project directory.
* Once the bulid process has completed a message like `Started connect web server on http://localhost:8000` will be displayed.
* Browse to the url provided with `/demo/` added at the end (e.g. `http://localhost:8000/demo/`).