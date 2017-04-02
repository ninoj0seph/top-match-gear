$(document).ready(function () {
    $('.overlay').toggleClass('showOverlay');
    // var memoryMatch = new memoryMatchConstructor();
    // memoryMatch.startSequence();
})

function memoryMatchConstructor() {
    var gameMechanics = new gameMechanicsConstructor();
    var display = new displayConstructor();
    var youTube = new youTubeConstructor();
    var clickHandlers = new clickHandlersConstructor();
    this.startSequence = function () {
        clickHandlers.declare();
        youTube.showIntroVideo();
        gameMechanics.hardReset();
    };

    function clickHandlersConstructor() {
        this.declare = function () {
            $('.navbar-nav li:nth-child(2)').click(gameMechanics.hardReset);
            $('.closebtn').click(function () {
                $('#brandVideo').remove();
                display.toggleOverlay()
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
                class : this.cardDivClasses.cardContainer
            }).on("click",function (){
                gameMechanics.assignCards(this);
            });
            $(mainCardDiv).append($("<div>").addClass(this.cardDivClasses.cardBack).css("background-image","url('logo/"+ currentMake +".png')"));
            $(mainCardDiv).append($("<div>").addClass(this.cardDivClasses.cardFront));
            return mainCardDiv;
        };

        this.appendCardElements = function () {
            youTube.startSearch(gameMechanics.vehicleBrands);
            gameMechanics.vehicleBrands = gameMechanics.randomizeArray(gameMechanics.vehicleBrands.concat(gameMechanics.vehicleBrands));
            console.log(gameMechanics.vehicleBrands);
            for(var x = 0; x  < gameMechanics.vehicleBrands.length; x++){
                $(".cardsContainer").append(this.createCardElements(gameMechanics.vehicleBrands[x]));
            }
        };

        this.toggleOverlay = function () {
            $('.overlay').toggleClass('showOverlay');
        }
    }

    function gameMechanicsConstructor() {
        this.assignCards = function (clickedElement) {
            $('.card').off('click');
            if(!this.clicked.first){
                this.clicked.allowed = false;
                this.clicked.first = clickedElement;
                $(clickedElement).addClass("flip");
                this.clicked.allowed = true;
                setTimeout(function () {
                    clickHandlers.turnCardOn();
                },800);
            } else if(!this.clicked.second){
                this.clicked.allowed = false;
                this.clicked.second = clickedElement;
                $(clickedElement).addClass("flip");
                this.clicked.allowed = true;
                this.checkCardMatch();
            }
        };

        this.checkCardMatch = function () {
            if($(this.clicked.first).find(".back").css("background-image") === $(this.clicked.second).find(".back").css("background-image")){
                this.matchCount++;
                if(this.matchCount === (this.vehicleBrands.length / 2)){
                    setTimeout(this.winningCondition,1000)
                } else {
                    clickHandlers.turnCardOn();
                    gameMechanics.softReset();
                }
            } else {
                setTimeout(function () {
                    $(gameMechanics.clicked.first).add(gameMechanics.clicked.second).find(".back").effect("shake");
                },1000);
                setTimeout(function () {
                    $(gameMechanics.clicked.first).add(gameMechanics.clicked.second).removeClass("flip");
                    clickHandlers.turnCardOn();
                    gameMechanics.softReset();
                } ,2500);
            }
        };

        this.winningCondition = function () {
            var lastManufacturer = ($(gameMechanics.clicked.first).find(".back").css("background-image")).toString().replace('url("http://localhost:63342/lfz/memory_match/logo/','');
            lastManufacturer = lastManufacturer.replace('.png")','');
            $('.front').remove();
            $('.card').on('click',function () {
                alert('working' + this);
            });
            youTube.showManufacturerVideo(gameMechanics.randomizeArray(youTube.videosId[lastManufacturer]));
        };

        this.softReset = function () {
            this.clicked = {};
        };

        this.hardReset = function () {
            // NOTE : this array is associated with the file names of the pictures and their names was based on their youtube channel name so that we could reuse the same data when we search in the youtube API.
            // this.vehicleBrands = ["audiOfAmerica","bmwUsa","mbUsa","lamborghini","bugattiSocial","ferrariWorld","lexusVehicles","mclarenAutomotiveTv","astonMartin","bentleyMotors","landRover","miniUsa","jaguarCarsLimited","porsche","maserati"];
            this.vehicleBrands = ["bmwUsa","audiOfAmerica"];
            this.matchCount = 0;
            this.softReset();
            $('.cardsContainer').empty();
            display.appendCardElements();
        }.bind(this);

        this.randomizeArray = function (arrayToRandomize) {
            var arrayLength = arrayToRandomize.length;
            while(arrayLength){
                var randomIndex = ~~(Math.random() * arrayLength--);
                arrayToRandomize[randomIndex] = [arrayToRandomize[arrayLength],arrayToRandomize[arrayLength] = arrayToRandomize[randomIndex]][0];
            }
            return arrayToRandomize;
        };
    }

    function youTubeConstructor() {
        this.videosId = {};
        this.counter = 0;
        this.startSearch = function (manufacturers) {
            for(var i = 0; i  < manufacturers.length; i++){
                this.getChannelId(manufacturers[i]);
            }
        };

        this.getChannelId = function (carMake) {
            this.counter++;
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
            $('.cardsContainer').hide();
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            this.player = new YT.Player('player', {
                videoId: 'qAe0P6rhgtQ',
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
                    $(".videoContainer").remove()
                    $(".cardsContainer").show();
                }
            }
        };

        this.showManufacturerVideo = function (videoIdToPlay){
            var playerDiv = $('<div>').attr('id','brandVideo');
            $('.overlay-content').append(playerDiv);
            display.toggleOverlay();
            var tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            this.player = new YT.Player('brandVideo', {
              videoId: videoIdToPlay.shift(),
              events: {
                  onReady: onPlayerReady,
              }
            });
            function onPlayerReady(event) {
                event.target.playVideo();
                event.target.loadPlaylist({playlist: videoIdToPlay});
            }
        };
    }
}
