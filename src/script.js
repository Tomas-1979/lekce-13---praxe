//
// regex = validace hesla
//
// ok - doplnit tlačítka zpět a resetovat formulář
// ok - doplnit hlášky, že musím ještě něco doplnit (použito style.display)
// ok - reset - resetuje všechny inputy (oštření, když jsou chybové hlášky)
// ok - akce po validaci (použití classList - s TailwindCSS)
// poslat na discord vypracování

const nameInput = document.querySelector("[name='name']");
const lastNameInput = document.querySelector("[name='surname']");
const passwordInput = document.querySelector("[name='password1']");
const password2Input = document.querySelector("[name='password2']");
const emailInput = document.querySelector("[name='email']");

const validateButton = document.querySelector("[type='button']");

const resetButton = document.querySelector("[type='reset']");
paragraphs = document.querySelectorAll("form p");

const ok = document.querySelector("#ok");
const form = document.querySelector("#form");

const nameErr = document.querySelector("#nameErr");
const surnameErr = document.querySelector("#surnameErr");
const emailErr = document.querySelector("#emailErr");
const passErr = document.querySelector("#passErr");
const passValidErr = document.querySelector("#passValidErr");

// validace jména
const validateBaseInput = (name, amountOfCharacters) => {
  if (name.length !== 0) {
    if (name[0] !== name[0].toUpperCase()) return false;
  }
  if (name.length === 0) return false;
  if (name.length > amountOfCharacters) return false;
  return true;
};

// validace příjmení
const validateBaseInput2 = (name, amountOfCharacters) => {
  if (name.length !== 0) {
    if (name[0] !== name[0].toUpperCase()) return false;
  }
  if (name.length === 0) return false;
  if (name.length > amountOfCharacters) return false;
  return true;
};

// validace emailu
const validateEmail = (email) => {
  if (!email.includes("@") || !email.includes(".")) return false;
  return true;
};

// validace hesla pomocí regex
const validatePassword = (password) => {
  return /^(?=.*[A-Z])(?=.*\d).{2,8}$/.test(password);
};

// validace shody hesel
const validatePassword2 = () => {
  if (passwordInput.value !== password2Input.value) return false;
  return true;
};

// zpracování celého formuláře po kliknutí na tlačítko "odeslat"

validateButton.addEventListener("click", (event) => {
  event.preventDefault();
  const isNameValid = validateBaseInput(nameInput.value, 20);
  const isLastNameValid = validateBaseInput2(lastNameInput.value, 30);
  const isEmailValid = validateEmail(emailInput.value);
  const isPasswordValid = validatePassword(passwordInput.value);
  const isPassword2Valid = validatePassword2();

  // kontrolní výpis do konzole
  console.clear();
  console.log(`Name - ${isNameValid}`);
  console.log(`Last name - ${isLastNameValid}`);
  console.log(`Email - ${isEmailValid}`);
  console.log(
    `Password entered: "${passwordInput.value}" - ${isPasswordValid}`
  );
  console.log(
    `Password match: "${password2Input.value}" - ${isPassword2Valid}`
  );

  // funkce pro výpis hlášení - nameErr, surnameErr, emailErr, passErr, passValidErr

  let errReq = (errOut, errInp) => {
    if (!errInp) {
      errOut.style.display = "block";
    } else {
      errOut.style.display = "none";
    }
  };

  errReq(nameErr, isNameValid);
  errReq(surnameErr, isLastNameValid);
  errReq(emailErr, isEmailValid);
  errReq(passErr, isPasswordValid);
  errReq(passValidErr, isPassword2Valid);

  // akce po validaci

  if (
    isNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isPassword2Valid
  ) {
    ok.classList.remove("hidden");
    ok.classList.add("flex");
    form.classList.remove("flex");
    form.classList.add("hidden");
  } else {
    ok.classList.remove("flex");
    ok.classList.add("hidden");
  }
});

// resetování formuláře

paragraphs.forEach((oneParagraph) => {
  resetButton.addEventListener("click", (element) => {
    if (oneParagraph.style.display === "block") {
      oneParagraph.style.display = "none";
    }
  });
});
