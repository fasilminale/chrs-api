## Testing
For any task or feature you are given, you must create a test suit in /test directory.
use(run) the following in terminal in order to run your test
```bash 
    npm test 
```
## Conventions

* Code

    To make it easy understanding between collaborators and maintain a quality code, thefollowing
    are guidelines to be followed.
    * Variables: variable names should start with small letter or cammel case if more than one word
    * Comments
        - Use multiline comment to provide a long description about a collection of snippnet that have common use or a functional unit.
        - Use single line comment to provide short description about the subsequent code
        - Example
            ```javascript
                /**
                 * Handles the user management tasks
                */
                module.exports = {
                    // user registration
                    registerUser: (req, res){

                    }
                    // log in
                    login: (req, res){

                    }
                }
            ```
        - The first line of each file should start with multiline comment describing what the code in the file is about(Optional)
        
* Spacing
    - Don't leave a new line between single line comment and the code it descripes
      * don't
        ```javascript
            // use body parser middleware and parse request body to json

            app.use(bodyParser.json());
        ```
      * do
       ```javascript
            // use body parser middleware and parse request body to json
            app.use(bodyParser.json());
        ```
    - Don't leave a new line between a multi line comment and the code block if there is no 
      single line comment.
      * don't
      ```javascript
        /**
        * importing custom libraries (part of project code)
        */

        const constants = require('./utils/constants');
        const JwtStrategy = require('./authentication/strategies/jwtStrategy');
      ```
      * do
       ```javascript
        /**
        * importing custom libraries (part of project code)
        */
        const constants = require('./utils/constants');
        const JwtStrategy = require('./authentication/strategies/jwtStrategy');
      ```
    - Leave a new line between two code blocks and a new multiline comment

* Git
    * Branch 
        - work on your own branch with a task or feature you are assigned to
        - you should create unit test for what you did
        - ask for pull request once you are done
    
    * Commit 
        - Your commit message should reflect exactely what you did
        - The first word should show the main change or task done some thing like Feature,         Fixing, Refactor, configuration and so on
          Example: 
          - if i add a new feature called "Customer registration", my commit message should look like
                 ```
                    [Feature] Added Customer registration
                 ```
        - If you have completed more than one feature or main changes, start the above
               pattern in a new line
