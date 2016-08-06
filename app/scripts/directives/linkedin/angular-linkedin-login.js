angular.module('skillsMatrixApp').directive('linkedinLogin',
        ['$rootScope', '$interval',
            function ($rootScope, $interval) {
                return {
                    restrict: 'AE',
                    replace: true,
                    templateUrl: '/scripts/directives/linkedin/angular-linkedin-login-ptl.html',
                    scope: true,
                    compile: function (tElem, tAttrs) {

                        var linkedinLibLoaded = false,
                            linkedinLibInitialized = false;

                        window.linkedinLibInit = function(){
                            linkedinLibInitialized = true;
                        };

                        if(!linkedinLibLoaded){

                            linkedinLibLoaded = true;

                            $.getScript("//platform.linkedin.com/in.js?async=true", function success() {
                                IN.init({
                                    onLoad: "linkedinLibInit",
                                    api_key: '785wll2nk326pp',
                                    credentials_cookie: true
                                });
                            });

                        }

                        return function (scope, elem, attrs) {

                            scope._buttonText = tAttrs.linkedinButtonText || 'Connect';
                            var _authorizedHandlerName = tAttrs.linkedinAuthorized || null;
                            var _authorizedHandler = _authorizedHandlerName ? scopescope[_authorizedHandlerName] : null;
                            var _profileDataHandlerName = tAttrs.linkedinProfileData || null;
                            var _profileDataHandler = _profileDataHandlerName ? scope[_profileDataHandlerName] : null;
                            var _successMsg = tAttrs.linkedinSuccessMsg || 'Linkedin Connection Authorized';
                            var ua = navigator.userAgent || 'unknown';

                            if(!_authorizedHandler && !_profileDataHandler){
                                throw "You must provide a 'linkedin-authorize' or 'linkedin-profile-data' on the scope.";
                            }


                            scope.linkedinMsg = scope.linkedinMsg || {};
                            scope.linkedinMsg.loaded = false;
                            scope.linkedinMsg.showButton = true;
                            scope.linkedinMsg.message = tAttrs.linkedinMsg || null;
                            scope.linkedinMsg.loading = false;
                            scope.linkedinMsg.errorMsg = null;
                            scope.linkedinMsg.successMsg = null;

                            scope.onLinkedinAuthClick = function($ev){
                                authorizeLinkedin();
                            };

                            var authorizeLinkedin = function(){
                                scope.linkedinMsg.loading = true;
                                if(IN.User.isAuthorized()){
                                    linkedinAuthorized();
                                }else{
                                    IN.User.authorize(linkedinAuthorized);
                                }
                            };

                            var linkedinAuthorized = function(){
                                if(_profileDataHandler && typeof _profileDataHandler === 'function'){
                                    IN.API.Profile("me")
                                        .fields('id','first-name','last-name','location','industry','headline','picture-urls::(original)','email-address', 'positions', 'three-past-positions', 'skills')
                                        .result(function(data){
                                            linkedinDataTransform(data);
                                            console.log(data)
                                        })
                                        .error(function(err){
                                            console.log(err)
                                            scope.linkedinMsg.loading = false;
                                            scope.linkedinMsg.errorMsg = 'Unable to get LinkedIn profile information.  Please re-authorize.';

                                        });
                                }else{
                                    scope.linkedinMsg.loading = false;
                                    scope.linkedinMsg.successMsg = _successMsg;
                                }
                                if(_authorizedHandlerName && typeof scope[_authorizedHandlerName] === 'function')
                                    scope.$apply(scope[_authorizedHandlerName]({auth:true}));
                            };

                            var linkedinDataTransform = function(linData){
                                var linUser = ( (linData && linData.values) ? linData.values[0] : null );
                                if(linUser){
                                    scope.linkedinMsg.showButton = false;
                                    scope.linkedinMsg.successMsg = _successMsg;
                                    var data = {
                                        user_email: linUser.emailAddress,
                                        first_name: linUser.firstName,
                                        last_name: linUser.lastName,
                                        industry: linUser.industry,
                                        headline: linUser.headline,
                                        linkedin_id: linUser.id,
                                        location: (linUser.location ? linUser.location.name : ''),
                                        country_code: (linUser.location ? linUser.location.country.code : ''),
                                        headline: linUser.headline,
                                        thumb_url: ((linUser.pictureUrls && linUser.pictureUrls._total > 0) ? linUser.pictureUrls.values[0] : ''),
                                        positions: linUser.positions
                                    };
                                    if(_profileDataHandlerName && typeof scope[_profileDataHandlerName] === 'function'){
                                        scope.$apply(scope[_profileDataHandlerName](data))
                                    }
                                }else{
                                    scope.linkedinMsg.loading = false;
                                    scope.linkedinMsg.successMsg = 'Unable to get LinkedIn profile information.  Please re-authorize.';
                                }
                            };

                        };
                    }
                }
            }
        ]);
