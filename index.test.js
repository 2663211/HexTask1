/**
 * @jest-environment jsdom
 */

beforeEach(() => {
    document.body.innerHTML = `
      <input type="text" id="input-box" />
      <button onclick="addTask()">Add</button>
      <ul id="list-container">
      </ul>
    `;

    // Ensure that the global function addTask is available
    require('./index');
});

test('adds a task to the list', () => {
    const input = document.getElementById("input-box");
    const list = document.getElementById("list-container");

    // Set the input value
    input.value = "Sample task";

    // Use setTimeout to delay the execution until after the DOM is fully set up
    setTimeout(() => {
        // Simulate a click on the button
        const button = document.querySelector("button");
        button.click();

        // Verify if the task is added to the list
        expect(list.children.length).toBe(1);
        expect(list.children[0].textContent).toContain("Sample task");
    }, 0); // Delay execution until after event listeners are attached
});

test('doesnt add when receiving a blank', () => {
    const input = document.getElementById("input-box");
    const list = document.getElementById("list-container");

    // Set the input value
    input.value = "";

    // Use setTimeout to delay the execution until after the DOM is fully set up
    setTimeout(() => {
        // Simulate a click on the button
        const button = document.querySelector("button");
        button.click();

        
        expect(alert).toHaveBeenCalledWith('You must write something');
    }, 0); // Delay execution until after event listeners are attached
});

