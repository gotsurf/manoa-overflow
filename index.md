<img src='app/public/images/ManoaOverflow.png'/>

by Matthew Lam, Jeffrey Wood and David Cole: <a href='https://gotsurf.github.io/'>gotsurf.github.io/</a>

You can see our app running <a href='http://manoaoverflow.meteorapp.com/'>here</a>


## Goals

- Provide forum-style support for students taking ICS courses at UH Manoa
- Questions and answers with context
- Encouraging students reach out for help
- Learning by teaching

## Services

- Provide a StackOverflow-style forum with questions organized by ICS course
- Students can navigate to a course and ask or answer questions pertaining to that course

## Walkthrough

- Landing Page
- Signup
- Ask a Question
- Post an Answer
- Rate a Question or Answer
- Subscribe to a Course
- Admin Functionality

#### Landing

The landing page has a full searchable list of courses and questions where each question belongs to a course, therefore giving it a particular context.

<img src='app/public/images/m3/new-landing.png'/>

#### Signup

To ask questions and post answers you must have an account first. To sign up, click the top right navbar link that says login.

Then click sign up.

<img src='app/public/images/wt/2.png'/>
<img src='app/public/images/wt/3.png'/>

#### Ask a Question

From the landing, click on a course to navigate to its course page, there you can click Add Question to post a question for that course.

<img src='app/public/images/wt/4.png'/>
<img src='app/public/images/wt/5.png'/>

#### Post an Answer

Once a question is listed in the course page, you can click on it to view the full question page. There you can post an answer with a similar modal function.

<img src='app/public/images/wt/6.png'/>

#### Rate a Question or Answer

On the question page, you can rate both the question and its answers by upvoting or downvoting. One vote per user per posted item. Votes are also changeable.

<img src='app/public/images/wt/7.png'/>

#### Subscribe to a Course and Personal Pages

Clicking the subscribe button on a course page will add that course to your My Courses page.

<img src='app/public/images/m2/Sub2.png'/>

Similarly, all your posted questions can be view in My Questions...

<img src='app/public/images/m2/Questions1.png'/>

...and Answers in My Answers

<img src='app/public/images/m2/Answers.png'/>

#### Admin Functionality

Admin users are defined in the `settings.development.json` file before the app is first launched. The Admin page allows the removal of any question or answer from the site and should be used for moderating.

<img src='app/public/images/m3/admin-questions.png'/>

<img src='app/public/images/m3/admin-answers.png'/>


## Milestone 1: Page Mockups
<a href='https://github.com/gotsurf/manoa-overflow/projects/1'>
                            https://github.com/gotsurf/manoa-overflow/projects/1</a>

#### Landing

<img src='app/public/images/m1/landing.png'/>

The landing page will have all courses and include a search bar in the future.

#### Course Page

<img src='app/public/images/m1/course.png'/>

Each course page will have all questions pertaining to that particular course listed.

#### Question Page

<img src='app/public/images/m1/question.png'/>

Questions will have answers posted below. Both questions and answers have a voted rating out of 5 stars.

## Milestone 2: Functionality and Refined UI
<a href='https://github.com/gotsurf/manoa-overflow/projects/2'>
https://github.com/gotsurf/manoa-overflow/projects/2</a>

#### Landing

<img src='app/public/images/m2/Home.png'/>

Landing page now has two tabs, one to browse all courses and the other for all questions, each with a search bar.

#### Course Page

<img src='app/public/images/m2/Course1.png'/>

You can add a question from the course page within a modal.

<img src='app/public/images/m2/Course2.png'/>

Once added the question is visible in the questions list within the course page.

<img src='app/public/images/m2/Course3.png'/>

Clicking on a question will navigate to its page.

<img src='app/public/images/m2/Course4.png'/>

On the question page you can provide an answer.

<img src='app/public/images/m2/Course5.png'/>

And voila! We have a forum!

<img src='app/public/images/m2/Course6.png'/>

#### My Courses

Clicking the subscribe button on a course page will save that course to your favorites.

<img src='app/public/images/m2/Sub1.png'/>

You can view these saved courses in "My Courses".

<img src='app/public/images/m2/Sub2.png'/>

#### My Questions and Answers

You can also view all questions you've asked and answers youve given with links to their original pages and course homepages.

<img src='app/public/images/m2/Questions1.png'/>

<img src='app/public/images/m2/Answers.png'/>

## Milestone 3: Admin and Additional Functionality
<a href='https://github.com/gotsurf/manoa-overflow/projects/3'>https://github.com/gotsurf/manoa-overflow/projects/3</a>

#### Landing Animation

Improved landing graphics for a more professional look including CSS animations. See it live <a href='manoaoverflow.meteorapp.com'>here</a>.

<img src='app/public/images/m3/new-landing.png'/>

#### Ratings

Questions and Answers can now be voted up or down. 

<img src='app/public/images/m3/ratings.png'/>

#### Delete Questions and Answers

Ability to delete questions and answers:
- Deleting a question removes all ratings for the question as well as all answers and corresponding ratings from the database.
- Deleting an answer will remove all its ratings from the database as well as itself.
- Clicking delete will render a confirm modal first since we are actually removing from the db instead of simply archiving (in order to save space in our free sandbox db).
- Currently only available to admin/moderators since the action is irreversible.

<img src='app/public/images/m3/delete.png'/>

<img src='app/public/images/m3/delete-confirm.png'/>

#### Admin Interface

Admin interface to view all questions and answers and delete them from the database.

<img src='app/public/images/m3/admin-questions.png'/>

<img src='app/public/images/m3/admin-answers.png'/>