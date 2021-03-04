We've created two classes of urns: one that, when picked from, adds another ball of the same type that was picked. The
second type does the opposite: it adds another ball of the type NOT picked after each pick.

If we test these two urns, we'll see that the distribution of the balls in the first urn get further apart the more
balls are picked:

| (iteration index) |     Key      |     Values     |
:---:| ---|---|
|         0         |  'Red Ball'  | '3102 / 10000' |
|         1         | 'Green Ball' | '6898 / 10000' |

But the distribution of the balls in the second urn stay relatively close to one another:

| (iteration index) |     Key      |     Values     |
:---:| ---|---|
|         0         |  'Red Ball'  | '5026 / 10000' |
|         1         | 'Green Ball' | '4974 / 10000' |

we can describe the same phenomenon by passing in two different functions instead of two different balls. Here we use
the same kinds of urns, but instead of balls we have a function that adds one to a number and a function that subtracts
one from a number. When we call this repeatedly on a variable, we essentially measure how many more times one function
was called than the other.

With our converging urn that makes the non-chosen function more likely to be called, we see that the number is close to
(but probably not exactly) 0. In our test, after choosing 10000 times, we got 42.

Conversely, we can assume that after choosing from the diverging urn, which makes each pick more likely in the future,
our counter will be further away from zero than in the other urn. After choosing 10000 times, we got -1164. That means
that one function was called 1164 times more than the other.
