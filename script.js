$(document).ready(function () {
    var memoryMatch = new memoryMatchConstructor();
    memoryMatch.startSequence();
});

function memoryMatchConstructor() {
    var gameMechanics = new gameMechanicsConstructor();
    var display = new displayConstructor();
    var youTube = new youTubeConstructor();
    var eventHandlers = new eventHandlersConstructor();
    this.startSequence = function () {
        eventHandlers.declare();
        $('.creditsContainer').hide();
        youTube.showIntroVideo();
    };

    function eventHandlersConstructor() {
        this.declare = function () {
            $('.closebtn').click(function () {
                $('#brandVideo').remove();
                display.toggleOverlay()
            });
            $(".navbar-nav li").slice(-2).on({
                mouseenter: function () {
                    $(this).toggleClass('active');
                },
                mouseleave: function () {
                    $(this).toggleClass('active');
                }
            });
        };

        this.turnCardOn = function(){
            $(".card").on("click", function () {
                gameMechanics.assignCards(this);
            });
        };
    }

    function displayConstructor() {
        this.cardDivClasses = {
            cardContainer : "col-xs-1 card",
            newRow : "row",
            cardBack : "back",
            cardFront : "front"
        };

        this.createCardElements = function (currentMake) {
            var mainCardDiv = $("<div>",{
                class : this.cardDivClasses.cardContainer,
				value : currentMake
            }).on("click",function (){
                gameMechanics.assignCards(this);
            });
            $(mainCardDiv).append($("<div>").addClass(this.cardDivClasses.cardBack).css("background-image","url('images/"+ currentMake +".png')").val(currentMake));
            $(mainCardDiv).append($("<div>").addClass(this.cardDivClasses.cardFront));
            return mainCardDiv;
        };

        this.appendCardElements = function () {
            youTube.startSearch(gameMechanics.vehicleBrands);
            gameMechanics.vehicleBrands = gameMechanics.randomizeArray(gameMechanics.vehicleBrands.concat(gameMechanics.vehicleBrands));
            for(var x = 0; x  < gameMechanics.vehicleBrands.length; x++){
                $(".cardsContainer").append(this.createCardElements(gameMechanics.vehicleBrands[x]));
            }
        };

        this.toggleOverlay = function () {
            $('.overlay').toggleClass('showOverlay');
        };

        this.stats = function () {
            $('.matches').text("Total Matches : " + gameMechanics.matchCount);
            $('.accuracy').text("Accuracy : " + ~~((gameMechanics.matchCount / gameMechanics.tryCount) * 200) + "%");
            $('.gamePlayed').text("Games Played : " + gameMechanics.gamesPlayed);
        };
    }

    function gameMechanicsConstructor() {
        this.gamesPlayed = 0;
        this.assignCards = function (clickedElement) {
            this.tryCount++;
            $('.card').off('click');
            if(!this.clicked.first){
                this.clicked.first = clickedElement;
                $(clickedElement).addClass("flip");
                setTimeout(function () {
                    eventHandlers.turnCardOn();
                },1000);
            } else if(!this.clicked.second){
                this.clicked.second = clickedElement;
                $(clickedElement).addClass("flip");
                this.checkCardMatch();
                display.stats();
            }
        };

        this.checkCardMatch = function () {
            if($(this.clicked.first).find(".back").val() === $(this.clicked.second).find(".back").val()){
                this.matchCount++;
                if(this.matchCount === (this.vehicleBrands.length / 2)){
                    setTimeout(this.winningCondition,1000)
                } else {
                    setTimeout(function () {
                        eventHandlers.turnCardOn();
                    },1000);
                    gameMechanics.softReset();
                }
            } else {
                setTimeout(function () {
                    $(gameMechanics.clicked.first).add(gameMechanics.clicked.second).find(".back").effect("shake");
                },1000);
                setTimeout(function () {
                    $(gameMechanics.clicked.first).add(gameMechanics.clicked.second).removeClass("flip");
                    eventHandlers.turnCardOn();
                    gameMechanics.softReset();
                } ,2500);
            }
        };

        this.winningCondition = function () {
            $('.card').on('click',function () {
                alert('working' + this);
            });
            youTube.showManufacturerVideo($(gameMechanics.clicked.first).find(".back").val());
        };

        this.softReset = function () {
            this.clicked = {};
        };

        this.hardReset = function () {
            // NOTE : this array is associated with the file names of the pictures and their names was based on their youtube channel name so that we could reuse the same data when we search in the youtube API.
            this.vehicleBrands = ["audiOfAmerica","bmwUsa","mbUsa","lamborghini","bugattiSocial","ferrariWorld","lexusVehicles","mclarenAutomotiveTv","astonMartin","bentleyMotors","landRover","miniUsa","jaguarCarsLimited","porsche","maserati"];
	        this.matchCount = 0;
            this.tryCount = 0;
            this.softReset();
            $('.cardsContainer').empty();
            display.appendCardElements();
        }.bind(this);

        this.randomizeArray = function (arrayToRandomize) {
            var arrayLength = arrayToRandomize.length;
            while(arrayLength){
                var randomIndex = ~~( Math.random() * arrayLength-- );
                arrayToRandomize[randomIndex] = [arrayToRandomize[arrayLength],arrayToRandomize[arrayLength] = arrayToRandomize[randomIndex]][0];
            }
            return arrayToRandomize;
        };
    }

    function youTubeConstructor() {
        this.videosId = {};
        this.startSearch = function (manufacturers) {
            for(var i = 0; i  < manufacturers.length; i++){
                this.getChannelId(manufacturers[i]);
            }
        };

        this.getChannelId = function (carMake) {
            $.ajax({
                'dataType' : 'json',
                'method' : 'get',
                'url' : "https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=" + carMake + "&key=AIzaSyCFnzkoSnONp0XAEJ28TymrcgS4llgQo_g",
                "success" : function(serverObj) {
                    youTube.getVideosId(serverObj.items[0].id, carMake);
                },
                error: function() {
                    console.error('error');
                }
            });
        };

        this.getVideosId = function (id, carMake) {
            $.ajax({
                'dataType' : 'json',
                'method' : 'get',
                'videoDuration' : 'short',
                'url' : "https://www.googleapis.com/youtube/v3/search?key=AIzaSyCFnzkoSnONp0XAEJ28TymrcgS4llgQo_g&channelId=" + id + "&part=snippet,id&order=date&maxResults=10",
                "success" : (function(serverObj) {
                    var temp = [];
                    for(var x = 0; x  < serverObj.items.length; x++){
                        if(serverObj.items[x].id.videoId){
                            temp.push(serverObj.items[x].id.videoId);
                        }
                    }
                    this.videosId[carMake] = temp;
                }).bind(this),
            });
        };

        this.showIntroVideo = function () {
            if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                window.onYouTubePlayerAPIReady = function() {
                    onYouTubePlayer();
                };
            } else {
                onYouTubePlayer();
            }

            function onYouTubePlayer() {
                this.player = new YT.Player('player', {
                    videoId: 'qAe0P6rhgtQ',
                    playerVars : {
                        showinfo : 0,
                        modestbranding : 0,
                        controls : 0,
                        autohide : 1
                    },
                    events: {
                        onReady: onPlayerReady,
                        onStateChange: onPlayerStateChange
                    }
                });

                function onPlayerReady(event) {
                    event.target.playVideo();
                }

                function onPlayerStateChange(event) {
                    if(event.data === 0) {
                        $(".videoContainer").remove();
                        // Declare Click Handler for Reset Button
                        $('.navbar-nav li:last-of-type').click(function (){
                            gameMechanics.hardReset();
                            display.stats();
                        });
                        gameMechanics.hardReset();
                    }
                }
            }
        };

        this.showManufacturerVideo = function (make){
            $('.manufacturerName').text(make.replace(/([A-Z])/g, ' $1').trim());
            var playerDiv = $('<div>').attr('id','brandVideo');
            $('.overlay-content').append(playerDiv);
            display.toggleOverlay();
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            this.player = new YT.Player('brandVideo', {
              events: {
                  onReady: onPlayerReady,
              }
            });
            function onPlayerReady(event) {
                event.target.playVideo();
                event.target.loadPlaylist({playlist: gameMechanics.randomizeArray(youTube.videosId[make])});
            }
        };
    }
}
