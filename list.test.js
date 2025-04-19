/**
 * @jest-environment jsdom
 */

beforeEach(() => {
    // Setup HTML structure
    document.body.innerHTML = `
      <ul id="list-container">
        <li>Test Task 1</li>
        <li>Test Task 2 <span>x</span></li>
      </ul>
    `;
  
    // Load the original JS file to attach event listeners
    require('./index');
  });
  
  test('toggles "checked" class when a list item (LI) is clicked', () => {
    const list = document.getElementById("list-container");
    const li = list.querySelector("li");
  
    // Simulate clicking on the <li>
    li.click();
  
    expect(li.classList.contains("checked")).toBe(true);
  });
  
  test('removes list item when span is clicked', () => {
    const list = document.getElementById("list-container");
    const secondLi = list.children[1];
    const span = secondLi.querySelector("span");
  
    // Simulate clicking on the <span>
    span.click();
  
    expect(list.children.length).toBe(1);
    expect([...list.children].some(li => li.textContent.includes("Test Task 2"))).toBe(false);
  });
  