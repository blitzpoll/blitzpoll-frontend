Blitzpoll
==========

##What we're building##
A browser application to gather and display live opinions and emotions during football matches. Users are promted to give their opinion on a number of questions throughout the game, related to an on-pitch event, each to be answered within a couple of minutes.

A running prototype will be tested during the Champions League Final 2014 between Real Madrid and Atletico Madrid.

Examples of questions:
- Who do you think will win the game?
- Do you think the game will go into overtime?
- Was this really a penalty-worthy foul?
- Did player X deserve to be sent off?
- How do you like player Y's performance today?

Before answering the first question, the user is prompted to enter which team s/he supports. This information is then used in the data visualisation to differenciate between answers from supporters of team A and team B.

##Minimal viable product##
- One question type
- One visualisation type
- Editors can enter and push questions
- Questions have a countdown, after which they are closed (no more votes accepted)
- Users can answer questions and see results
- Overview of all results (open, closed)
 
##Data model##

###Game###
|field|description|type|
|----|-----------|----|
|gameId|Unique id of the game|number|
|hometeam|Name of the home team|string|
|awayteam|Name of the away team|string|
|date|Date when the game takes place|date|
|homePlayers|All players of the home team (not needed for minimal viable product)|array|
|awayPlayers|All players of the away team (not needed for minimal viable product)|array|
|homeEmblem|Image of the home team's club emblem|img|
|awayEmblem|Image of the away team's club emblem|img|

###Question###
|field|description|type|
|----|-----------|----|
|gameId|Id of the game so we know which game the question relates to|id|
|questionId|Unique id of the question|id|
|type|type of question being asked (eg Yes/No, Rating, 4-Answer-Options, etc.|string|
|question|Text of the actual question being asked|string|
|answerOptions|Answer options avaiable for this question|object|
|countdown|Number of minutes this question will be open after it's published|number|
|image|Background image for the question (optional)|img|


##Backend##





##Frontend##

The frontend has two views: Vote and view.

Vote
- List of open questions ordered by recency (latest question on top)
For each question:
- Question
- Countdown
- Voting options
- Result visualisation

View
- List of all visualisations of the current game ordered by recency (latest question on top)

(Archive)
- Link to a list of all games, latest on top


##Feature ideas for further development##
- More question and visualisation types
- embeddable visualisations (for match coverage)
- generalise for use with any sports that has two opponents (boxing, tennis, basketball, baseball, ...)
- show upcoming games in the list, let users answer questions before the game starts




 






