# Ultimate Tic-Tac-Toe

Ultimate Tic-Tac-Toe is a strategic and interactive version of the classic game. Players compete on a large 3x3 grid of smaller Tic-Tac-Toe boards, aiming to win the overarching "big board" by strategically dominating individual small boards. This game adds complexity and strategy.

---

## Features

- **Dynamic Gameplay:** Players are directed to specific small boards based on their opponent’s last move, adding an exciting layer of strategy.
- **Winner Detection:** Automatic detection of winners for both small boards and the big board, keeping the game seamless.
- **Random Board Selection:** Handles cases where the directed board is already completed by selecting a random playable board.
- **Restart Option:** A "New Game" button allows players to reset and start fresh instantly.

---

## How to Play

1. **Objective:** Win the "big board" by conquering three small boards in a row, column, or diagonal.
2. **Game Mechanics:**
   - The game starts with Player O.
   - The first move can be made on any small board.
   - Subsequent moves are restricted to the small board that corresponds to the position of the previous move.
3. **Winning a Small Board:**
   - Achieve three marks (O or X) in a row, column, or diagonal within a small board.
   - The winner's mark replaces the small board on the big board.
4. **Winning the Big Board:**
   - Win three small boards in a row, column, or diagonal to claim victory in the overall game.

---

## Code Highlights

- **Dynamic Board Generation**:  
The game dynamically generates the small boards using JavaScript, making the code flexible for future updates or scaling.

- **Winner Detection**:  
- The function `checkSmallBoardWinner()` checks for a winner in individual small boards.
- The function `checkBigBoardWinner()` determines the winner of the big board by checking the small boards.

- **Active Board Highlighting**:  
The `highlightBoard()` function visually highlights active and available boards to guide the player's next move.

- **Random Board Selection**:  
If the player is forced to move to a completed board, the game selects a random available board to keep the game fair and fun.

---

---

Enjoy playing **Ultimate Tic-Tac-Toe** game!

