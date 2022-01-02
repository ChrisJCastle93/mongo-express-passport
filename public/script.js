const btns = document.getElementsByClassName("btn2");
const editBtns = document.getElementsByClassName("btn3");

const btnsArr = [...btns];
const editBtnsArr = [...editBtns];

// btnsArr.forEach(function (element) {
//   element.addEventListener("click", function (e) {
//     const nodeToDelete = e.target.parentNode.parentNode.parentNode;
//     nodeToDelete.remove();
//   });
// });

editBtnsArr.forEach(function (element) {
  element.addEventListener("click", function (e) {
    const node = e.target.parentNode.parentNode.getAttribute('data-id');
    const container = document.getElementById("container");
    const form = document.getElementById("form");
    // const btn = document.getElementById("addbtn");
    form.style.display = 'none';
    const div = document.createElement('div');
    const codeToInsert = `
    <form style="display: inline;"action="api/members/${node}/update" method="POST">
    <div class="form-group">
    <label for="name">Name</label>
    <input
      type="text"
      id="nameInp"
      name="name"
      class="form-control"
    />
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input
      type="email"
      id="emailInp"
      name="email"
      class="form-control"
    />
  </div>
        <input type="submit" value="Update Member" class="btn btn-success btn-block">
    </form>`;
    div.innerHTML = codeToInsert;
    container.insertBefore(div, container.childNodes[4]);
    const nameInp = document.getElementById("nameInp");
    const emailInp = document.getElementById("emailInp");
    const nameToEdit = e.target.parentNode.parentNode.innerText.split(':')[0];
    const emailToEdit = e.target.parentNode.parentNode.innerText.split(':')[1];
    const idToEdit = e.target.parentNode.parentNode.getAttribute('data-id');
    nameInp.setAttribute('value', nameToEdit);
    nameInp.setAttribute('data-id', idToEdit);
    emailInp.setAttribute('value', emailToEdit);
  });
});
  