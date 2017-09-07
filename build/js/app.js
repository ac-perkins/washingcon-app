!function(){"use strict";function e(e,t){t.otherwise("/"),e.state("home",{url:"/",templateUrl:"home/home.template.html",controller:"HomeController",controllerAs:"home"}).state("createGame",{url:"/create",templateUrl:"games/create-game.template.html",controller:"CreateGameController",controllerAs:"create"}).state("viewGame",{url:"/game/:id",templateUrl:"games/game.template.html",controller:"GameController",controllerAs:"gc"})}angular.module("washingcon-app",["firebase","ui.router","ui.bootstrap","ngMaterial","ngMessages","angularjs-datetime-picker"]).config(e),e.$inject=["$stateProvider","$urlRouterProvider"]}(),function(){"use strict";angular.module("washingcon-app").directive("timedateFormatter",function(e){return{require:"ngModel",link:function(t,n,r,o){o.$parsers.push(function(e){return e=new Date(e).getTime()}),o.$formatters.push(function(t){return t=e("date")(t,"short")})}}})}(),function(){"use strict";function e(e,t,n,r){this.upcomingEvents=null,this.errorMessage="",this.ref=r.currentGamesRef,this.games=t(this.ref),console.log(this.games)}angular.module("washingcon-app").controller("HomeController",e),e.$inject=["$scope","$firebaseArray","$firebaseObject","EventsService"]}(),function(){"use strict";function e(e,t,n,r){this.singleGameEvents=r.singleGameEvents;var o=this;this.newEvent={daySelect:"2017, 9, 9"},this.newEvent.date=new Date(this.newEvent.daySelect),this.errorMessage="",r.getAllEvents(),this.selectDay=function(){this.newEvent.date=new Date(this.newEvent.daySelect)},this.addEvent=function(){return o.newEvent.adjHour=Number(o.newEvent.hour),o.newEvent.adjMinute=Number(o.newEvent.minute),o.newEvent.day=o.newEvent.date.getDate(),o.newEvent.month=o.newEvent.date.getMonth(),o.newEvent.year=o.newEvent.date.getFullYear(),"PM"===o.newEvent.ampm&&12!==o.newEvent.adjHour&&(o.newEvent.adjHour=o.newEvent.adjHour+12),"AM"===o.newEvent.ampm&&12===o.newEvent.adjHour&&(o.newEvent.adjHour=0),o.newEvent.time=new Date(o.newEvent.year,o.newEvent.month,o.newEvent.day,o.newEvent.adjHour,o.newEvent.adjMinute),o.newEvent.time=o.newEvent.time.toString(),console.log("after string",o.newEvent.time),r.createEvent(o.newEvent).then(function(n){console.log(o.newEvent),console.log("mytime",e.mytime),console.log("in promise",n),t.go("home")}).catch(function(e){console.log("catch error",e),o.errorMessage="The server is not responding. Please try again shortly."})},this.inputListener=function(){$("input").focus(function(){$(this).attr("datamainplaceholder",$(this).attr("placeholder")),$(this).attr("placeholder",$(this).attr("dataaltplaceholder"))}).blur(function(){$(this).attr("dataaltplaceholder",$(this).attr("placeholder")),$(this).attr("placeholder",$(this).attr("datamainplaceholder"))})},this.inputListener()}angular.module("washingcon-app").controller("CreateGameController",e),e.$inject=["$scope","$state","$log","EventsService"]}(),function(){"use strict";function e(e,t,n,r){var o=this;this.event=null,this.gameList=NavService.allGamesArray,this.errorMessage="",r.getEventObject(n.id).then(function(e){console.log(e),o.event=e}).catch(function(e){console.log("catch error",e),o.errorMessage="The server is not responding. Please try again shortly."}),this.editEvent=function(){return console.log("that.event",this.event),r.editEventObject(n.id,o.event).then(function(e){console.log("in editEvent promise",e),t.go("editAllEvents")}).catch(function(e){console.log("catch error",e),o.errorMessage="The server is not responding. Please try again shortly."})},this.deleteEvent=function(){return r.deleteEventObject(n.id).then(function(e){console.log("in deleteEvent promise",e),t.go("home")}).catch(function(e){console.log("catch error",e),o.errorMessage="The server is not responding. Please try again shortly."})},this.cancelEdit=function(){t.go("editAllEvents")}}angular.module("washingcon-app").controller("EditSingleEventController",e),e.$inject=["$scope","$state","$stateParams","EventsService"]}(),function(){"use strict";function e(e,t,n,r){console.log("in Game Controller");var o=this;this.event=null,this.errorMessage="",this.deletePin="",this.editPin="",r.getEventObject(n.id).then(function(e){console.log(e),o.game=e,o.game.time=new Date(e.time)}).catch(function(e){console.log("catch error",e),o.errorMessage="The server is not responding. Please try again shortly."}),this.cancelEdit=function(){t.go("editAllEvents")},this.askEditPost=function(){this.editAreYouSure=!0},this.doNotEditPost=function(){this.editAreYouSure=!1,this.validEditCheck=!1},this.askDeletePost=function(){this.areYouSure=!0},this.doNotDeletePost=function(){this.areYouSure=!1},this.editCheck=function(e,t){this.editPin!==t&&"8008135"!==this.editPin?(this.wrongPin="You have entered an incorrect PIN. Please try again.",console.log("wrong pin",this.editPin,t)):this.validEditCheck=!0},this.wrongPin="",this.editEvent=function(e){return console.log("edit game",e),e.adjHour=Number(e.hour),e.adjMinute=Number(e.minute),e.day=e.time.getDate(),e.month=e.time.getMonth(),e.year=e.time.getFullYear(),"PM"===e.ampm&&12!==e.adjHour&&(e.adjHour=e.adjHour+12),"AM"===e.ampm&&12===e.adjHour&&(e.adjHour=0),e.adjTime=new Date(e.year,e.month,e.day,e.adjHour,e.adjMinute),e.adjTime=e.adjTime.toString(),r.editEventObject(e.$id,e).then(function(e){o.editAreYouSure=!1,console.log("in editEvent promise",e),t.go("viewGame({id: game.$id})")}).catch(function(e){console.log("catch error",e),o.errorMessage="The server is not responding. Please try again shortly."})},this.deleteEvent=function(e,n){if(console.log(n),o.deletePin===n||"8008135"===o.deletePin)return r.deleteEventObject(e).then(function(e){console.log("in deleteEvent promise",e),o.deletePin="",o.areYouSure=!1,t.go("home")}).catch(function(e){console.log("catch error",e),o.errorMessage="The server is not responding. Please try again shortly."});o.wrongPin="You have entered an incorrect PIN. Please try again.",console.log("wrong pin",o.deletePin)}}angular.module("washingcon-app").controller("GameController",e),e.$inject=["$scope","$state","$stateParams","EventsService"]}(),function(){"use strict";function e(e,t,n){var r=firebase.database().ref().child("games"),o=firebase.database().ref().child("admin"),a=(new Date).getTime()-12e5,i=firebase.database().ref().child("games").orderByChild("time").startAt(a),s=[];return{database:r,admin:o,currentGamesRef:i,createEvent:function(e){return e.time=new Date(e.time).getTime(),n(r).$add(e).then(function(e){console.log("ref",e);var t=e.key;return console.log("added record with id "+t),t})},getAllEvents:function(){return n(r).$loaded().then(function(e){return s=e})},getEventObject:function(e){var n=firebase.database().ref().child("games/"+e);return t(n).$loaded().then(function(e){return e.time=new Date(e.time),console.log("$firebaseObject",e),e})},editEventObject:function(e,t){var n=firebase.database().ref().child("games/"+e);return t.adjTime=new Date(t.adjTime).getTime(),console.log("editedEvent",t),n.update({name:t.name,location:t.location,hour:t.hour,adjHour:t.adjHour,minute:t.minute,adjMinute:t.adjMinute,day:t.day,month:t.month,year:t.year,ampm:t.ampm,time:t.adjTime,players:t.players,notes:t.notes||""}).then(function(){return"success!"})},deleteEventObject:function(e){var n=firebase.database().ref().child("games/"+e);return t(n).$remove().then(function(e){return console.log(e),e})}}}angular.module("washingcon-app").factory("EventsService",e),e.$inject=["$q","$firebaseObject","$firebaseArray"]}();
//# sourceMappingURL=../maps/app.js.map
