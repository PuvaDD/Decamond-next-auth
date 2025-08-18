# Decamond inc. Next.JS auth mini interview project

This is a mini project requested by Decamond inc. for interview purposes.
The main task at hand was to create a simple authentication workflow.

Due to the 24h time limit, some choices were simplified and are not production ready. The point of this task is to show an understanding of Next.JS.

We'll elaborate more on what these choices were and what the ideal approach could look like.

**IMPORTANT NOTE:**

**The main focus was to make the minimum viable product for the scope of this project, Prioritizing functionality over security.**

# Tech Stack:

- Next.JS v15.4.6
- Cookies
- Server actions
- SASS
- ZOD

# Folder Structure:

In the `/app` directory the two main routes are `/auth` and `/dashboard`. `/auth` contains all the pages related to authentication and non-logged in users and `/dashboard` is reserved for authenticated users.

Furthurmore, The `/components` folder contains all custom components & contexts made for this project.

Moreover, the `/lib` directory contains all of the utility functions and auth server actions.

# Authentication workflow:

Although the login form shows two inputs, they are only used to show the employer what approach I used for form validation (Using `ZOD`).

Form data is then passed to a server action called `Login` which by the request of the employer calls an API that returns a random user. If the response is fine then a cookie is made to be used in the front-end.

    Note:
    - Encrypting cookies is a good way to increase security but it's not needed for this scope
    - Using JWT is better.
    - Adding serverside session validation is also beneficial.

User is then pushed to the `/dashboard`.

Since the `Layout.tsx` component for dashboard runs before page requests, I checked for the cookie in that component and if it is found, it's passed to the dashboard context for all subroutes to access.
If it's not found when accessing any dashboard subroutes, user gets pushed to `/auth/login`.

The layout for `/auth` routes also checks for a logged in user via cookies and if found, the user is pushed to `/dashboard`. The better approach would be to use the global context but we'll talk about that furthur down.

All checks in the layouts always run when a subroute is visited so if the cookie is expired, user will be pushed o login.

Did not use `Oauth` for social media logins by the request of the employer.

In the landing page we also check for the cookie to show/hide navbar links.

    Note:
    - it's good practice to save the user information in a global context in case user information is needed anywhere before the dashboard.

    - Reasons why I didn't do it like this:
    1) Time limitation:
    wrapping the app with a context at root makes the whole app a client side app which we don't want. there are workarounds but this needed more time than I had.

    2) Project scope

The logout button in the dashboard only removes the auth cookie and redirects the user to the landing page. **But this is not the way to do it in a production ready project and needs furthur development** like invalidating session on the server side.

`.env` files were added to contain secrets and API endpoints but since this is just a test project and there were no secrets or seperate development and production endpoints, they were pushed to `GITHUB` which is not the case for real world projects.

# Design and UI/UX:

Used `SASS` to style this project and made some `mixins` to reduce repeating code. The design is pretty simple as it was not the focus of this test. The main focus for me was to show I can work with SASS.

# Typescript:

You will find a couple of places where I didn't add a type for API responses and used `any` but this is only because of time limitation.

In real world projects we either type them separately or are able to get the types from other libraries like `Prisma` which gives access to types based on the `data base schema`.

# How to run this project:

There are no security codes, secrets or external APIs to config in `.env` files so simply navigate to the root where `package.json` is and run `npm run dev` in the terminal.
