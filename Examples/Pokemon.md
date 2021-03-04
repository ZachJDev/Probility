The chance to escape algorithm in the Pokemon Series of games can be implemented with Probility as well.
With a correct implementation of Probility, we can calculate how likely a pokemon is to escape another and see the chances enumerated.

The algorithm can be found at https://bulbapedia.bulbagarden.net/wiki/Escape. I'll be using Pikachu with a speed stat of 25 and Charizard with a speed stat of 100.
I don't think these numbers are correct, but they mirror the example on the page.

Probility will be used as a random number generator, generating numbers between 0 and 255. Using the .probabilityOf() method,

we can calculate that Pikachu has a 24.21875% chance of escaping Charizard.

We can use frequencyTest() to see how often Pikachu escapes out of 10,000 tries:

| (iteration index) |         Key         |     Values     |
|:-----------------:|---------------------|----------------|
|         0         | 'Pikachu ran away!' | '2336 / 10000' |
|         1         |   "Can't Escape!"   | '7664 / 10000' |

Even though I don't know the numbers as they are exactly, I will guess that Pikachu was able to escape about 2,400 times.

We can also create a chart of successive run attempts, as the chance of success increases as the number of attempts increase:
Attempt #1:

| (iteration index) |         Key         |   Values    |
|:-----------------:|---------------------|-------------|
|         0         | 'Pikachu ran away!' | '62 / 256'  |
|         1         |   "Can't Escape!"   | '194 / 256' |

Attempt #2:

| (iteration index) |         Key         |   Values    |
|:-----------------:|---------------------|-------------|
|         0         | 'Pikachu ran away!' | '92 / 256'  |
|         1         |   "Can't Escape!"   | '164 / 256' |

Attempt #3:

| (iteration index) |         Key         |   Values    |
|:-----------------:|---------------------|-------------|
|         0         | 'Pikachu ran away!' | '122 / 256' |
|         1         |   "Can't Escape!"   | '134 / 256' |

Attempt #4:

| (iteration index) |         Key         |   Values    |
|:-----------------:|---------------------|-------------|
|         0         | 'Pikachu ran away!' | '152 / 256' |
|         1         |   "Can't Escape!"   | '104 / 256' |
