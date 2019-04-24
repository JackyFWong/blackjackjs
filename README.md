# blackjackjs
A simple implementation of a 1 player game of Blackjack in JavaScript.

This is made for a project in GC 3400 at Clemson University, Spring 2019.

This is also my first JavaScript project, so it is not optimal whatsoever.

### About the game
As the website states, you play against one computer opponent. This game has some modified rules:
- Ace is only worth 1 point
- There is no dealer
- You always go first
- Only actions are to stand or hit. No doubling, splitting, or surrendering
- Opponent can stand at each of your hits

Get to 21 as close as possible.

The computer "opponent" uses a simple function that decides whether to stand. The likelihood 
for it to stand is inversely proportional to its score (bigger score = less likely).
