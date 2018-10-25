$(function() {

    const game = (function() {
        let guesses = 0;
        let points = 0;
        const maxguesses = $(".picture").length;

        let sec = 5;
        sec = setInterval(function(){return sec--;}, 1000);

        $(".picture").click(function() {

            const $button = $('.answer-list').find('#' + $(this).attr('id'));
            const $picture = $(this);
            const $timer = $('.timer');


            if ($picture.hasClass("active")) {
                guesses++;
                let sec = 5;
                $timer.text('Pozostało: ' + sec + 's');
                const CountFiveSec = setInterval(function () {
                    if (sec > 0) {
                        sec = sec - 1;
                        $timer.text('Pozostało: ' + sec + 's');
                    }
                }, 1000);
                $timer.removeClass("green");
                $picture.removeClass("active");
                $picture.removeClass("filter");
                if($('html').width() > 768) {
                    $picture.animate({height: "+=" + 50, width: "+=" + 50});
                    $picture.css({'position': 'absolute', 'z-index': '5'});
                }
                $button.one('click', function() {
                    $(this).disabled = true;
                    points++;
                    $(".counter span").html(points);
                    $(this).addClass("green-backgr");
                    $timer.addClass("green");
                    $timer.text('Brawo! Zdobyłeś punkt!');
                    clearInterval(CountFiveSec);
                    pictureReturn($picture);
                    clearTimeout(timerID);
                    if (guesses === maxguesses) {
                        setTimeout(function(){finish()}, 400);
                    };

                });

                const timerID = setTimeout(function () {
                    pictureReturn($picture);
                    if (guesses === maxguesses) {
                        setTimeout(function(){finish()}, 400);
                    }
                    else {
                        $timer.text('Niestety, Twój czas się skończył. Spróbuj zgadnąć tytuł innego obrazu.');
                        $picture.addClass("grayscale");
                        $button.off("click");
                        clearInterval(CountFiveSec);
                    };
                }, 5000);
            };


            const pictureReturn = function(picture) {
                if ($('html').width() > 768) {
                    picture.animate({height: "-=" + 50, width: "-=" + 50});
                    setTimeout(function(){picture.css({'position': 'relative', 'z-index': '0'})}, 500);
                }
            }

            const finish = function() {
                if (points === maxguesses) {
                    alert ("Zwyciężyłeś! Gratulacje!");
                }
                else {
                    alert ("Koniec gry! Zdobyłeś " + points + " punktów.");
                }
            }
        });

    })();


    const init = (function() {
        const picturesList = [];

        function Picture(name, file, title) {
            this.path = "jpg/woman/";
            this.name = name;
            this.file = file;
            this.title = title;
            this.fullPath = function() {
                return this.path + this.file;
            }
            picturesList.push(this);
        }

        let narodzinyVanus = new Picture("narodziny-venus", "narodziny-venus.jpg", "Narodziny Venus");
        let pomaranczarka = new Picture("pomaranczarka", "pomaranczarka.jpg", "Pomarańczarka");
        let portretAdeli = new Picture("portret-adeli-bloch-bauer", "portret-adeli-bloch-bauer.jpg", "Portret Adeli Bloch Bauer");
        let dziewczynaPerla = new Picture("dziewczyna-z-perla", "dziewczyna-z-perla.jpg", "Dziewczyna z perłą");
        let matkaWhistlera = new Picture("matka-whistlera", "matka-whistlera.jpg", "Matka Whistler'a");
        let mleczarka = new Picture("mleczarka", "mleczarka.jpg", "Mleczarka");
        let monalisa = new Picture("monalisa", "monalisa.jpg", "Mona Lisa");
        let venusZUrbino = new Picture("venere_di_urbino", "venere_di_urbino.jpg", "Wenus z Urbino");
        let damaZLasiczka = new Picture("dama-z-lasiczka", "dama-z-lasiczka.jpg", "Dama z łasiczką");


        const buttons = [
            {id:"dama-z-lasiczka", title:"Dama z łasiczką"},
            {id:"mleczarka", title:"Mleczarka"},
            {id:"dziewczyna-z-perla", title:"Dziewczyna z perłą"},
            {id:"narodziny-venus", title:"Narodziny Venus"},
            {id:"monalisa", title:"Monalisa"},
            {id:"pomaranczarka", title:"Pomarańczarka"},
            {id:"portret-adeli-bloch-bauer", title:"Portret Adeli Bloch-Bauer"},
            {id:"matka-whistlera", title:"Matka Whistler'a"},
            {id:"venere_di_urbino", title:"Venus z Urbino"},

        ]

        const findPictPlace = function() {
            $(".picture").each(function() {
                const PictNumber = [Math.floor(Math.random() * picturesList.length)];
                const imagePath = picturesList[PictNumber].fullPath();
                $(this).css('background-image',  'url(' + imagePath + ')');
                $(this).attr('id',  picturesList[PictNumber].name);
                picturesList.splice(PictNumber, 1);
            });
        }

        const makeAnswerList = function() {
            const $answerList = $('.answer-list');
            let x = buttons.length;
            for (var i = x; i > 0; i--) {
                const buttonNumber = [Math.floor(Math.random() * buttons.length)]
                const button = buttons[buttonNumber];
                buttons.splice(buttonNumber, 1);
                const html = `<li><button id=${button.id} class="btn btn-primary default btn-answer">${button.title}</button></li>`;
                const $y = $(html).hide();
                $answerList.append($y);
                $y.delay(100*i).slideDown();

            }
        }

        return {
            findPictPlace: findPictPlace,
            makeAnswerList: makeAnswerList
        }
    })();


    $(function () {
        $('.button-game-rules').popover({
            container: 'body'
        })
    })

    init.findPictPlace();
    init.makeAnswerList();

})
