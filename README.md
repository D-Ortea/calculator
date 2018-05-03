Calculator
==========

Objective
----------
This project is an implementation of a calculator, with a GUI that provides a mouse based and a keyboard based option.

Current status
--------------

There are two types of calculators currently implemented.
* A standard calculator, with only some basic functions, namely:
  * Square root
  * Square
  * Inverse
  * Modulo operation
  * Negate
  * Basic arithmetic functions add, subtract, multiply and divide
* A scientific calculator with a wide variety of functions, namely:
  * All functions included in the standard calculator
  * Power
  * N root
  * Cube
  * Sine, cosine and tangent and their inverses
  * Powers of ten
  * Exponent (x * 10 ^ y)
  * Eulers number power (e ^ x)
  * Logarithms in base 10 and e.
  * Factorial
  * The constant PI

Notes
-----
The way the calculator works is by using a stack as a data structure that takes into account the precedence of the operations in order to respect mathematics operation order.
As of now the unary operations are not being evaluated in the same way due to the way the calculator operates, in which unary operations are displayed to be operated by other unary functions and are not pushed into the stack until a n-ary function key is pressed or the equals key.


From the Odin project's [curriculum](https://www.theodinproject.com/courses/web-development-101/lessons/calculator?ref=lnav "The Odin Project")