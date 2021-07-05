import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { SignUp } from "./SignUp";

import InputValidate from "./SignUp";

describe("signup",() => {
    test("validate function should pass correct input",() => {
        const data = {
             email = "test@gmail.com",
             user = "test",
             password = "Test@123"
        }
        expect(InputValidate(data)).toBe(true)
    })
    test("validate function should fail on incorrect input",() => {
        const data = {
            email = "testgmail.com",
            user = "test",
            password = "test123"
       }
       expect(InputValidate(data)).not.toBe(true)
    })

    test("email field should have lebal",() => {
        const component = render(<SignUp />)
        const emailInput = component.getByLabelText("email");
        expect(emailInput.getAttribute("name")).toBe("email")
    })
})