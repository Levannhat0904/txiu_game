document.addEventListener("DOMContentLoaded", function() {
    var balance = 1000;
    var betAmountInput = document.getElementById("bet-amount");
    var betChoiceInput = document.getElementById("bet-choice");
    var playButton = document.getElementById("play-button");
    var playAgainButton = document.getElementById("play-again-button");
    var resultContainer = document.getElementById("result");
    var balanceContainer = document.getElementById("balance");

    playButton.addEventListener("click", function() {
        var betAmount = parseInt(betAmountInput.value);
        var betChoice = betChoiceInput.value;

        if (isNaN(betAmount) || betAmount < 1) {
            alert("Vui lòng nhập số tiền cược hợp lệ.");
            return;
        }

        if (betChoice !== "tai" && betChoice !== "xiu") {
            alert("Vui lòng chọn Tài hoặc Xỉu.");
            return;
        }

        playGame(betAmount, betChoice);
    });

    playAgainButton.addEventListener("click", function() {
        resultContainer.innerHTML = "";
        playAgainButton.classList.add("hidden");
        playButton.classList.remove("hidden");
    });

    function playGame(betAmount, betChoice) {
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        var dice3 = Math.floor(Math.random() * 6) + 1;
        var total = dice1 + dice2 + dice3;

        var resultMessage = "Kết quả xúc xắc là: " + dice1 + ", " + dice2 + ", " + dice3 + "<br>";
        resultMessage += "Tổng = " + total + "<br>";

        var diceContainer = document.createElement("div");
        diceContainer.classList.add("dice-container");

        var diceElements = document.createElement("div");
        diceElements.classList.add("dice");
        diceElements.innerText = dice1;
        diceContainer.appendChild(diceElements);

        diceElements = document.createElement("div");
        diceElements.classList.add("dice");
        diceElements.innerText = dice2;
        diceContainer.appendChild(diceElements);

        diceElements = document.createElement("div");
        diceElements.classList.add("dice");
        diceElements.innerText = dice3;
        diceContainer.appendChild(diceElements);

        resultContainer.innerHTML = resultMessage;
        resultContainer.appendChild(diceContainer);

        if ((total < 11 && betChoice === "tai") || (total > 10 && betChoice === "xiu")) {
            resultMessage += "Bạn đã đoán đúng!<br>";
            balance += betAmount;
            resultMessage += "Bạn nhận được " + betAmount + " đồng.";
        } else {
            resultMessage += "Bạn đã đoán sai!<br>";
            balance -= betAmount;
            resultMessage += "Bạn không nhận được số tiền nào.";
        }

        resultContainer.innerHTML = resultMessage;
        balanceContainer.innerHTML = "Số dư hiện tại: $" + balance;

        if (balance <= 0) {
            playButton.classList.add("hidden");
            playAgainButton.classList.remove("hidden");
            resultContainer.innerHTML += "<br>Bạn đã hết tiền!";
        } else {
            playButton.classList.add("hidden");
            playAgainButton.classList.remove("hidden");
        }
    }
});
