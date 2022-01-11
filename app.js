const billAmt = document.getElementById("billAmt");
const cashGiven = document.getElementById("cashGiven");

const cashDiv = document.getElementById("cash");
const resultDiv = document.getElementById("result");

const errorDiv = document.getElementById("error");

const changeValue = document.getElementById("change");

const nextBtn = document.getElementById("nextBtn");
const checkBtn = document.getElementById("checkBtn");

const noOfNotesDiv = document.querySelectorAll(".noOfNotes");

const denomination = [2000, 500, 100, 20, 10, 5, 1];

/** Function to calculate and display the change 
 * @param {number} bill - The bill amount
 * @param {number} cash - The cash given
 */
const calculateChange = (bill, cash) => {
    changeValue.innerHTML = cash - bill;
    resultDiv.style.display = "block";
}


/** Function to calculate and display the number of notes
* @param {number} bill - The bill amount
* @param {number} cash - The cash given
*/
const calculateNoOfNotes = (bill, cash) => {
	let balance = cash - bill;

	if (balance < 0) {
		return;
	}

	resultDiv.style.display = "block";

	for (let i = 0; i < denomination.length; i++) {
        if (balance >= denomination[i]) {
            const notes = Math.floor(balance / denomination[i]);
            noOfNotesDiv[i].innerText = `${notes}`
            balance = balance % denomination[i];
        }
	}
}

// Function to hide error message
const hideError = () => {
    errorDiv.style.display = "none";
}

/** Function to display error message
 * @param {error} error - The error message
 */
const showError = (error) => {
    errorDiv.innerHTML = error;
    errorDiv.style.display = "block";
}

nextBtn.addEventListener("click", () => {
    hideError();
    if (billAmt.value === "") {
        showError("Please enter the bill amount");
        return;
    }

    if (Number(billAmt.value) >= 0) {
        nextBtn.style.display = 'none';
        cashDiv.style.display = 'flex';
        checkBtn.style.display = 'block';
    } else {
        showError("Please enter a valid bill amount");
    }
});

checkBtn.addEventListener("click", () => {
    hideError();

    resultDiv.style.display = 'none';

    const bill = Number(billAmt.value);
    const cash = Number(cashGiven.value);
    if (bill >= 0 && cash >= 0) {

        if (bill > cash) {
            showError("Cash is less than bill, please enter a valid cash amount!");
            return;
        }

        calculateChange(bill, cash);
        calculateNoOfNotes(bill, cash);
    } else {
        showError("Please enter a valid values");
    }
});
