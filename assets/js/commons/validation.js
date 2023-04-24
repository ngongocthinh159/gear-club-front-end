const validateEmail = (email) => {
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
    return emailRegex.test(email);
}

const validatePassword = (password) => {
    if (validateLength(password) === false) {
        return "Mật khẩu phải có chiều dài từ 8 tới 32 ký tự."
    } else if (validateLowerCase(password) === false) {
        return "Mật khẩu phải có ít nhất 1 ký tự chữ cái viết thường."
    } else if (validateUpperCase(password) === false) {
        return "Mật khẩu phải có ít nhất 1 ký tự chữ cái viết hoa."
    } else if (validateNumber(password) === false) {
        return "Mật khẩu phải có ít nhất 1 ký tự số."
    } else return true;
}

const validateLength = (password) => {
    if (password.length >= 8 && password.length <= 32) {
        return true;
    }
    return false;
}

const validateLowerCase = (password) => {
    var lowerCaseLetters = /[a-z]/g;
    if (password.match(lowerCaseLetters)) {
        return true;
    }
    return false;
}

const validateUpperCase = (password) => {
    var upperCaseLetters = /[A-Z]/g;
    if (password.match(upperCaseLetters)) {
        return true;
    }
    return false;
}

const validateNumber = (password) => {
    var numbers = /[0-9]/g;
    if (password.match(numbers)) {
        return true;
    }
    return false;
}

function displayError(errorText) {
    var errorDisplay = document.getElementsByClassName('error');
    if (errorDisplay.length === 0) {
        var html = `<div class="error text-center">
            <i class="fa fa-times-circle" style="color:red;" aria-hidden="true"></i>
            ${errorText}
        </div>`;
        var start = document.querySelector('.paragraph');
        start.insertAdjacentHTML("afterbegin", html)
    } else {
        var html = `<i class="fa fa-times-circle" style="color:red;" aria-hidden="true"></i>
                    ${errorText}`
        errorDisplay[0].innerHTML = html
    }
}

export { validateEmail, validatePassword, displayError };