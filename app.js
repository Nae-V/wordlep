const 정답 = 'APPLE';

let attempts = 0;
let index = 0;

function appStart() {
    function nextLine() {
        attempts++;
        if (attempts === 6) return gameover();
        index = 0;
    }

    function gameover() {
        window.removeEventListener('keydown', handleKeydowm);
    }

    function handleEnterKey() {
        let 맞은_갯수 = 0;
        for (let i = 0; i < 5; i++) {
            const block = document.querySelector(`.board-block[data-index='${attempts}${i}']`);

            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];

            if (입력한_글자 === 정답_글자) {
                맞은_갯수 += 1;
                block.style.background = '#6AAA64';
            } else if (정답.includes(입력한_글자)) {
                block.style.background = '#C9B458';
            } else block.style.background = '#787c7e';

            block.style.color = 'white';
        }
        if (맞은_갯수 === 5) gameover();
        else nextLine();
    }

    function handleKeydowm(event) {
        const key = event.key;
        const keyCode = event.keyCode;

        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);

        if (index === 5) {
            if (event.key === 'Enter') handleEnterKey();
            else return;
        } else if (65 <= keyCode && keyCode <= 90) {
            thisBlock.innerText = key.toUpperCase();
            index++;
        }

        // console.log(event.key, event.keyCode);
    }

    window.addEventListener('keydown', handleKeydowm);
}

appStart();
