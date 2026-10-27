$(function () {

    let calculated = false;

    $(".number").on("click", function () {

        let number = $(this).text();
        let current = $("#gamen").val();

        if (calculated || current === "エラー") {
            current = "0";
            calculated = false;
        }

        let lastNumber = current.split(/[+\-*/]/).pop();

        if (number === ".") {
            if (lastNumber.includes(".")) {
                return;
            }

            if (lastNumber === "") {
                number = "0.";
            }
        }

        if (current === "0" && number !== "." && number !== "0.") {

            if (number === "00") {
                $("#gamen").val("0");
            } else {
                $("#gamen").val(number);
            }

        } else {

            $("#gamen").val(current + number);

        }

    });

    $(".operator").on("click", function () {

        let operator = $(this).text();
        let current = $("#gamen").val();

        if (current === "エラー") {
            return;
        }

        calculated = false;

        if (current === "0" && operator === "-") {
            $("#gamen").val("-");
            return;
        }

        if (current === "-") {
            return;
        }

        if (/[+\-*/]$/.test(current)) {

            if (operator === "-" && !/[+\-*/]-$/.test(current)) {
                $("#gamen").val(current + "-");

            } else if (/[+\-*/]-$/.test(current)) {
                $("#gamen").val(current.slice(0, -2) + operator);

            } else {
                $("#gamen").val(current.slice(0, -1) + operator);
            }

            return;
        }

        $("#gamen").val(current + operator);

    });

    $(".equal").on("click", function () {

        let current = $("#gamen").val();

        let match = current.match(
            /^(-?\d+(?:\.\d*)?)((?:[+\-*/]-?\d+(?:\.\d*)?)+)$/
        );

        if (!match) {
            return;
        }

        let total = 0;
        let term = Number(match[1]);

        let operations = match[2].matchAll(
            /([+\-*/])(-?\d+(?:\.\d*)?)/g
        );

        for (let operation of operations) {

            let operator = operation[1];
            let number = Number(operation[2]);

            if (operator === "*") {

                term *= number;

            } else if (operator === "/") {

                if (number === 0) {
                    $("#gamen").val("エラー");
                    calculated = true;
                    return;
                }

                term /= number;

            } else if (operator === "+") {

                total += term;
                term = number;

            } else if (operator === "-") {

                total += term;
                term = -number;

            }

        }

        $("#gamen").val(total + term);
        calculated = true;

    });

    $(".clear").on("click", function () {

        $("#gamen").val("0");
        calculated = false;

    });

});