# Calculator Specs

1. The calculator must support at least the following operations: +, -, \*(multiplication), /, \**(exponentiation), sqrt.
2. Calculations may be performed on the server (preferred ruby on rails) or the client side.  However, no reloading of the page is allowed.
3. The calculator must store the last 10 calculations performed by the user.  The list of calculations must survive a refresh but not necessarily a cookie clear.  The list should be tied to the browser that performed the calculation.  In other words, if a user performs a calculation on Browser A, and then performs a calculation on Browser B, when the app is accessed from Browser A only calculations performed from Browser A should appear and vice versa.
4. The calculator should be able to handle arbitrary precision floats(a "BigDecimal" type).
5. Aesthetics are important but not as important as satisfying the criteria listed above. 
