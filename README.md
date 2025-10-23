<!-- Project Logo -->
<br />

<img src="./src/images/logo.png" style="width: 15%; border-radius: 15%; margin: auto" >




# Garden Tracker App

## Links
- [Jira](https://gardentracker.atlassian.net/browse/CGS-8?atlOrigin=eyJpIjoiNzMwYzc5ZDdhZjc4NDdkYjhlZjhmMjhhZThmNDY1MDUiLCJwIjoiaiJ9)
- [BackEnd Github](https://github.com/Bkeefe901/CapstoneBE)



## About The Project
The Garden Tracker App is a full stack (MERN) web application developed to help people keep track of all the plants in their garden. It utilizes user and admin authorization with jsonwebtoken. It has 4 pages: the homepage, search page, dashboard, and login/register page. If you do not have an account you can still visit the home page and search page (and register page if you decide to sign up). 

The Homepage is a simple front to the app which has several resources from across the internet to help with gardening information. 

The search page allows you access to the plant collection that gives you general information on different kinds of vegetable/fruit plants. It will tell you the recomended feeding frequency, sunlight requirements and a description of the plant. You can use the seach form to filter the list for specific plants. If you are an admin, this is where you can toggle between the basic search form and the admin form to add new plants to the plant collection in the database. You can also delete plants from the collection with a button that now appears on the list of plants.

If you are a user you will have access to the dashboard page. The dashboard has a table that keeps track of your own garden. Here you can add plants manually to your garden, keep track of when you last watered or fed them, edit to updated waterings/feedings and remove dead plants. If you are coming up on the day you should feed your plant, based on feedingFrequency in the userplant schema the color of 'last fed' data for that plant will first turn yellow, then red when you should definitely feed your plant. You can also now use the search page to quickly add plants from the plant collection to your garden plants.


### Built With
- [React](https://react.dev/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Express](https://expressjs.com/)
- [NodeJS](https://nodejs.org/en)
- [Axios](https://github.com/axios/axios)

</br>


## Getting Started

### Installation
1. To run this application for yourself clone this repo down to one folder of you choice. Also clone down the repo for the backend (linked above) to another folder.
```
git clone https://github.com/Bkeefe901/CapstoneFE
```
```
git clone https://github.com/Bkeefe901/CapstoneBE
```
2. Install all dependencies on both repos
```
npm install
```
3. If you dont have nodemon installed globally install it as well for the backend repository
```
npm i nodemon --save-dev
```
4. Create a file in the root folder of you backend repository
```
touch .env
```
5. Within that file add the following variables with your own information where indicated:
```
PORT=3000
mongoURI=<your own mongodb connection string>/gardenTracker
jwtSecret=<Any long string of letters or numbers>
```
6. Seed your mongo database by running this command in the backend repo terminal:
```
npm run seed
```
7. Run each repo, enter this command in the terminal for each repo
```
npm run dev
```
8. Now go to the localhost address displayed in the terminal of the front end repo terminal. It will most likely be: http://localhost:5173/

### Usage
Now you can navigate around the web app. Go to the login/signUp page and register a user. You can now use the dashboard and its features to keep track of the plants in your garden. To get admin privilege just go to your mongodb gargenTracker database. Navigate to the user collection and edit the isAdmin parameter in your user document to `true`. With admin privileges you can also add and delete plants from the search page. 




### Notes

- ✅ Should probably change the plant schema feedingFrequency to type: Number and specify that it is in days in fe
- ✅Might also need to create route to find plant by name, or... i could get all plants saved to state and when search by name in plant search compare by filtering names that have matching characters
- ✅If I get to the point of matching plants to userPlants I should do it from the search page on the cards, ie there should be a button on each card that says 'add to garden';
- ✅Figure out how to set default for PlantInput date to date.now when submitting form, if they werent changed
- ✅Need to add feedingFrequency input for PlantInput component
- ✅Create alert to handle if login info is wrong
- ✅Should create feedingFrequency to userPlant that will be populated from plantId if there is one

- Want to fix the plant search so that if any plant items have names that are close or have that string within the name it will return them in the search list

