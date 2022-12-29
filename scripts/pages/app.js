class App {
    constructor(){
        
      $('.slick-container').slick({
          autoplay: true,
         autoplaySpeed: 2000,
         dots: true,
        infinite: true,
      });
       const {bird, minesweeper} =store.getSettings()
       document.getElementById("num_games").innerText=bird.games
       document.getElementById("max_score").innerText=bird.max
       document.getElementById("last_score").innerText=bird.last
       document.getElementById("bird_last_date").innerText=bird.lastDate
       document.getElementById("bird_level").innerText=bird.level


       document.getElementById("win_games").innerText=minesweeper.win
       document.getElementById("lose_score").innerText=minesweeper.lose
       document.getElementById("last_game").innerText=minesweeper.last
       document.getElementById("minesweeper_last_date").innerText=minesweeper.lastDate
       document.getElementById("minesweeper_level").innerText=minesweeper.level

    }

   

}
const app = new App()
