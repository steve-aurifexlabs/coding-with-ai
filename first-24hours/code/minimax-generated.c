// C
// Generate a C program that plays tic-tac-toe using minimax and displays the output like in the movie war games using raylib
// https://www.raylib.com/cheatsheet/cheatsheet.html

#include <stdio.h>
#include <stdlib.h>
#include <raylib.h>

#define BOARD_SIZE 3

// define the number of players
#define PLAYER1 1
#define PLAYER2 -1

// define the scores for each outcome
#define PLAYER1_WINS 10
#define PLAYER2_WINS -10
#define DRAW 0

// define the board
int board[BOARD_SIZE][BOARD_SIZE];

// define the game state
int gameState;

// functions
int minimax(int board[BOARD_SIZE][BOARD_SIZE], int depth, int player);
int checkWinner(int board[BOARD_SIZE][BOARD_SIZE]);
void drawBoard(int board[BOARD_SIZE][BOARD_SIZE]);
void printBoard(int board[BOARD_SIZE][BOARD_SIZE]);
void playMove(int board[BOARD_SIZE][BOARD_SIZE], int row, int col, int player);

int main(void)
{
	// set up the game
	gameState = 0;
	for (int i = 0; i < BOARD_SIZE; i++) 
	{
		for (int j = 0; j < BOARD_SIZE; j++) 
		{
			board[i][j] = 0;
		}
	}
	
	// initialize raylib
	const int screenWidth = 800;
	const int screenHeight = 800;
	InitWindow(screenWidth,screenHeight, "Tic-Tac-Toe");
	
	// game loop
	while (!WindowShouldClose()) 
	{
		// check the game state
		if (gameState == 0) 
		{
			// player 1's turn
			int row, col;
			printf("Player 1's turn. Enter row and column: ");
			scanf("%d %d", &row, &col);
			playMove(board, row, col, PLAYER1);
		}
		else if (gameState == 1) 
		{
			// player 2's turn
			int row = -1, col = -1;
			int bestScore = -100;
			
			// calculate the best move
			for (int i = 0; i < BOARD_SIZE; i++) 
			{
				for (int j = 0; j < BOARD_SIZE; j++) 
				{
					if (board[i][j] == 0) 
					{
						int score = minimax(board, 0, PLAYER2);
						if (score > bestScore) 
						{
							bestScore = score;
							row = i;
							col = j;
						}
					}
				}
			}
			
			playMove(board, row, col, PLAYER2);
		}
		
		// draw the board
		drawBoard(board);
		
		// check for winner or draw
		int winner = checkWinner(board);
		if (winner == PLAYER1) 
		{
			printf("Player 1 wins!\n");
			break;
		}
		else if (winner == PLAYER2) 
		{
			printf("Player 2 wins!\n");
			break;
		}
		else if (winner == DRAW) 
		{
			printf("Draw!\n");
			break;
		}
		
		// switch players
		if (gameState == 0) 
		{
			gameState = 1;
		}
		else 
		{
			gameState = 0;
		}
		
		EndDrawing();
	}
	
	// close raylib window
	CloseWindow();
	
	return 0;
}

// minimax function
int minimax(int board[BOARD_SIZE][BOARD_SIZE], int depth, int player)
{
	int winner = checkWinner(board);
	
	// check for a winner
	if (winner == PLAYER1_WINS) 
	{
		return PLAYER1_WINS - depth;
	}
	else if (winner == PLAYER2_WINS) 
	{
		return PLAYER2_WINS + depth;
	}
	else if (winner == DRAW) 
	{
		return DRAW;
	}
	
	// generate all possible moves
	int bestScore