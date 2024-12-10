let answer = generateAnswer();
let attempts = 0;

// 生成 1A2B 答案的函數
function generateAnswer() {
    let digits = Array.from({ length: 10 }, (_, i) => i.toString());
    let answer = [];
    for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * digits.length);
        answer.push(digits.splice(index, 1)[0]);
    }
    return answer;
}

// 檢查用戶輸入的函數
function checkGuess() {
    const userGuess = document.getElementById("userGuess").value.trim();
    const errorDiv = document.getElementById("error");
    const resultTable = document.getElementById("resultTable");

    // 清除錯誤訊息
    errorDiv.textContent = "";

    // 驗證輸入
    if (!/^\d{4}$/.test(userGuess)) {
        errorDiv.textContent = "請輸入 4 個數字！";
        return;
    }
    if (new Set(userGuess).size !== 4) {
        errorDiv.textContent = "數字不能重複！";
        return;
    }

    attempts++;
    const result = getResult(userGuess);

    // 更新結果表
    const row = document.createElement("tr");
    row.innerHTML = `<td>${attempts}</td><td>${userGuess}</td><td>${result}</td>`;
    resultTable.appendChild(row);

    // 猜對時提示
    if (result === "4A0B") {
        alert(`恭喜！你猜對了！總共用了 ${attempts} 次。`);
        resetGame();
    }
}

// 計算 1A2B 的結果
function getResult(guess) {
    let a = 0, b = 0;
    guess.split("").forEach((digit, i) => {
        if (digit === answer[i]) {
            a++;
        } else if (answer.includes(digit)) {
            b++;
        }
    });
    return `${a}A${b}B`;
}

// 重置遊戲
function resetGame() {
    answer = generateAnswer();
    attempts = 0;
    document.getElementById("resultTable").innerHTML = "";
    document.getElementById("userGuess").value = "";
}
