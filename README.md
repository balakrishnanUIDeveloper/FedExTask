# FedEx Task #

### Assignment ###

* Task summary

* Build a single page app with a sign-up form.
* The form should allow users to enter first name, last name, email, and password.
* All fields are required.
* Password validation:
    1. Should be a minimum of eight characters,
    2. Should contain lower and uppercase letters,
    3. Should not contain user’s first or last name.
* Email should be validated but there are various ways of accomplishing this. So, show us what you consider as a proper email validation.
* The form should send a POST request to https://demo-api.now.sh/users.

## Implementation

* Responsive Design - used Bootstrap 4.2
* signup page with all the above mentioned fields
* 404 page for unknown pages

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## run production code 

Run `npm run prod` to run the production ready code. please run it only after running `ng build` or `npm run build`

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Creator

Balakrishnan 

## Scope for betterment

* JenkinsFile for CI/ CD pipeline.
* SonarQube setup
