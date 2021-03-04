# Results of diceExample.js:

(Slightly edited for Markdown formatting. Actual results may differ for some functions)

Results of rolling a die 600000 times:

| (iteration index) | Key |      Values       |
:---:|---|---|
|         0         |  3  | '99541 / 600000'  |
|         1         |  6  | '99553 / 600000'  |
|         2         |  1  | '99588 / 600000'  |
|         3         |  4  | '99976 / 600000'  |
|         4         |  2  | '100323 / 600000' |
|         5         |  5  | '101019 / 600000' |

Actual Probabilities of each number appearing in a single roll:

| (iteration index) | Key | Values  |
|:---:|---|---|
|         0         |  1  | '1 / 6' |
|         1         |  2  | '1 / 6' |
|         2         |  3  | '1 / 6' |
|         3         |  4  | '1 / 6' |
|         4         |  5  | '1 / 6' |
|         5         |  6  | '1 / 6' |

A more complex test: Roll three dice. If the second die is even, add all three together. If it is not, add the first two
dice for a score. Results of Test:

| (iteration index) | Key |      Values      |
:---:|---|---|
|         0         | 18  |  '971 / 216000'  |
|         1         | 17  | '2021 / 216000'  |
|         2         | 16  | '3959 / 216000'  |
|         3         | 15  | '5935 / 216000'  |
|         4         |  3  | '5961 / 216000'  |
|         5         |  2  | '6026 / 216000'  |
|         6         | 14  | '8815 / 216000'  |
|         7         | 13  | '12153 / 216000' |
|         8         | 12  | '12953 / 216000' |
|         9         |  4  | '12962 / 216000' |
|        10         |  5  | '14018 / 216000' |
|        11         | 10  | '19116 / 216000' |
|        12         | 11  | '20060 / 216000' |
|        13         |  8  | '21052 / 216000' |
|        14         |  6  | '21865 / 216000' |
|        15         |  9  | '23917 / 216000' |
|        16         |  7  | '24216 / 216000' |

Results of enumeration:

| (iteration index) | Key |   Values   |
:---:|---|---
|         0         | 18  | '1 / 216'  |
|         1         | 17  | '2 / 216'  |
|         2         | 16  | '4 / 216'  |
|         3         |  2  | '6 / 216'  |
|         4         |  3  | '6 / 216'  |
|         5         | 15  | '6 / 216'  |
|         6         | 14  | '9 / 216'  |
|         7         | 13  | '12 / 216' |
|         8         |  4  | '13 / 216' |
|         9         | 12  | '13 / 216' |
|        10         |  5  | '14 / 216' |
|        11         | 10  | '19 / 216' |
|        12         | 11  | '20 / 216' |
|        13         |  8  | '21 / 216' |
|        14         |  6  | '22 / 216' |
|        15         |  7  | '24 / 216' |
|        16         |  9  | '24 / 216' |

Using functions as choices:

With a loudCoin, which tells us to whisper or a yell a word, and a wordD6, which gives us the name of a face we can call
loudCoin.flip()(wordD6.roll()) to be given a yelled or whispered face name: three

| (iteration index) |   Key   |  Values  |
---|---|---
|         0         |  'ONE'  | '1 / 12' |
|         1         |  'one'  | '1 / 12' |
|         2         |  'TWO'  | '1 / 12' |
|         3         |  'two'  | '1 / 12' |
|         4         | 'THREE' | '1 / 12' |
|         5         | 'three' | '1 / 12' |
|         6         | 'FOUR'  | '1 / 12' |
|         7         | 'four'  | '1 / 12' |
|         8         | 'FIVE'  | '1 / 12' |
|         9         | 'five'  | '1 / 12' |
|        10         |  'SIX'  | '1 / 12' |
|        11         |  'six'  | '1 / 12' |

