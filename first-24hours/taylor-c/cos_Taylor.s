.section .text
.globl cos_Taylor_div

        # Compute the approximation using the 5th degree Taylor series for cos(x)
        # cos(x) ≈ 1 - (x^2)/2! + (x^4)/4! - (x^6)/6! + (x^8)/8!
cos_Taylor_div:
        li  t0, 1           # t0 = 1
        mul t1, a0, a0      # t1 = x^2 (using the argument register a0)
        div t1, t1, 2       # t1 = (x^2)/2
        sub t0, t0, t1      # t0 = 1 - (x^2)/2
        mul t1, t1, a0      # t1 = x^3
        mul t1, t1, a0      # t1 = x^4
        div t1, t1, 24      # t1 = (x^4)/4!
        add t0, t0, t1      # t0 = 1 - (x^2)/2 + (x^4)/4!
        mul t1, t1, a0      # t1 = x^5
        mul t1, t1, a0      # t1 = x^6
        div t1, t1, 720     # t1 = (x^6)/6!
        sub t0, t0, t1      # t0 = 1 - (x^2)/2 + (x^4)/4! - (x^6)/6!
        mul t1, t1, a0      # t1 = x^7
        mul t1, t1, a0      # t1 = x^8
        div t1, t1, 40320   # t1 = (x^8)/8!
        add t0, t0, t1      # t0 = 1 - (x^2)/2 + (x^4)/4! - (x^6)/6! + (x^8)/8!

        # Store the result in the designated return value register
        mv  a0, t0

        ret

.globl cos_Taylor_shift

cos_Taylor_shift:
        # Save the callee-saved registers
        addi sp, sp, -8
        sw ra, 0(sp)
        sw s1, 4(sp)

        # Compute the approximation using the 5th degree Taylor series for cos(x)
        # cos(x) ≈ 1 - (x^2)/2! + (x^4)/4! - (x^6)/6! + (x^8)/8!
        li  s1, 1           # s1 = 1
        mul t0, a0, a0      # t0 = x^2
        sra t0, t0, 1       # t0 = (x^2)/2 (using shift right arithmetic)
        sub s1, s1, t0      # s1 = 1 - (x^2)/2
        mul t0, t0, a0      # t0 = x^3
        mul t0, t0, a0      # t0 = x^4
        sra t0, t0, 4       # t0 = (x^4)/4! (using shift right arithmetic)
        add s1, s1, t0      # s1 = 1 - (x^2)/2 + (x^4)/4!
        mul t0, t0, a0      # t0 = x^5
        mul t0, t0, a0      # t0 = x^6
        sra t0, t0, 6       # t0 = (x^6)/6! (using shift right arithmetic)
        sub s1, s1, t0      # s1 = 1 - (x^2)/2 + (x^4)/4! - (x^6)/6!
        mul t0, t0, a0      # t0 = x^7
        mul t0, t0, a0      # t0 = x^8
        sra t0, t0, 8       # t0 = (x^8)/8! (using shift right arithmetic)
        add s1, s1, t0      # s1 = 1 - (x^2)/2 + (x^4)/4! - (x^6)/6! + (x^8)/8!

        # Restore the callee-saved registers and return the result
        lw ra, 0(sp)
        lw s1, 4(sp)
        addi sp, sp, 8
        mv  a0, s1
        ret