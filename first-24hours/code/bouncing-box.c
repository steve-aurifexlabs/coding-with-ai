// C
// Generate a C program that draws a bouncing box using raylib
// https://www.raylib.com/cheatsheet/cheatsheet.html

#include "raylib.h"

// Define the Vector2 struct
struct Vector2 {
    float x;
    float y;
};

// Define box size and speed
#define BOX_SIZE    (Vector2) { 50, 50 }
#define BOX_SPEED   (Vector2) { 4, 4 }

int main(void)
{
    // Initialize raylib
    const int screenWidth = 800;
    const int screenHeight = 450;
    InitWindow(screenWidth, screenHeight, "Bouncing Box");

    // Create a box
    struct Vector2 position = (Vector2) {
        (float)screenWidth/2, (float)screenHeight/2
    };
    struct Vector2 size = BOX_SIZE;
    Vector2 speed = BOX_SPEED;
    Color color = MAROON;

    // Main game loop
    while (!WindowShouldClose())    // Detect window close button or ESC key
    {
        // Update
        if (position.x + size.x >= screenWidth || position.x <= 0)
            speed.x *= -1;

        if (position.y + size.y >= screenHeight || position.y <= 0)
            speed.y *= -1;

        position.x += speed.x;
        position.y += speed.y;

        // Draw
        BeginDrawing();

            ClearBackground(RAYWHITE);

            DrawRectangleV(position, size, color);

        EndDrawing();
    }

    // Close window and OpenGL context
    CloseWindow();

    return 0;
}