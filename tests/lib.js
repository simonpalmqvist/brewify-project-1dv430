export function login(user) {
    //Login user
    let session = server.call("login", {user: {email: user.email}, password: user.password});

    browser.localStorage("POST", {key: "Meteor.userId", value: session.id});
    browser.localStorage("POST", {key: "Meteor.loginToken", value: session.token});
    browser.localStorage("POST", {key: "Meteor.loginTokenExpires", value: session.tokenExpires});

    return session.id;
}

export function logout() {
    server.call("logout");
    browser.localStorage("DELETE");
}