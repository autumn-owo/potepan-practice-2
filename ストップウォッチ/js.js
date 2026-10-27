$(function () {
    let time = 0;
    let timer;

    function updatetime() {
        let hour = Math.floor(time / 3600000);
        let minute = Math.floor((time % 3600000) / 60000);
        let second = Math.floor((time % 60000) / 1000);
        let mill = Math.floor((time % 1000) / 100);

        $("#hour").text(hour);
        $("#minute").text(minute);
        $("#second").text(second);
        $("#mill").text(mill);
    }

    $("#time-start").on("click", function () {
        timer = setInterval(function () {
            time += 10
            updatetime();
        }, 10);
        $("#time-start").prop("disabled", true);
        $("#time-stop").prop("disabled", false);
        $("#time-reset").prop("disabled", true);
    });

    $("#time-stop").on("click", function () {
        clearInterval(timer);
        $("#time-start").prop("disabled", false);
        $("#time-stop").prop("disabled", true);
        $("#time-reset").prop("disabled", false);
    });

    $("#time-reset").on("click", function () {
        time = 0;
        updatetime();
        $("#time-start").prop("disabled", false);
        $("#time-stop").prop("disabled", true);
        $("#time-reset").prop("disabled", true);
    });

})