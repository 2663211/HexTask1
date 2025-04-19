/**
 * @jest-environment jsdom
 */

beforeEach(() => {
    document.body.innerHTML = `
      <input type="text" id="input-box" />
      <button id="add-btn">Add</button>
      <ul id="list-container"></ul>
    `;
  
    global.alert = jest.fn();
    // Load your main script file (make sure addTask is globally defined)
    require('./index'); // should attach addTask and event listeners to list
  });
  
  function addTestTask(taskText) {
    const input = document.getElementById("input-box");
    input.value = taskText;
  
    // Directly call the function, not the click
    if (typeof AddTask === 'function') {
      AddTask();
    } else {
      throw new Error('addTask is not defined. Make sure it is attached to window in your index.js');
    }
  }
  
  test('toggles "checked" class when a list item (LI) is clicked', () => {
    addTestTask("Test Task");
  
    const listItems = document.querySelectorAll("#list-container li");
    expect(listItems.length).toBeGreaterThan(0); // sanity check
  
    const lastLi = listItems[listItems.length - 1];
  
    lastLi.click(); // simulate check
    expect(lastLi.classList.contains("checked")).toBe(true);
  
    lastLi.click(); // simulate uncheck
    expect(lastLi.classList.contains("checked")).toBe(false);
  });

  test('removes list item when a span inside it is clicked', () => {
    // First, add a test task (list item with a span inside it)
    addTestTask("Test Task");
  
    const Items = document.querySelectorAll("#list-container li");
    expect(Items.length).toBeGreaterThan(0); // sanity check
  
    // Get the last list item
    const lastLi = Items[Items.length - 1];
  
    // Assuming each li contains a span (as in your example)
    const spanInsideLi = lastLi.querySelector("span");
  
    // Simulate the click on the span inside the li
    spanInsideLi.click();
  
    // Ensure the parent li element was removed
    const remainingListItems = document.querySelectorAll("#list-container li");
    expect(remainingListItems.length).toBe(Items.length - 1); // one less item should be in the list
  
    // Additionally, you could check if the li was actually removed from the DOM:
    expect(lastLi.parentElement.contains(lastLi)).toBe(false);
 // the last li should not be in the parent element anymore

  });
  
  