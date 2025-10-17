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
- Should probably change the plant schema feedingFrequency to type: Number and specify that it is in days in fe
- Might also need to create route to find plant by name, or... i could get all plants saved to state and when search by name in plant search compare by filtering names that have matching characters