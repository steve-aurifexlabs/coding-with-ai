#include <stdio.h>
#include <stdlib.h>
#include <math.h>

// Function prototypes for the RISC-V assembly functions
double cos_Taylor_div(double x);
double cos_Taylor_shift(double x);

int main(int argc, char *argv[])
{
    int i, n;

    // Parse the number of test cases from the command line arguments
    if (argc != 2 || (n = atoi(argv[1])) <= 0) {
        fprintf(stderr, "Usage: %s n (where n is the number of test cases)\n", argv[0]);
        return 1;
    }

    // Generate and test n random numbers
    for (i = 0; i < n; i++) {
        double x = (double)rand() / RAND_MAX * 2 * M_PI;   // generate a random angle in the range [0, 2*pi]
        double cos_div = cos_Taylor_div(x);                // compute the cosine using the RISC-V assembly function with divisions
        double cos_shift = cos_Taylor_shift(x);            // compute the cosine using the RISC-V assembly function with shifts
        double cos_lib = cos(x);                           // compute the cosine using the math.h library function
        printf("x = %.6f, cos_div = %.6f, cos_shift = %.6f, cos_lib = %.6f\n", x, cos_div, cos_shift, cos_lib);
    }

    return 0;
}
