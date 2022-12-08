import {validRegister,PasswordError,EmailError} from "./mock.js"

test('Valid Email & Valid Password Expecting No Errors', () => {
    try{
        expect(validRegister("email@mail.com","twelve")).toBe("Valid Email Address & Password");
    } catch (e) {
       
    }
});

test('Valid Email & Invalid Password Expecting Password Error', () => {
    try{
        validRegister("email@mail.com","hello");
    } catch (e) {
        expect(e.message).toBe("InvalidPasswordError")
    }
});

test('Invalid Email & Valid Passowrd Expecting Email Error', () => {
    try{
        validRegister("email","password");
    } catch (e) {
        expect(e.message).toBe("InvalidEmailAddressError")
    }
});

test('Invalid Email & Invalid Password Expecting Email Error', () => {
    try{
        validRegister("email","hello");
    } catch (e) {
        expect(e.message).toBe("InvalidEmailAddressError")
    }
});

test('No Input Values Expecting Email Error', () => {
    try{
        validRegister("","");
    } catch (e) {
        expect(e.message).toBe("InvalidEmailAddressError")
    }
});

