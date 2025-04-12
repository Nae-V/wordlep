let attempts = 0;
let index = 0;
let timer;

function appStart() {
    function displayGameover() {
        const div = document.createElement('div');
        div.innerText = '게임이 종료됐다.';
        div.style = 'display:flex; justify-content:center; align-items:center; position:absolute; background-color:blue; top:50vh; width:100vw; height:30vh;';
        document.body.appendChild(div);
    }

    function nextLine() {
        attempts++;
        if (attempts === 6) return gameover();
        index = 0;
    }

    function handleBackspace() {
        if (index > 0) {
            const preBlock = document.querySelector(`.board-block[data-index='${attempts}${index - 1}']`);
            preBlock.innerText = '';
        }

        if (index !== 0) index--;
    }

    function gameover() {
        displayGameover();
        clearInterval(timer);
        window.removeEventListener('keydown', handleKeydowm);
    }

    async function handleEnterKey() {
        let 맞은_갯수 = 0;
        const 응답 = await fetch('/answer');
        const 정답 = await 응답.json();

        for (let i = 0; i < 5; i++) {
            const block = document.querySelector(`.board-block[data-index='${attempts}${i}']`);
            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];
            const keyBlock = document.querySelector(`.key-block[data-key='${입력한_글자}']`);

            setTimeout(() => {
                block.classList.remove('pop');
                void block.offsetWidth;
                block.classList.add('pop');

                if (입력한_글자 === 정답_글자) {
                    맞은_갯수++;
                    block.style.background = 'rgb(106, 170, 100)';
                    if (keyBlock) {
                        keyBlock.style.background = 'rgb(106, 170, 100)';
                        keyBlock.style.color = 'white';
                    }
                } else if (정답.includes(입력한_글자)) {
                    block.style.background = 'rgb(201, 180, 88)';
                    if (keyBlock && keyBlock.style.background !== 'rgb(106, 170, 100)') {
                        keyBlock.style.background = 'rgb(201, 180, 88)';
                        keyBlock.style.color = 'white';
                    }
                } else {
                    block.style.background = 'rgb(120, 124, 126)';
                    if (keyBlock) {
                        const currentColor = keyBlock.style.background;
                        if (currentColor !== 'rgb(106, 170, 100)' && currentColor !== 'rgb(201, 180, 88)') {
                            keyBlock.style.background = 'rgb(120, 124, 126)';
                            keyBlock.style.color = 'white';
                        }
                    }
                }

                block.style.color = 'white';
            }, i * 100);
        }

        setTimeout(() => {
            if (맞은_갯수 === 5) gameover();
            else nextLine();
        }, 5 * 100 + 100);
    }

    function handleKeydowm(event) {
        const key = event.key;
        const keyCode = event.keyCode;

        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);

        if (event.keyCode === 8) handleBackspace();
        else if (index === 5) {
            if (event.key === 'Enter') handleEnterKey();
            else return;
        } else if (65 <= keyCode && keyCode <= 90) {
            thisBlock.innerText = key.toUpperCase();
            index++;
        }

        //console.log(event.key, event.keyCode);
    }

    function startTimer() {
        const 시작_시간 = new Date();

        function setTime() {
            const 현재_시간 = new Date();
            const 흐른_시간 = new Date(현재_시간 - 시작_시간);

            const 분 = 흐른_시간.getMinutes().toString().padStart(2, '0');
            const 초 = 흐른_시간.getSeconds().toString().padStart(2, '0');

            const timeDiv = document.querySelector('.timer');

            timeDiv.innerText = `${분}:${초}`;
        }

        timer = setInterval(setTime, 1000);
        console.log(timer);
    }

    function handleKeyInput(key) {
        if (index < 5) {
            const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);
            thisBlock.innerText = key;
            index++;
        }
    }

    document.querySelectorAll('.key-block').forEach((key) => {
        key.addEventListener('click', () => {
            const keyValue = key.dataset.key;

            if (keyValue === 'ENTER') {
                let filledCount = 0;
                for (let i = 0; i < 5; i++) {
                    const block = document.querySelector(`.board-block[data-index='${attempts}${i}']`);
                    if (block && block.innerText !== '') filledCount++;
                }
                if (filledCount === 5) handleEnterKey();
            } else if (keyValue === 'backspace') {
                handleBackspace();
            } else if (/^[A-Z]$/.test(keyValue)) {
                handleKeyInput(keyValue);
            }
        });
    });

    startTimer();
    window.addEventListener('keydown', handleKeydowm);
}

appStart();
