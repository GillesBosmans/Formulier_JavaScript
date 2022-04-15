/*
PE-OPDRACHT - JAVASCRIPT
Opdracht: Bouw & valideer een formulier met behulp van JavaScript.
*/

// De functie validateForm() oproepen bij het drukken op de knop.
// gebruik gemaakt van https://www.w3schools.com/jsref/event_preventdefault.asp
form.addEventListener('submit', (e) => {
    e.preventDefault();/*
    'The preventDefault()' method of the Event interface tells the user agent that
    if the event does not get explicitly handled, its default action should
    not be taken as it normally would be.*/
    validateForm();
})

// Array-errors aanmaken voor de ALERT-meldingen in te bewaren.
let errors = [];




// DIV
const errorsYikes = document.querySelector('#errorsYikes');
const success = document.querySelector('#success');
const paymentSuccessful = document.querySelector('#paymentSuccessful');
// messages
const txterror = document.querySelector('#txtError');
const txtsucces = document.querySelector('#txtSuccessful');
const txtbetaling = document.querySelector('#txtBetalingswijze');
// DIV met de messages/ALERT-meldingen verbergen.
const hidden = document.querySelector('#showMessage');
hidden.style.visibility = 'hidden';




// Bij het klikken op de knop wordt de functie "validateForm" getriggerd.
function validateForm() {

     // Uitvoeren van een reset van de errors en messages/ALERT-meldingen verbergen.
     errors = [];
     hidden.style.visibility = 'hidden';

    // Inputs declareren
    // gebruik gemaakt van https://www.w3schools.com/js/js_validation.asp
    const voornaam = document.forms["form"]['validationVoornaam'].value;
    const naam = document.forms["form"]['validationNaam'].value;
    const gebruikersnaam = document.forms["form"]['validationGebruikersnaam'].value;
    const email = document.forms["form"]['inputEmail1'].value;
    const password1 = document.forms["form"]['InputPassword1'].value;
    const password2 = document.forms["form"]['InputPassword2'].value;
    const adres = document.forms["form"]['inputAdres'].value;
    const postcode = document.forms["form"]['inputPostcode'].value;
    const payment = document.querySelectorAll('input[name="betaling"]');
    const voorwaarden = document.getElementById("algemeneVoorwaarden");
    const land = document.getElementById('inputLand').value;
    const provincie = document.getElementById('inputProvincie').value;


    // Controleren op lege/niet ingevulde velden met de functie 'checkEmptyField(veld, melding);'.
    checkEmptyField(voornaam, "Het veld 'voornaam' is vereist");
    checkEmptyField(naam, "Het veld 'naam' is vereist");
    checkEmptyField(gebruikersnaam, "Het veld 'gebruikersnaam' is vereist");
    checkEmptyField(password1, "Het veld 'Wachtwoord' is vereist");
    checkEmptyField(password2, "Het veld 'Herhaal wachtwoord' is vereist");
    checkEmptyField(adres, "Het veld 'Uw adres en huisnummer' is vereist");
    checkEmptyField(land, "Het veld 'Land' is vereist");
    checkEmptyField(provincie, "Het veld 'Provincie' is vereist");
    /*
    checkEmptyField(email, "Het veld 'E-mailadres' is vereist");
    checkEmptyField(postcode, "Het veld 'postcode' is vereist");
    */


    // Controleren van de e-mailadressen door middel van de functie 'validateEmail(emailadres)'.
    validateEmail(email);


    // Controleren of de wachtwoorden identiek zijn en of deze meer dan 7 karakters bevatten.
    if (password1 !== password2){
        errors.push("De velden 'Wachtwoord' en 'Herhaal wachtwoord' zijn niet hetzelfde." + "<br>");
    } 
    if(password1.length < 8 || password2.length < 8){
        errors.push("Het Wachtwoord is te kort." + "<br>");
    }


    // Geeft weer welke betalingswijze je hebt geselecteerd door middel van de functie 'validatePayment(veld)'
    validatePayment(payment);


    // Controleert de postcode met de functie 'checkPC(veld)'
    checkPC(postcode);


    // Controle algemene voorwaarden
    // Gebruik gemaakt van https://www.w3schools.com/howto/howto_js_display_checkbox_text.asp
    if (voorwaarden.checked == false){
        errors.push("Je moet de algemene voorwaarden accepteren" + '<br>');
    }


    // Alle waarden die in de array errors zitten, toevoegen aan het elemnet txterror.
    txterror.innerHTML = errors.join('');


    // Controleren of de lengte van de array errors gelijk zijn aan 0,
    // als deze gelijk is aan 0 worden de meldingen 'Goed gedaan!' en 'Betalingswijze' weergegeven anders 'Yikes, errors'.
    if (errors.length === 0){
        txtsucces.innerHTML = "Aww yeah, je werd geregistreerd";
        paymentSuccessful.style.visibility = 'visible';
        success.style.visibility = 'visible';
        errorsYikes.style.visibility = 'hidden';
    }else {
        errorsYikes.style.visibility = 'visible';
        paymentSuccessful.style.visibility = 'hidden';
        success.style.visibility = 'hidden';
    }
};




// Deze functie controleert of de postcode groter dan 1000, kleiner dan 9999 of gelijk aan 1000 of 9999 is.
function checkPC(veld){
    if (veld >= 10000 || veld <= 999){
        if (veld === "" || veld === null){
            errors.push("Het veld 'postcode' is vereist" + '<br>')
        }else errors.push("De waarde van de postcode moet tussen 1000 en 9999 liggen." + '<br>');
        }
}


// Deze functie geeft weer welke betalingswijze je hebt geselecteerd.
// Hiervoor heb ik gebruik gemaakt van https://www.javascripttutorial.net/javascript-dom/javascript-radio-button/
function validatePayment(veld){
    for (const radioButton of veld)
    if (radioButton.checked) {
        txtbetaling.innerHTML = 'Je betalingswijze is ' + radioButton.value;
    }
}


// Deze functie controleert of het een geldig e-mailadres is.
// Hiervoor heb ik gebruik gemaakt van https://www.w3resource.com/javascript/form/email-validation.php en https://regexr.com
function validateEmail(emailadres){
    if(/^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]|\_[a-zA-Z0-9-]+)*@[A_Za-z0-9]{1,}[.]{1}[A-Za-z.]{1,}$/.test(emailadres)){
        return true;
    }else {
        errors.push("E-mailadres is niet correct." + '<br>');
        return false;
    }
};


// Deze fuctie controleert of er velden niet zijn ingevuld.
function checkEmptyField(veld, melding){
    if (veld === '' || veld == null){
        errors.push(melding + '<br>');
    } 
};