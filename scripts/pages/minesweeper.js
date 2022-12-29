class Minesweeper {
    grid = null;
    flagsLeft = null;
    result = null;
    width = 10;
    bombAmount = 20;
    flags = 0;
    squares = []
    isGameOver = false
    dynamicArray=[]
    gridWidth=80
    constructor({level}) {
        let  width=10
        let bombAmount =20
        if(level ===1) {width=6; bombAmount =6}
        if(level ===3) {width=15; bombAmount =25}

        this.grid = document.querySelector('.grid')
        this.flagsLeft = document.querySelector('#flags-left')
        this.result = document.querySelector('#result')
        this.width = width
        this.bombAmount = bombAmount
        this.flags = 0
        this.squares = []
        this.isGameOver = false
        this.dynamicArray =[0,width-1,width-1,width-1,width*width-2,(width*width) -width,(width*width)-width-1,(width*width)-width]
        document.getElementById("myStyle").innerText=`.grid{ font-size:${Math.floor(this.gridWidth/width)}vmin;  grid-template-columns: repeat(${width},1fr);} .grid div{width:${Math.floor(this.gridWidth/width)}vmin;height:${Math.floor(this.gridWidth/width)}vmin}`
        document.getElementById("newGame").addEventListener('click',this.newGame)
        this.init()
    }

    init = () => {
        this.flagsLeft.innerHTML = this.bombAmount
        //מערך של מספר הפצצות
        const bombsArray = Array(this.bombAmount).fill('bomb')
        //מערך של יתרת השדות לפי הרוחב
        const emptyArray = Array(this.width * this.width - this.bombAmount).fill('valid')
        //איחוד של המערכים
        const gameArray = emptyArray.concat(bombsArray)
        //ערבול המערכים
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5)
        let that = this;
        for (let i = 0; i < this.width * this.width; i++) {
            const square = document.createElement('div')
            square.setAttribute('id', i)
            square.classList.add("square")
            square.classList.add(shuffledArray[i])
            this.grid.appendChild(square)
            this.squares.push(square)
           
            //normal click
            square.addEventListener('click',()=>that.click(square))

            //cntrl and left click
            square.oncontextmenu = function (e) {
                e.preventDefault()
                that.addFlag(square)
            }
        }
       

        //add numbers
        for (let i = 0; i < this.squares.length; i++) {
            let total = 0
            const isLeftEdge = (i % this.width === 0)
            isLeftEdge&&this.squares[i].classList.add("left")
            const isRightEdge = (i % this.width === this.width - 1)
            isRightEdge&&this.squares[i].classList.add("right")
            if (this.squares[i].classList.contains('valid')) {
                //4
                if (/*i > this.dynamicArray[0] &&*/ !isLeftEdge && this.squares[i - 1].classList.contains('bomb')) total++
                //9
                if (i > this.dynamicArray[1] && !isRightEdge && this.squares[i + 1 - this.width].classList.contains('bomb')) total++
                //8
                if (i > this.dynamicArray[2] && this.squares[i - this.width].classList.contains('bomb')) total++
                //7
                if (i > this.dynamicArray[3] && !isLeftEdge && this.squares[i - 1 - this.width].classList.contains('bomb')) total++
                //6
                if (/*i < this.dynamicArray[4] &&*/ !isRightEdge && this.squares[i + 1].classList.contains('bomb')) total++
                //1
                if (i < this.dynamicArray[5] && !isLeftEdge && this.squares[i - 1 + this.width].classList.contains('bomb')) total++
                //3
                if (i < this.dynamicArray[6] && !isRightEdge && this.squares[i + 1 + this.width].classList.contains('bomb')) total++
                //2
                if (i < this.dynamicArray[7] && this.squares[i + this.width].classList.contains('bomb')) total++
                this.squares[i].setAttribute('data', total)
                //temp
                //this.squares[i].innerHTML = total
                this.squares[i].classList.add(`c-${total}`)
            }
        }

    }
    //click on square actions
    click = (square) => {
        let currentId = square.getAttribute("id")
        if (this.isGameOver) return
        if (square.classList.contains('checked') || square.classList.contains('flag')) return
        if (square.classList.contains('bomb')) {
            this.gameOver(square)
        } else {
            let total = square.getAttribute('data')
            if (total != 0) {
                square.classList.add('checked')
                square.innerHTML = total
                return
            }
            this.checkSquare(square, currentId)
        }
        square.classList.add('checked')
    }

    //add Flag with right click
    addFlag = (square) => {
        if (this.isGameOver) return
        if (!square.classList.contains('checked') && (this.flags < this.bombAmount)) {
            if (!square.classList.contains('flag')) {
                square.classList.add('flag')
                square.innerHTML = ' 🚩'
                this.flags++
                this.flagsLeft.innerHTML = this.bombAmount - this.flags
                this.checkForWin()
            } else {
                square.classList.remove('flag')
                square.innerHTML = ''
                this.flags--
                this.flagsLeft.innerHTML = this.bombAmount - this.flags
            }
        }
    }

   
    //check neighboring squares once square is clicked
    checkSquare = (square, currentId) => {
        const isLeftEdge = (currentId % this.width === 0)
        const isRightEdge = (currentId % this.width === this.width - 1)

        setTimeout(() => {
            if (/*currentId > this.dynamicArray[0] &&*/ !isLeftEdge) {
                const newId = this.squares[parseInt(currentId) - 1].id
                //const newId = parseInt(currentId) - 1   ....refactor
                const newSquare = document.getElementById(newId)
                this.click(newSquare)
            }
            if (currentId > this.dynamicArray[1] && !isRightEdge) {
                const newId = this.squares[parseInt(currentId) + 1 - this.width].id
                //const newId = parseInt(currentId) +1 -this.width   ....refactor
                const newSquare = document.getElementById(newId)
                this.click(newSquare)
            }
            if (currentId > this.dynamicArray[2]) {
                const newId = this.squares[parseInt(currentId - this.width)].id
                //const newId = parseInt(currentId) -this.width   ....refactor
                const newSquare = document.getElementById(newId)
                this.click(newSquare)
            }
            if (currentId > this.dynamicArray[3] && !isLeftEdge) {
                const newId = this.squares[parseInt(currentId) - 1 - this.width].id
                //const newId = parseInt(currentId) -1 -this.width   ....refactor
                const newSquare = document.getElementById(newId)
                this.click(newSquare)
            }
            if (/*currentId < this.dynamicArray[4] && */!isRightEdge) {
                const newId = this.squares[parseInt(currentId) + 1].id
                //const newId = parseInt(currentId) +1   ....refactor
                const newSquare = document.getElementById(newId)
                this.click(newSquare)
            }
            if (currentId < this.dynamicArray[5] && !isLeftEdge) {
                const newId = this.squares[parseInt(currentId) - 1 + this.width].id
                //const newId = parseInt(currentId) -1 +this.width   ....refactor
                const newSquare = document.getElementById(newId)
                this.click(newSquare)
            }
            if (currentId < this.dynamicArray[6] && !isRightEdge) {
                const newId = this.squares[parseInt(currentId) + 1 + this.width].id
                //const newId = parseInt(currentId) +1 +this.width   ....refactor
                const newSquare = document.getElementById(newId)
                this.click(newSquare)
            }
            if (currentId < this.dynamicArray[7]) {
                const newId = this.squares[parseInt(currentId) + this.width].id
                //const newId = parseInt(currentId) +this.width   ....refactor
                const newSquare = document.getElementById(newId)
                this.click(newSquare)
            }
        }, 10)
    }

    //game over
    gameOver = (square) => {
        this.result.innerHTML = 'BOOM! Game Over!'
        this.isGameOver = true
        store.addMineSweeperWinLose(0)
        //show ALL the bombs
        this.squares.forEach(square => {
            if (square.classList.contains('bomb')) {
                square.innerHTML = '💣'
                square.classList.remove('bomb')
                square.classList.add('checked')
            }
        })
    }

    newGame =()=>{
        this.flags = 0
        this.squares = []
        this.isGameOver = false
        this.grid.innerHTML=""
        this.flagsLeft.innerHTML=""
        this.result.innerHTML=""
        this.init()
    }

    //check for win
    checkForWin = () => {
        ///simplified win argument
        let matches = 0

        for (let i = 0; i < this.squares.length; i++) {
            if (this.squares[i].classList.contains('flag') && this.squares[i].classList.contains('bomb')) {
                matches++
            }
            if (matches === this.bombAmount) {
                this.result.innerHTML = 'YOU WIN!'
                this.isGameOver = true
                store.addMineSweeperWinLose(1)
                break;
            }
        }
    }



}

const minesweeper = new Minesweeper(store.getSettings().minesweeper)