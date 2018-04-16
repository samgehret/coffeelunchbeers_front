<h1>This will serve as the planninn information initially.</h1>

<h2>Basic Concept<h2>
This application is created by GA students for GA students. It can be used for 3 main functions:
1. Log Meetups and Requirements for Graduation Requirements.
2. Create and Post fun reviews on surrounding areas where students can eat lunch or go to happy hour with fellow students.

<h3>Technologies<h3>
- The front end will be created in REACT
- The backend will be Express / Node.js server.
- The Database will be Monngo DB.

<h3>Models</h3>
- This applicationn will have fully secured authentication and authorization. I will be using an API from a service called Okta to handle all user mananement and authentication, so a user model will not be required in my application.
- Places (for meetups, lunch, and beers):
  -Title
  -Summary
  -Author
  -Location
  -Date
  -Attendees (Array)
  -Photo(s)
  -Comments

-Attendees:
  -Name
  -Email
-Comments:
  -Text
  -Author


MVP:
- Full CRUD functionality accross Places
- Users can only edit/delete their own content (including comments).
- Full user authentication with Okta.

Bronze: 
- Profile page, where users can go to and see which meetups they've attended, and which lunch spots and happy hours they've been to.
- Admin page where admin can create other admins, delete accounts, or delete any contetn from other users.

Silver:
-Implement a map to visualize all the data.