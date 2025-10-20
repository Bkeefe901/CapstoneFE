# Links
- [Jira](https://gardentracker.atlassian.net/browse/CGS-8?atlOrigin=eyJpIjoiNzMwYzc5ZDdhZjc4NDdkYjhlZjhmMjhhZThmNDY1MDUiLCJwIjoiaiJ9)
- [BackEnd Github](https://github.com/Bkeefe901/CapstoneBE)






# Planning

## FE Sprint 1
- Create Basic Template and download all known dependencies for fe
    - ✅ Install axios, react-cookie, react-router-dom
    - ✅ Create all page files, component folders, context folders, (utility folder?)
    - ✅ Create basic page layout and component folder/files on what i think i'll need based on wireframe
    - ✅ Fix front end login bug, authentication error from BE



## FE Sprint 2
- Create each page with all elements
    - ✅ Homepage: with hero img, Announcements, General Resources section
    - ✅ Plant Search: Search From, Dynamic List results/ cards with info for selected plant
    - ✅ Admin Dash to add new plants to DB
    - ✅ Dashboard: Table element, Form to add new plant


## FE Sprint 3

    


### Notes
- Create alert to handle if login info is wrong
- Should create feedingFrequency to userPlant that will be populated from plantId if there is one
- ✅ Should probably change the plant schema feedingFrequency to type: Number and specify that it is in days in fe
- Might also need to create route to find plant by name, or... i could get all plants saved to state and when search by name in plant search compare by filtering names that have matching characters
- Make sure/Ask Dylan for help to make sure it logs you out when your token expires and you refresh a auth page.
- If I get to the point of matching plants to userPlants I should do it from the search page on the cards, ie there should be a button on each card that says 'add to garden';
- Figure out how to set default for PlantInput date to date.now when submitting form, if they werent changed
- Test to see if adding multiple new userPlants, and not always choosing the date options if the newer plants added inherit old options (because stored in state from previous selections)