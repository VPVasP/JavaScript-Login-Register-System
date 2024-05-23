const fs = require('fs');
const readline = require('readline-sync');

class LoginRegisterManager {
    constructor() {
        this.userInfoList = new UserInfoList();
        this.userSavedFile = 'userData.json';
        this.loadUserData();
    }

    //register method
    register() {
        //we ask for username and password and we get the values the user put.
        console.log('Enter your username:');
        const registerUsername = readline.question();
        console.log('Enter your password:');
        const registerPassword = readline.question();
        //we check if the username already exists
        if (this.doesUserExistRegister(registerUsername)) {
            console.log('Name already exists');
        } else {
            //we create a new user 
            const newUser = {
                Username: registerUsername,
                Password: registerPassword
            };

            console.log('Registered New User, Also Welcome ' + registerUsername);
            this.userInfoList.usersInfoList.push(newUser);
            this.saveUserData();
        }
    }
    //login method
    login() {
        console.log('Enter your username:');
        const loginUsername = readline.question();
        console.log('Enter your password:');
        const loginPassword = readline.question();

        //we check if the username and password match
        if (this.doesUserExistLogin(loginUsername, loginPassword)) {
            console.log('You are now logged in ' + loginUsername);
        } else {
            console.log('Wrong Username or Password');
        }
    }
    //checking if a username already exists 
    doesUserExistRegister(username) {
        return this.userInfoList.usersInfoList.some(user => user.Username === username);
    }
    //checking if a username already exists
    doesUserExistLogin(username, password) {
        return this.userInfoList.usersInfoList.some(user => user.Username === username && user.Password === password);
    }
    //we save data to JSON
    saveUserData() {
        const json = JSON.stringify(this.userInfoList, null, 4);
        fs.writeFileSync(this.userSavedFile, json);
    }
    //we load data from JSON
    loadUserData() {
        if (fs.existsSync(this.userSavedFile)) {
            const json = fs.readFileSync(this.userSavedFile);
            this.userInfoList = JSON.parse(json);
        }
    }
}

//the user info such as username and password
class UserInfo {
    constructor(username, password) {
        this.Username = username;
        this.Password = password;
    }
}
//a constructor that stores the user ifno
class UserInfoList {
    constructor() {
        this.usersInfoList = [];
    }
}

function main() {
    const manager = new LoginRegisterManager();

    while (true) {
        //presenting the user with a choice and then reading the input
        console.log('Enter your Choice:');
        console.log('1. Register');
        console.log('2. Login');
        console.log('3. Exit');

        const choice = readline.question();
        //switch statement that handles the different user choises

        switch (choice) {
            case '1':
                manager.register();
                break;
            case '2':
                manager.login();
                break;
            case '3':
                process.exit(0);
                break;
            default:
                console.log('Please choose a correct number between 1, 2, or 3.');
                break;
        }
    }
}
//run the main method
main();
//don't shut the program
process.stdin.resume();