// current state of algorithm
let nums_array = []
let target; // not setting it to anything initially until the user inputs a value

// actual two-sum algorithm implementation/logic
function two_sum(nums, target) { 
    const seen_nums = new Map(); 

    for (let i = 0; i < nums.length; i++) { 
        // Calculate the complement of the current number
        const complement = target - nums[i]; 
        // Check if the complement already exists in the Map. 
        if (seen_nums.has(complement)) { 
            // Return the current index and the index of the complement. 
            return [i, seen_nums.get(complement)]; 
        } 

        // Store the current number and its index for future lookups 
        seen_nums.set(nums[i], i); 
    }

    // Return [-1, -1] if no two numbers add up to the target.
    return [-1, -1];
}

// Get the HTML elements 
const number_input = document.getElementById("number_input"); 
const push_button = document.getElementById("push_button"); 
const pop_button = document.getElementById("pop_button"); 
const clear_array_button = document.getElementById("clear_button");
const target_input = document.getElementById("target_input_num"); 
const array_container = document.getElementById("array_container"); 
const result = document.getElementById("result");

// Display the current array
function display_array() { 
    array_container.innerHTML = ""; 
    
    // for each number currently in the array, we create a new span element and append it to the div that holds the current state of the array
    nums_array.forEach((number) => {
        const el = document.createElement("span")
        el.textContent = number;
        array_container.appendChild(el);
    });
}

function update_result() {
    if (target_input.value !== "") {
        target = Number(target_input.value);

        const two_sum_result = two_sum(nums_array, target);

        result.textContent = (two_sum_result[0] !== -1 && two_sum_result[1] !== -1) ? `The numbers ${nums_array[two_sum_result[0]]} and ${nums_array[two_sum_result[1]]} add up to target value ${target} -- Indices: [${two_sum_result[0]}, ${two_sum_result[1]}]`
            : `No two numbers in the array currently add up to the desired target :(` ;
    }
    else {
        result.textContent = `Desired target value is empty. Please enter a target number`
    }
}

// event listener to update displaying the answer, whenever the user enters a target number
target_input.addEventListener("input", () => {
    update_result();
});

// event listener and action for when a user attempts to push a new number into the array
push_button.addEventListener("click", () => {
    // only push a number if the input field is not empty
    if (number_input.value !== "") {
        const number = Number(number_input.value);

        nums_array.push(number);
        number_input.value = "";

        display_array();
        update_result();
    }
});

// event listener for when a user attempts to pop from the array
pop_button.addEventListener("click", () => {
    nums_array.pop();

    display_array();
    update_result();
});

// event listener for the 'clear' button, which literally just wipes out the entire array in one click rather than have to pop repeatedly
clear_array_button.addEventListener("click", () => {
    nums_array = [];

    display_array();
    update_result();
});