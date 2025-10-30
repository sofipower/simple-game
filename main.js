//랜덤번호 지정, 정답이 뭔지 지정
//유저가 번호를 입력한다. 그리고 go라는 버튼을 누름
//만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//랜덤번호가 < 유저번호보다 작다 그럼 Down!!!
//랜덤번호가 > 유저번호보다 크다 Up!!!
//Reset 버튼을 누르면 게임이 리셋된다
//5번 기회를 다 쓰면 게임이 끝난다 (더이상 추측불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력하면, 알려준다, 기회를 깎지않는다
//유저가 이미 입력한 숫자를 또 입력하면(히스토리를 알아야함), 알려준다, 기회를 깎지않는다

let computerNum =0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5
let gameOver = false
let chanceArea = document.getElementById("chance-area");
let history = []

playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset)
userInput.addEventListener("focus",function(){userInput.value=""})

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100)+1;
    console.log("정답",computerNum);
}

function play(){
    let userValue = userInput.value;

    if(userValue<1 || userValue>100){
        resultArea.textContent="1과 100사이 숫자를 입력해주세요"
        return;
    }

    if(history.includes(userValue)){
        resultArea.textContent="이미 입력한 숫자입니다. 다른 숫자를 입력해주세요"
        return;
    }


    chances -- ;
    chanceArea.textContent = `남은기회: ${chances}번`;
    console.log("chance",chances)


    if(userValue < computerNum){
        resultArea.textContent = "UP!!!";
    }else if(userValue > computerNum){
        resultArea.textContent = "DOWN!!!";
    }else {
        resultArea.textContent = "정답!!!";
        gameOver=true
    }
    
    history.push(userValue)
    console.log(history)
    
    
    if(chances <1){
        gameOver=true
    }

    if(gameOver == true){
        playButton.disabled = true
    }
}

function reset(){
    //user.input창이 깨끗하게 정리되고
    userInput.value = ""
    //새로운 번호가 생성됨
    pickRandomNum()
      // 결과 영역 초기화
    resultArea.textContent = "결과값이 여기 나옵니다!";
    // 남은 기회를 다시 5로 설정
    chances = 5;
    chanceArea.textContent = `남은기회: ${chances}번`;
    // 히스토리 초기화
    history = [];
    // 게임 상태 초기화
    gameOver = false;
    // play 버튼 다시 활성화
    playButton.disabled = false;
}
pickRandomNum();

