let secretNumber;
        let attempts = 0;
        const maxAttempts = 7;
        let guessedNumbers = [];
        let gameRunning = false;

        function startGame() {
            secretNumber = Math.floor(Math.random() * 100) + 1;
            attempts = 0;
            guessedNumbers = [];
            gameRunning = true;

            document.getElementById('game-output').classList.add('show');
            askForGuess();
        }

        function askForGuess() {
            if (!gameRunning) return;

            let userInput = prompt(
                `Đoán lần ${attempts + 1}/${maxAttempts}:\nNhập số từ 1 đến 100:`
            );

            // Nếu user nhấn Cancel
            if (userInput === null) {
                updateOutput(`<p class="wrong">❌ Bạn đã hủy game!</p><p>Số đúng là: <strong>${secretNumber}</strong></p>`);
                gameRunning = false;
                return;
            }

            // Validate input
            const number = parseInt(userInput);

            if (isNaN(number) || number < 1 || number > 100) {
                alert("❌ Vui lòng nhập một số từ 1 đến 100!");
                askForGuess();
                return;
            }

            // Kiểm tra số lặp
            if (guessedNumbers.includes(number)) {
                alert(`⚠️ Bạn đã đoán số ${number} rồi!\nHãy thử số khác.`);
                askForGuess();
                return;
            }

            attempts++;
            guessedNumbers.push(number);

            // So sánh
            if (number === secretNumber) {
                updateOutput(
                    `<p class="correct">✅ ĐÚNG RỒI!</p>` +
                    `<p class="message">Bạn đoán đúng sau <strong>${attempts}</strong> lần!</p>` +
                    `<p>Các số bạn đã đoán: ${guessedNumbers.join(', ')}</p>`
                );
                gameRunning = false;
            } else if (number < secretNumber) {
                if (attempts >= maxAttempts) {
                    updateOutput(
                        `<p class="wrong">❌ THUA CUỘC!</p>` +
                        `<p class="message">Số đúng là: <strong>${secretNumber}</strong></p>` +
                        `<p>Các số bạn đã đoán: ${guessedNumbers.join(', ')}</p>` +
                        `<p>Bạn đã hết ${maxAttempts} lần đoán.</p>`
                    );
                    gameRunning = false;
                } else {
                    alert(`⬆️ Số bạn đoán quá thấp!\nLần đoán còn lại: ${maxAttempts - attempts}`);
                    askForGuess();
                }
            } else {
                if (attempts >= maxAttempts) {
                    updateOutput(
                        `<p class="wrong">❌ THUA CUỘC!</p>` +
                        `<p class="message">Số đúng là: <strong>${secretNumber}</strong></p>` +
                        `<p>Các số bạn đã đoán: ${guessedNumbers.join(', ')}</p>` +
                        `<p>Bạn đã hết ${maxAttempts} lần đoán.</p>`
                    );
                    gameRunning = false;
                } else {
                    alert(`⬇️ Số bạn đoán quá cao!\nLần đoán còn lại: ${maxAttempts - attempts}`);
                    askForGuess();
                }
            }
        }

        function updateOutput(content) {
            document.getElementById('game-content').innerHTML = content;
        }