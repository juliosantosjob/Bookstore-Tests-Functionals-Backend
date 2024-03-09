const { NAME, PASSWORD } = Cypress.env();

module.exports = {
    userAuth: {
        userName: NAME, 
        password: PASSWORD
    }
};