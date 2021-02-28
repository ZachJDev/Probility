# Results of deckOfCardsExample.js:

(slightly edited for better Markdown formatting)

Because a deck's deal() method essentially removes it from the choice pool, we should expect
that testing that function will return equal probability for each card:

 (iteration index) |  Key  |    Values    
:---:|---|---
|         0         | '9♣'  | '100 / 5200' |
|         1         | '3♦'  | '100 / 5200' |
|         2         | 'J♦'  | '100 / 5200' |
|         3         | '10♣' | '100 / 5200' |
|         4         | '8♦'  | '100 / 5200' |
|         5         | 'J♣'  | '100 / 5200' |
|         6         | '7♣'  | '100 / 5200' |
|         7         | 'K♦'  | '100 / 5200' |
|         8         | '4♥'  | '100 / 5200' |
|         9         | '5♦'  | '100 / 5200' |
|        10         | '2♣'  | '100 / 5200' |
|        11         | 'K♣'  | '100 / 5200' |
|        12         | '5♣'  | '100 / 5200' |
|        13         | '9♥'  | '100 / 5200' |
|        14         | 'K♠'  | '100 / 5200' |
|        15         | '9♠'  | '100 / 5200' |
|        16         | '2♠'  | '100 / 5200' |
|        17         | '7♠'  | '100 / 5200' |
|        18         | 'J♠'  | '100 / 5200' |
|        19         | '4♦'  | '100 / 5200' |
|        20         | '7♥'  | '100 / 5200' |
|        21         | '3♣'  | '100 / 5200' |
|        22         | '2♦'  | '100 / 5200' |
|        23         | '10♠' | '100 / 5200' |
|        24         | '6♥'  | '100 / 5200' |
|        25         | '4♠'  | '100 / 5200' |
|        26         | '5♥'  | '100 / 5200' |
|        27         | '3♥'  | '100 / 5200' |
|        28         | 'A♣'  | '100 / 5200' |
|        29         | '5♠'  | '100 / 5200' |
|        30         | 'A♦'  | '100 / 5200' |
|        31         | '6♠'  | '100 / 5200' |
|        32         | '4♣'  | '100 / 5200' |
|        33         | 'Q♦'  | '100 / 5200' |
|        34         | 'A♠'  | '100 / 5200' |
|        35         | 'Q♣'  | '100 / 5200' |
|        36         | 'Q♠'  | '100 / 5200' |
|        37         | 'Q♥'  | '100 / 5200' |
|        38         | 'K♥'  | '100 / 5200' |
|        39         | '8♠'  | '100 / 5200' |
|        40         | '6♦'  | '100 / 5200' |
|        41         | '7♦'  | '100 / 5200' |
|        42         | '9♦'  | '100 / 5200' |
|        43         | '10♥' | '100 / 5200' |
|        44         | 'J♥'  | '100 / 5200' |
|        45         | '2♥'  | '100 / 5200' |
|        46         | 'A♥'  | '100 / 5200' |
|        47         | '6♣'  | '100 / 5200' |
|        48         | '8♣'  | '100 / 5200' |
|        49         | '10♦' | '100 / 5200' |
|        50         | '8♥'  | '100 / 5200' |
|        51         | '3♠'  | '100 / 5200' |


However, testing the chooseAndReplace() method will return close to, but not exactly the same probabilities:


 iteration index |  Key  |    Values    
:---:|---|---
|         0         | '8♦'  | '101 / 5200' |
|         1         | '3♥'  | '101 / 5200' |
|         2         | '7♣'  | '105 / 5200' |
|         3         | '10♥' | '105 / 5200' |
|         4         | '3♠'  | '110 / 5200' |
|         5         | '4♠'  | '115 / 5200' |
|         6         | '4♣'  | '104 / 5200' |
|         7         | '7♥'  | '119 / 5200' |
|         8         | '5♠'  | '94 / 5200'  |
|         9         | '3♣'  | '102 / 5200' |
|        10         | 'Q♦'  | '119 / 5200' |
|        11         | 'J♦'  | '111 / 5200' |
|        12         | 'Q♥'  | '82 / 5200'  |
|        13         | '4♥'  | '121 / 5200' |
|        14         | '6♠'  | '101 / 5200' |
|        15         | 'K♦'  | '79 / 5200'  |
|        16         | 'A♦'  | '92 / 5200'  |
|        17         | '6♣'  | '96 / 5200'  |
|        18         | '5♥'  | '98 / 5200'  |
|        19         | '2♥'  | '111 / 5200' |
|        20         | '2♠'  | '115 / 5200' |
|        21         | '9♥'  | '78 / 5200'  |
|        22         | '2♣'  | '110 / 5200' |
|        23         | '7♠'  | '124 / 5200' |
|        24         | 'K♣'  | '101 / 5200' |
|        25         | '7♦'  | '80 / 5200'  |
|        26         | '8♥'  | '101 / 5200' |
|        27         | '6♦'  | '96 / 5200'  |
|        28         | 'A♠'  | '97 / 5200'  |
|        29         | '9♦'  | '95 / 5200'  |
|        30         | 'J♥'  | '106 / 5200' |
|        31         | '10♣' | '94 / 5200'  |
|        32         | '9♣'  | '98 / 5200'  |
|        33         | 'J♠'  | '93 / 5200'  |
|        34         | 'Q♠'  | '110 / 5200' |
|        35         | '10♠' | '101 / 5200' |
|        36         | '2♦'  | '96 / 5200'  |
|        37         | 'K♥'  | '102 / 5200' |
|        38         | 'K♠'  | '104 / 5200' |
|        39         | '8♣'  | '117 / 5200' |
|        40         | '8♠'  | '109 / 5200' |
|        41         | '3♦'  | '92 / 5200'  |
|        42         | '6♥'  | '87 / 5200'  |
|        43         | '5♦'  | '95 / 5200'  |
|        44         | 'A♣'  | '86 / 5200'  |
|        45         | '4♦'  | '71 / 5200'  |
|        46         | '9♠'  | '116 / 5200' |
|        47         | '5♣'  | '91 / 5200'  |
|        48         | 'Q♣'  | '99 / 5200'  |
|        49         | '10♦' | '79 / 5200'  |
|        50         | 'A♥'  | '88 / 5200'  |
|        51         | 'J♣'  | '103 / 5200' |

We can use probabilityOf() to find the number of aces in the deck:
There are 4 / 52 in the deck, or a 1 / 13 chance of choosing one.

We can also use enumeration to find the chance of pulling two aces:

With Replacing the card, we have a 1 / 169 chance of pulling two aces in a row.
Without Replacing, we have a 1 / 221 chance of pulling two aces in a row.

But one thing to remember is that enumerating probability spaces this way can become resource hungry very quickly.
Sometimes it's better to calculate the probabilities directly with the Rational Number objects that represent probabilities in this library.

One more thing to try: call the new StdDeck() constructor with the `hasJokers` parameter as `true`, and see how the numbers change.
