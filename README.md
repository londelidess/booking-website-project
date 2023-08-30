# `Stay <booking-website-project>`

## INTRODUCTION
![homepage][def2]

Introduction

Welcome to the booking-website-project wiki

My Project is a full-stack web application built with Express API backend, React, and Redux. The application is designed to provide Booking Website. 
![image-of-home](https://github.com/londelidess/booking-website-project/assets/121207128/63daa558-b68c-4440-aa05-c6999dedd3e8)

Technologies Used
Frontend: React, Redux
Backend: Express API
Database: PostgreSQL

Running the Application Locally
Clone the repository: git clone (https://github.com/londelidess/booking-website-project)
Navigate to the project directory: cd backend / cd frontend.
Install all the necessary packages and dependencies using npm: npm install.
Start the application: npm start.


Features
User Authentication
Sign up: Users can create a new account using their email address.
Log in/Log out: Users can log in to access their data and log out when they're done.
Demo User Login: For those who just want to explore the site, we have a Demo User feature.

Landing Page
Tile list of all spots, each tile containing a thumbnail image, the city, and the state of the spot.
The star rating is displayed as "New" for spots without any reviews, or the average star rating of the spot is displayed as a decimal for those with reviews.
Display the price per night for each spot.

Spot Details
The spot detail page includes the spot's name, location, images, host information, description, and a reservation callout box displaying the price per night and a "Reserve" button.
The "Reserve" button displays an alert saying "Feature coming soon" when clicked.

Ratings and Reviews
Display of average star rating and total review count on both the landing page and spot detail page.
List of all reviews for a spot.

Spot Creation
Logged-in users can create spots by inputting location details, descriptions, titles, pricing, and images.

Review Posting
The "Post Your Review" button is shown on the spot detail page for logged-in users.
Successful review submissions update the reviews list and review summary info on the spot's detail page.

Spot Management
The "Manage Spots" selection in the user dropdown menu navigates to a page displaying all spots created by the user.
If the user hasn't posted any spots, a "Create a New Spot" link is displayed.
Each spot tile on the management page includes "Update" and "Delete" buttons so the user can manage.

Spot Updating
Clicking "Update" let the user by inputting updated location details, descriptions, titles, pricing, and images and show updated information in detailed page.

Spot and Review Deletion
The User can delete spots and reviews they create.


During the project, I had difficulty with some features.
Back-End
I needed date modification and created a separate middleware function to solve this issue. The code I'm most proud of is the formatted date callback function, which caters to two different response styles based on given parameters. However, it could be improved for better robustness as it requires the correct data type to function as intended.

```js
module.exports = function formattedDate(date, includeTime = false) {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) month = `0${month}`;
  if (day < 10) day = `0${day}`;

  if (includeTime === true) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  return `${year}-${month}-${day}`;
}
```


 The 'Get All Spots' query was a segment where I was able to maintain clean and maintainable code. I also constructed an error object for better debugging and code flow understanding.

The biggest challenge was the database setup and deployment, teaching me the importance of proper syntax and usage. It highlighted the need for understanding to avoid errors leading to frequent schema drops. I discovered that it's difficult to create logical structures without complete mastery over syntax. Google was my primary tool for research, helping me understand concepts better and solve problems more efficiently.

If I were to redo the project, I would increase the use of error-handling middleware for better debugging and user experience. There were also tasks such as fixing the time function that I could not complete due to time constraints. I am looking forward to handling more potential error cases to make my API more robust and reliable in the future.

I learned the importance of managing data types in request bodies in backend development and found creating the logic to implement desired functionalities rewarding. Though this project was a great learning experience, the guidance from senior developers remains invaluable. For future projects, I aim to be more independent by breaking them into smaller steps and following a structured workflow. I am also planning to add restrictions to the data types users can input into the API to make it more user-friendly. My advice to other developers would be to understand how to reformat responses before using res.json().

Front-End 
Designing the reducer with an initial state certainly amplified the efficiency of my project. However, visualizing the Redux store shape presented a significant challenge. I often found myself needing to modify it in the middle of production, which in turn required alterations in various file logics to grab store data. This process, albeit inefficient, provided me with valuable experience in managing data types.

Another hurdle was figuring out how to efficiently use multiple thunk actions at the same time in conjunction with backend APIs. In several instances, I had to modify the backend API logic to facilitate simpler and more effective use of thunk actions on the frontend. I realized how pivotal it is to understand and manage data types effectively in full-stack development.

Moving forward, I aim to invest more time in the comprehensive planning of both frontend and backend aspects simultaneously. This will prevent any loss of direction during the production phase and further enhance the efficiency of my projects. It's evident to me now that successful development is largely about managing and connecting data types accurately across the entire stack.

Front-End
Designing the reducer with an initial state certainly amplified the efficiency of my project. However, visualizing the Redux store shape presented a significant challenge. I often found myself needing to modify it in the middle of production, which in turn required alterations in various file logics to grab store data. This process, albeit inefficient, provided me with valuable experience in managing data types.

Another hurdle was figuring out how to efficiently use multiple thunk actions at the same time in conjunction with backend APIs. In several instances, I had to modify the backend API logic to facilitate simpler and more effective use of thunk actions on the frontend. I realized how pivotal it is to understand and manage data types effectively in full-stack development.

Moving forward, I aim to invest more time in the comprehensive planning of both frontend and backend aspects simultaneously. This will prevent any loss of direction during the production phase and further enhance the efficiency of my projects. It's evident to me now that successful development is largely about managing and connecting data types accurately across the entire stack.


[def]: ./images/airbnb_dbdiagram.png
[def2]:./images/image-of-home.png
