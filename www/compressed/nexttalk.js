window.defaultAlert=alert;window.defaultConfirm=confirm;window.confirm=function(e,t,n,r){var i=$("#modal");var s=$("#overlay");var o=new $.Deferred;var u=moduleLoader.loadModule("confirm");u.done(function(e){i.html(e);o.resolve()});o.promise().done(function(){var o,u=0;if(t){var a=t.position();o=a.top;u=a.left;s.height(t.height())}i.find("#content").html(e);s.css("top",o+"px");s.css("left",u+"px");if(r)i.addClass(r);if(n)s.addClass(n);i.find(".confirmWrapper").css("top",i.find(".confirmWrapper").css("top"));var f=i.find("#close");f.height(f.height());f.css("top",f.css("top"));$("body").on("confirmClose",function(){i.hide();s.hide()});f.on(configuartion.events.userselect,function(e){$(this).off(e);$("body").trigger("triggerHistory")});i.show();var u=i.width()-f.height()/2;f.css("left",u);s.show()})};window.alert=function(e,t){var n=$("#modal");var r=$("#overlay");var i=new $.Deferred;var s=moduleLoader.loadModule("alert");s.done(function(e){n.html(e);i.resolve()});i.promise().done(function(){if(t){n.find("#modalTitle").html(t)}n.find("#modalBody").html(e);r.show();n.show(500);$("body").on("modalClose",function(){n.hide();r.hide()});$("#modalClose").on(configuartion.events.userselect,function(e){$(this).off(e);$("body").trigger("triggerHistory")})})};window.notification=function(e){if(e){var t=$("#notification");t.text(e);t.show(250);setTimeout(function(){t.hide(250)},2500)}};var configuartion={events:{userselect:"click"},deviceProps:{getHeight:function(){}},maxRemainderLength:16};var flatUIColors={count:0,colors:["#BF55EC","#F22613","#E87E04","#95A5A6","#1BBC9B","#19B5FE"],getNextColors:function(){return this.colors[this.count++%6]}};var moduleLoader={loadModule:function(e){var t=new $.Deferred;var n=$.ajax({url:"templates/"+e+".html",method:"GET"}).done(function(e){t.resolve(e)}).fail(function(){t.resolve(-1)});return t.promise()}};var header=function(){var e=$("#logo");var t=$("#backbutton");var n=$("#middleColumn");var r=$("#rightColumn");var i=function(){s("Next Time");o("+","getAllContacts");e.on(configuartion.events.userselect,function(){$("body").trigger("triggerHistory")})};var s=function(e){n.html(e)};var o=function(e,t){r.html(e);r.off();if(t){r.on(configuartion.events.userselect,function(){$("body").trigger(t)})}};i();$("body").on("showBackButton",function(){t.css("visibility","visible")});$("body").on("hideBackButton",function(){t.css("visibility","hidden")});$("body").on("headerMiddle",function(e,t){Logger.info("photo ",t);s(t)});$("body").on("headerRight",function(e,t,n){o(t,n)})};$("body").on("headerReady",function(e){header();$(this).off(e)});var techocall=function(){var e=[];var t=0;var n=function(){var e=$(window).width();var n=$(window).height();$(".header > img").height(n*.1);var r=$(".header").outerHeight();t=$(".header").height();$(".logoText").css("line-height",t+"px");var i=$("#workarea");i.outerHeight(n-r)};$("body").on("addToHistory",function(t,n,r){var i={};i.eventName=n;i.eventArgs=r?r:[];e.push(i)});$("body").on("triggerHistory",function(){if(e.length>0){var t=e.pop();$("body").trigger(t.eventName,t.eventArgs);if(e.length===0){$("body").trigger("hideBackButton")}}});$("body").on("clearHistory",function(){e=[]});$(document).on("backbutton",function(t){if(e.length!=0){$("body").trigger("triggerHistory");t.stopPropagation()}else{navigator.app.exitApp()}});n()};$(document).on("deviceready",function(){FastClick.attach(document.body);techocall();$("body").trigger("headerReady");$("body").trigger("RegisteredContactsReady");$("body").trigger("ContactsReady");$("body").trigger("initializeSidebar")});var registeredContacts=function(){var e=$("#workarea");var t=$('<div class="contact"> '+'<div class="image"> <img id="photo" /> </div> '+'<div class="name"> </div> '+'<div id="deleteContact" class="delete"><img src="img/delete.png" /></div>'+'<div style="clear:both"> </div> '+"</div>");var n=function(t){var n=moduleLoader.loadModule("registeredContacts");n.done(function(n){e.html(n);e.hide();t.resolve()});return t.promise()};var r=function(n){$("#count").text(n.contacts.length);var r=e.find("#contacts");for(var i=0;i<n.contacts.length;i++){var s=t.clone();var o=n.contacts[i];s.attr("id",o.id);var u=s.find(".name");u.text(o.displayName);var a=s.find("#photo");a.attr("src",o.photo);s.data("phoneNumber",o.phoneNumber);r.append(s)}};var i=function(e){notification("Error loading contacts")};var s=function(){techoStorage.getAllContacts(r,i,[])};var o=function(e){var t=$("#count").text()-e.length;$("#count").text(t);for(var n=0;n<e.length;n++){$("#"+e[n]).remove()}};var u=function(e){notification("An error occured while deleting contacts : "+e)};var a=function(){var e=$('<div><img height="70%"  style="position:relative;top:15%"/></div>');var t,n;t=e.clone().find("img").attr("src","img/contacts.png");t.on(configuartion.events.userselect,function(e){$("body").trigger("getAllContacts")});n=e.clone().clone().find("img").attr("src","img/trash.png");n.on(configuartion.events.userselect,function(e){var t=$(".contact[selected=selected]");if(t.length===0){notification("No elements selected to delete");return}var n={};n.contactIds=[];for(var r=0;r<t.length;r++){n.contactIds.push(t.eq(r).attr("id"))}techoStorage.deleteContacts(o,u,[n])});var r=e.clone().find("img").attr("src","img/settings.png");r.on(configuartion.events.userselect,function(){$("body").trigger("settings")});var i=e.clone().find("img").attr("src","img/shutdown.png");i.on(configuartion.events.userselect,function(){navigator.app.exitApp()});var s=[t,n];var a=[r,i];$("body").trigger("updateTopStack",[s]);$("body").trigger("updateBottomStack",[a])};var f=function(){$("body").on(configuartion.events.userselect,".contact",function(e){var t=$(e.currentTarget);var n=t.attr("id");var r=t.find(".name").text();var i=t.find("img").attr("src");var s=t.data("phoneNumber");s=JSON.parse(s);$("body").trigger("addToHistory",["showTechoContacts"]);var o={};o.id=n;o.name=r;o.photo=i;o.phoneNumber=s;$("body").trigger("showRemainders",[JSON.stringify(o)])})};var l=function(){var t=e.height();var n=e.find(".addContact").outerHeight();var r=e.find(".wrapper");r.height(t-n)};$("body").on("showTechoContacts",function(){$("body").trigger("clearHistory");var t=new $.Deferred;n(t);t.done(function(){l();e.show();s();$("#version").text(window.location.hash)})});$("body").on(configuartion.events.userselect,"#getAllContacts",function(){$("body").trigger("getAllContacts")});$("body").on(configuartion.events.userselect,"#settings",function(){$("body").trigger("settings")});$("body").on(configuartion.events.userselect,"#deleteContact",function(e){var t=e.currentTarget;t=$(t).parent();var n={};n.contactIds=[];n.contactIds.push(t.attr("id"));techoStorage.deleteContacts(o,u,[n]);e.stopPropagation()});$("body").on("taphold",".contact",function(e){var t=e.currentTarget;t=$(t);var n=t.attr("selected");if(n){t.removeAttr("selected");t.removeClass("selected")}else{t.attr("selected","selected");t.addClass("selected")}var r=$(".contact[selected=selected]");if(r.length===0){$("body").trigger("hideSidebar")}else{$("body").trigger("showSidebar")}});$("body").on(configuartion.events.userselect,".contact",function(e){var t=$(e.currentTarget);var n=t.attr("id");var r=t.find(".name").text();var i=t.find("img").attr("src");var s=t.data("phoneNumber");s=JSON.parse(s);var o={};o.id=n;o.name=r;o.photo=i;o.phoneNumber=s;$("body").trigger("showRemainders",[JSON.stringify(o)])})};$("body").on("RegisteredContactsReady",function(e){registeredContacts();$("body").trigger("showTechoContacts");$(this).off(e)});var showAndRemainders=function(){var e=$("#workarea");var t={};var n=$("<div class='remainderItem'> <div class='remainderInfo'> "+"<div class='remainderMessagePreview'> </div> "+"<div class='lastShown'>(Last shown : <span id='lastShown'></span>)</div> </div>"+"<div class='remainderControls'>"+"<div class='edit'><img src='img/edit.png' /> </div>"+"<div id='deleteRemainder' class='delete'><img src='img/delete.png' /></div>"+"</div>"+"<div style='clear:both'> </div>"+"</div>");var r=function(t){e=$("#workarea");var n=moduleLoader.loadModule("showRemainders");n.done(function(n){e.html(n);t.resolve()})};var i=function(e){if(e&&e.userRemainders){if(e.userRemainders.length==0){$("#nodata").show();return}var t=$(".remainders").show();var r=new Date;var i=r.getTime()/1e3;var o=r.getYear();for(var u=0;u<e.userRemainders.length;u++){var a=e.userRemainders[u];var f=n.clone();f.data("remainder",JSON.stringify(a));f.attr("id",a.remainderId);f.find(".remainderMessagePreview").text(a.remainderMessage);if(a.isRemainded){var l=new Date(a.remaindedOn);var c=l.getTime()/1e3;var h;var p=l.getHours();var d=p<12?" AM ":" PM ";p=p<13?p:p-12;p=p===0?12:p;if(i-c<2592e3){h=p+" : "+l.getMinutes()+" : "+l.getSeconds()+d+" - "+l.getDate()+" : "+l.getMonth()}else if(i-c<7776e3){h=p+" : "+l.getMinutes()+" - "+l.toDateString()}else{h=l.toDateString()}f.find("#lastShown").text(h)}else{f.find("#lastShown").text("Never!")}t.append(f)}}else{s("Nothing to display")}};var s=function(e){$("#error").show()};var o=function(e){techoStorage.getAllRemaindersById(i,s,[e])};var u=function(e){for(var t=0;t<e.length;t++){$("#"+e[t]).remove()}};var a=function(){notification("An error occured while deleting remainders")};var f=function(){var e=$('<div><img height="70%"  style="position:relative;top:15%"/></div>');var n=e.clone().find("img").attr("src","img/notepad.png");n.on(configuartion.events.userselect,function(){$("#dummyInput").trigger(configuartion.events.userselect)});var r=e.clone().find("img").attr("src","img/userinfo.png");r.on(configuartion.events.userselect,function(){$("body").trigger("toUserInfo",[t])});var i=e.clone().find("img").attr("src","img/trash.png");i.on(configuartion.events.userselect,function(){var e=$(".remainderItem[selected=selected]");if(e.length===0){notification("No elements selected to delete");return}var t={};t.remainderIds=[];for(var n=0;n<e.length;n++){t.remainderIds.push(e.eq(n).attr("id"))}techoStorage.deleteRemainders(u,a,[t])});var s=[n,r,i];$("body").trigger("updateTopStack",[s])};var l=function(){var t=e.find(".user");t.height(t.height());var n=e.find(".remainderItem");n.height(n.height());var r=e.find("#newLine").height();e.find(".remainders").height((e.height()-(t.height()+e.find(".userMessage").height()))*.85)};$("body").on("showRemainders",function(n,i){var s=new $.Deferred;$("body").trigger("addToHistory",["showTechoContacts"]);t=JSON.parse(i);r(s);s.done(function(){e.find("#profile").attr("src",t.photo);e.find("#name").text(t.name);o(t.id);l()})});var c=function(e){var t=$(".remainders").show();var r=n.clone();r.data("remainder",JSON.stringify(e));r.attr("id",e.remainderId);r.find(".remainderMessagePreview").text(e.remainderMessage);if(e.isRemainded){var i=new Date(e.remaindedOn);var s=i.getHours()+" : "+i.getMinutes()+" : "+i.getSeconds()+" - "+i.toDateString();r.find("#lastShown").text(s)}else{r.find("#lastShown").text("Never!")}t.append(r)};var h=function(e){notification("Error creating...")};var p=function(t){e.find("#"+t.remainderId).find(".remainderMessagePreview").text(t.remainderMessage)};var d=function(e){notification("Error updating...")};var v=function(n){var r=e.find("#note").clone();var i=r.find("#indicator");var s=r.find("#background");var o=r.find("textarea");o.attr("maxlength",configuartion.maxRemainderLength);o.on("keyup",function(e){var t=o.val();if(t.length<=configuartion.maxRemainderLength){s.width(t.length/configuartion.maxRemainderLength*100+"%")}else{o.val(t.substr(0,t.length-1));return false}});var u=false;if(!n){n={};n.remainderId=(new Date).getTime();n.contactId=t.id;n.remainderType=0;n.isRemainded=false;n.remaindedOn=0;n.remaindedUsing=-1;u=true}else{n=JSON.parse(n);o.val(n.remainderMessage);s.width(o.val().length/configuartion.maxRemainderLength*100+"%")}var a=r.find("#ok");a.data("remainder",JSON.stringify(n));a.data("remainder",u);a.on(configuartion.events.userselect,function(e){n.remainderMessage=o.val();if(!n.remainderMessage||n.remainderMessage=="")return false;$(this).off(e);a.focus();r.hide();$(window).unbind("scroll");$("body").trigger("triggerHistory");if(u)techoStorage.addRemainder(c,h,[n]);else techoStorage.updateRemainder(p,d,[n])});r.show();confirm(r,e,"","modalClass");$(window).on("scroll",function(e){$(window).scrollTop(0)});$("body").trigger("addToHistory",["confirmClose"]);setTimeout(function(){o.height(o.height());o.focus();var e=i.outerHeight();var t=i.height();a.height(e);s.height(t);s.css("top","-"+e+"px");s.show()},100)};$("body").on(configuartion.events.userselect,"#newLine",function(){v()});$("body").on(configuartion.events.userselect,".edit",function(e){var t=$(e.currentTarget).parent().parent();var n=t.data("remainder");v(n)});$("body").on(configuartion.events.userselect,"#deleteRemainder",function(e){var t=$(e.currentTarget).parent().parent();var n={};n.remainderIds=[];n.remainderIds.push(t.attr("id"));techoStorage.deleteRemainders(u,a,[n]);e.stopPropagation()});$("body").on(configuartion.events.userselect,"#dummyInput",function(e){$("body").trigger("addToHistory",["showRemainders"[JSON.stringify(t)]]);t.readOnly=false;$("body").trigger("note",[JSON.stringify(t)])});$("body").on("toUserInfo",function(){$("body").trigger("addToHistory",["showRemainders"[JSON.stringify(t)]]);$("body").trigger("userInfo",[JSON.stringify(t)])})}();var contacts=function(){var e=$("#workarea");var t=undefined;var n=undefined;var r=undefined;var i=$("<div class='row'><img height='100%' /> <span id='name'></span> </div>");var s=function(r){var i=moduleLoader.loadModule("allContacts");i.done(function(i){e.html(i);t=e.find("#search");n=e.find("#userInfo");r.resolve()});return r.promise()};var o=function(){var t=$("header").height();var n=$("header > div");n.height(t);n.css("line-height",t+"px");$("#contact").height(e.height()*.08);i.height($("#contact").height());i.css("line-height",$("#contact").height()+"px");$(".message").height($(".message").height());$(".message").css("line-height",$(".message").height()+"px")};$("body").on("getAllContacts",function(){var t=new $.Deferred;$("body").trigger("addToHistory",["showTechoContacts"]);s(t);t.done(function(){o();e.find(".message").show();$("#contact").focus();setTimeout(function(){$("#contact").focus()},1e3)})});$("body").on("blur","#contact",function(){$(window).unbind("scroll")});$("body").on("focus","#contact",function(){c();t.show();$(window).on("scroll",function(e){$(window).scrollTop(0)})});$("body").on("keyup","#contact",function(e){var t=e.target.value;if(t.length!=0&&t.length>=3){u(t)}else{}});var u=function(e){var t=new ContactFindOptions;t.filter=e;t.multiple=true;var n=["id","displayName","photos","phoneNumbers"];r=(new Date).getTime();$("#load").css("visibility","visible").width("25%");navigator.contacts.find(n,a,f,t,r)};var a=function(e,t){var n=$("#load");if(t==r){n.width("50%")}else{return}c();var i=[];if(!e||e.length===0){var s={};s.name="No Result";i.push(s)}else{var o=50/e.length;for(var u=0;u<e.length;u++){if(e[u].displayName&&e[u].displayName!="null"&&e[u].phoneNumbers&&e[u].phoneNumbers!="null"){var s={};s.name=e[u].displayName;s.id=e[u].id;s.photo=e[u].photos;var a=[];var f=e[u].phoneNumbers;for(var h=0;h<f.length;h++){var p=f[h];if(p.value){var d={};var v=p.value.replace(/\D/g,"").match(/\d{10}$/);d.number=v&&v[0]?v[0]:"0000000000";d.type=p.type;a.push(d)}}s.phoneNumber=a;i.push(s)}}n.width(50+o*u+"%")}if(i.length===0){var s={};s.name="No Result";i.push(s)}l(i);n.width("100%");setTimeout(function(){n.css("visibility","hidden")},500)};var f=function(e,t){if(timeStamp==r){load.css("visibility","hidden")}else{return}c();notification("Error fetching contacts")};var l=function(e){for(var n=0;n<e.length;n++){var r=e[n];var s=i.clone();if(r.id){s.attr("id",r.id);if(r.photo&&r.photo[0]){r.photo=r.photo[0].value}else{r.photo="img/photo.jpg"}var o=s.find("img");s.data("json",JSON.stringify(r));o.attr("src",r.photo);o[0].onerror=function(e){var t=e.currentTarget;var t=$(t);t.attr("src","img/photo.jpg");t=t.parent();var n=t.data("json");n=JSON.parse(n);n.photo="img/photo.jpg";t.data("json",JSON.stringify(n))}}s.find("#name").text(r.name);t.append(s)}};$("body").on("error",".row > img",function(e){var t=e.currentTarget;var t=$(t);t.attr("src","img/photo.jpg");t=t.parent();var n=t.data("json");n=JSON.parse(n);n.photo="img/photo.jpg";t.data("json",JSON.stringify(n))});var c=function(){t.empty()};$("body").on("toUser",function(){var e=$("#contact").data("json");techoStorage.addContact(h,p,[e])});var h=function(e){$("body").trigger("showRemainders",[JSON.stringify(e)])};var p=function(e){c();l("Error creating")};$("body").on(configuartion.events.userselect,".row",function(t){var n=$(t.currentTarget);if(n.attr("id")){$("#contact").val(n.text());var r=n.data("json");$("#contact").data("json",JSON.parse(r));var i=JSON.parse(r);var s=e.find("#addContact").clone();$("#contact").blur();var o=s.find("#addTickUser");o.text(i.name);s.show();confirm(s,e,"contactOverlay");$("body").trigger("addToHistory",["confirmClose"]);$("body").on("confirmClose",function(){s.hide()});o.on(configuartion.events.userselect,function(e){s.hide();$("body").trigger("confirmClose");var t=$("#contact").data("json");techoStorage.addContact(h,p,[t])})}})}();$("body").on("ContactsReady",function(e){});var settings=function(){var e=$("#workarea");var t=false;var n=function(t){var n=moduleLoader.loadModule("settings");n.done(function(n){e.html(n);t.resolve()});return t.promise()};var r=function(t){if(t){for(var n=0;n<t.length;n++){var r=t[n];var i=r.name;var s=r.value;var o=r.id;if(s==0){e.find("#"+o).removeAttr("checked")}else{e.find("#"+o).attr("checked","checked")}}}};var i=function(e){notification("Error while loading settings"+e)};$("body").on("settings",function(){var e=new $.Deferred;$("body").trigger("addToHistory",["showTechoContacts"]);n(e);e.done(function(){techoStorage.getSettings(r,i,[])})});var s=function(e){t=false};var o=function(e){t=false;notification("Error updating preferences")};var u=function(e,n){var r=n.find("input").attr("checked")?0:1;var i={id:e,value:r};t=true;techoStorage.updateSettings(s,o,[i])};var a=function(){var e="<div>Version "+window.location.hash+"</div>"+"<div>techostic@gmail.com</div>";var t="About Next Talk";$("body").trigger("addToHistory",["modalClose"]);alert(e,t)};$("body").on(configuartion.events.userselect,".item",function(e){if(t)return;var n=$(e.currentTarget);var r=n.attr("for");switch(r){case"about":a();break;default:u(r,n);break}})}()