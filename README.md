# Ironhack-Project2-Cardspedia-
<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
 <!-- <a href="https://github.com/DomKal11/Project2-cardspedia/">
    <img src="main/Assets/Images/Others/our_host.png" alt="Logo" width="80" height="80"> -->
  </a>

<h3 align="center">Cardspedia</h3>

  <p align="center">
    A game designed for Project Two of the Ironhack full-stack course
    <br />
    <a href="https://github.com/DomKal11/Project2-cardspedia/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://cardspedia.heroku.com">View Demo</a>
    ·
    <a href="https://github.com/DomKal11/Project2-cardspedia/issues">Report Bug</a>
    ·
    <a href="https://github.com/DomKal11/Project2-cardspedia/issues">Request Feature</a>
  </p>
</div>


<!-- ABOUT THE PROJECT -->
### Description 
Cardspedia is the encyclopedia for card games - an app where people can find and share the instructions and rules for all their favourite games.

Anyone can browse the site and see the library of card games, but to add, vote or comment on a game the user must signup for an account. 

Once logged in the user has the added benefit of being able to add games that they find to their 'favourites'. 


<!-- WIREFRAMES -->
### Wirefrmaes 
...to be added


<!--USER STORIES-->
### User Stories

Personas:
<b>Michael:</b> 60 years old. From time to time, he plays a card game during a family visit. He needs to display the chosen game and study the rules, or show them to others. He doesn't want to add games, he doesn't even want to register, he only plays occasionally.
Michael is an unauthenticated <b>viewer</b>. We need to create views to display the required content without registration and login.
<b>Jennifer:</b> An experienced card games player. She likes to learn new games and also contributes with her own games. She wants to contribute, discuss and also vote for specific games. She also wants to see how popular the games she added are.
Jennifer is an authenticated <b>contributor</b>. She must be able to view her games after logging in, to see their popularity. She must also be able to comment on the games of others and rate them.
<b>Tom: </b> In the attic of his grandparents' house, he found a collection of old card games that he would like to share with others. He is not a frequent player, but he would like to share the finding.
Tom is also a contributor. He will need to register to add games.
<b>Dominik:</b> He is the site administrator, ensuring that the site structure is maintained and that no one breaks the rules or submits inappropriate content.
Dominik is an <b>administrator</b>, he has all the rights and options to modify the site.

Stories:
As a viewer, I want to understand what the site is for when I first land on it so I know what I can find there
As a viewer, I want to see what games are on the site so I can look at their rules and play them myself offline 
As a viewer, I want to create an account so I can become a contributor and vote and comment on games etc
As a contributor, I can create, read, update and delete games
As a contributor, I can vote and comment on games
As a contributor, I can manage my user profile including seeing the games I have created
As an administrator, I can collaborate on the creation, modification, deployment general administration of the site
As an administrator, I can delete user accounts so I can deal with spammers etc
As a contributor, I can save games to my favourites so I can find them on my user profile page later
As a contributor, I can only edit/delete my own games, but I can comment on others
As a Viewer I can get a random game suggested to me so I can try it out offline
As a Viewer I can see which games are ranked the highest by number of votes 


<!--TECHNOLOGIES USED-->
### Technologies used

* [Node.js](https://nodejs.org/)
* [HTML 5](http://www.html5.com/)
* [CSS](https://www.w3schools.com/w3css/defaulT.asp)


<!--MODELS-->
### Models

* User - a user has a name, encrypted password, birthdate, about/description, picture and a list of favourites and created games. A user also has an admin flag.
* Game - a game has a name, minimum number of players, number of card decks required, instructions on how to play, rules, user id of who created it and any comment ids for comments made about it
* Comment - a comment has content and an author

All models have timsetamps to enable createdAt and updatedAt properties


<!--SERVER ROUTES-->
### Server routes
...to be added



<!--Project Link-->
### Link to project
<a href="https://cardspedia.heroku.com">Cardspedia</a>


<!--Future Work-->
###Future Work
...to be added


<!--RESOURCES-->
### Resources
...to be added


<!--TEAM MEMBERS-->
### Team members
*Dominik Kaloc
*Chris Fagg


<!-- ACKNOWLEDGMENTS -->
### Acknowledgments

* [Ironhack](https://www.ironhack.com/en)

<p align="right">(<a href="#top">back to top</a>)</p>

