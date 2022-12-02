const e = require('express');
const fs = require('fs');
// user register
const userRegister = ((req, res) => {
    // validations
    let name1 = /^[a-z A-Z]+$/;
    let email1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let pass1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,24}$/;
    let age1 = /^[0-9]{2}$/;
    let city1 = /^[a-z A-Z]+$/;
    let nameerr;
    let emailerr;
    let passworderr;
    let ageerr;
    let cityerr;
    //storing registration body data into variables
    let { name, email, password, age, city } = req.body;
    if (name1.test(name) && email1.test(email) && pass1.test(password) && age1.test(age) && city1.test(city)) {
        // if file exists
        if (fs.existsSync(`./user/${email}.txt`)) {
            res.render('register', { errMsg: 'Email alredy registered' })
        }
        else {
            // creating new file
            fs.writeFile(`./user/${email}.txt`, `${name}\n${email}\n${password}\n${age}\n${city}`, (err) => {
                if (err) {
                    res.render('register', { errMsg: 'Something went Wrong' })
                }
                else {
                    res.render('register', { succMsg: 'Registered Successfully' })
                }
            })
        }
    }
    else {
        // validations messages
        if (!name1.test(name))
            nameerr= 'Name :Enter only letters and spaces'
        if (!email1.test(email))
            emailerr= 'Email :Enter correct email address'
        if (!pass1.test(password))
            passworderr= 'Password :Enter password must contains atleaest 8 to 24 charactera and must include special symbols, small letters, capital letters and numbers'
        if (!age1.test(age))
            ageerr= 'Age : Enter correct age'
        if (!city1.test(city))
            cityerr= 'City : Enter city name correctly'
    }
    res.render('register', {nameerr:nameerr,emailerr:emailerr,passworderr:passworderr,ageerr:ageerr,cityerr:cityerr})
})

//login 
const login = ((req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    // checking if file exists or not
    if (fs.existsSync(`./user/${email}.txt`)) {
        const fileData = fs.readFileSync(`./user/${email}.txt`).toString().split(/\r?\n/);
        // checking password
        if (fileData[2] == password) {
            res.render('welcome')
        }
        else {
            res.render('login', { errMsg: 'Password is invalid' })
        }
    }
    else {
        res.render('login', { errMsg: 'Email is invalid' })
        // res.send('email invalid')

    }
})

//exporting userRegister and login 
module.exports = {
    userRegister,
    login,
}