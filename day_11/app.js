fetch("http://192.168.1.10:80/api/users")
  .then((res) => res.json())
  .then((values) => {
    console.log('result', values);
    let arrOfObj = values.result;
    let sno = document.querySelector(".snoData");
    let name = document.querySelector(".name");
    let tbtn = document.querySelector(".tbtn");
    arrOfObj.forEach((element) => {
      let boldTag = document.createElement("h4");
      let nameTag = document.createElement("h4");
      boldTag.classList.add("d-block", "py-3", "text-center");
      boldTag.innerHTML = element.id;
      nameTag.innerHTML = element.name.toUpperCase();
      nameTag.classList.add("d-block", "py-3", "text-center");
      let htmlDiv = document.createElement("div");
      htmlDiv.innerHTML = `<div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-danger sameViewBtn ${element.id}">View</button>
      <button type="button" class="btn btn-warning ">Delete</button>
      <button type="button" class="btn btn-success sameEditBtn edit${element.id}">Edit</button>
    </div>`;
      htmlDiv.classList.add("py-3");
      sno.append(boldTag);
      name.append(nameTag);
      tbtn.append(htmlDiv);
    });
    let allBtn = document.querySelectorAll(".sameViewBtn");
    let allEditBtn = document.querySelectorAll(".sameEditBtn");
    for (let btn of allBtn) {
      btn.addEventListener("click", () => {
        // console.log(btn.classList[3])
        fetch("http://192.168.1.10:80/api/users").then((res) =>
          res.json().then((val) => {
            let arrObj = val.result;

            let specificData = arrObj.filter(
              (ele) => ele.id == btn.classList[3]
            );

            //Modal code here
            swal(
              `Email: ${specificData[0].email} Number:${specificData[0].phone}`,
              `ADDRESS:${specificData[0].address} GENDER:${specificData[0].gender}`,
              "success"
            );
            //modal code end
          })
        );
      });
    }
    for (let i of allEditBtn) {
      i.addEventListener("click", () => {
        let id = i.classList[3].slice(4);

        fetch(`http://192.168.1.10/api/users/${id}`)
          .then((res) => res.json())
          .then((val) => {
            let row = document.querySelector(".row");
            row.innerHTML = "";
            console.log(val.data[0]);
            let formDiv = document.createElement("div");
            formDiv.innerHTML = `<form>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Name</label>
            <input type="text" class="form-control name" id="exampleInputEmail1" aria-describedby="emailHelp" value="${val.data[0].name}" name="name" >
            <div id="emailHelp" class="form-text">We'll never share your info with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Email</label>
            <input type="email" class="form-control email" id="exampleInputPassword1" value=${val.data[0].email} name="email">
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Address</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value=${val.data[0].address} name="address">
            <div id="emailHelp" class="form-text">We'll never share your info with anyone else.</div>
          </div>
        
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Gender</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value=${val.data[0].gender} name="gender">
            <div id="emailHelp" class="form-text">We'll never share your info with anyone else.</div>
          </div>

          <button type="submit" class="btn btn-primary editBtn">Submitssss</button>
        </form>`;

            row.append(formDiv);
            let subBtn = document.querySelector(".editBtn");
            let name = document.querySelector(".name");
            subBtn.addEventListener("click", (event) => {
              event.preventDefault();
              const body = {
                name: name.value,
              email: name.email
              }
              name = name.value;
              email = name.email;
              console.log("in submit", body);
              console.log(name);
              fetch(
                `http://192.168.1.10:80/api/user/update/${val.data[0].id}`,
                { method: "put", body: JSON.stringify(body) , headers: { 'Content-Type': 'application/json' } }
              )
                .then((res) => res.json())
                .then((val) => {
                  console.log(val);
                  swal("Updated!", "Successfully Updated!", "success");
                });
            });
          });
      });
    }

    let addUser = document.querySelector(".addUser");
    addUser.addEventListener("click", () => {
      let row = document.querySelector(".row");
      row.innerHTML = "";

      let formDiv = document.createElement("div");
      formDiv.innerHTML = `<form action="http://192.168.1.10:80/api/auth/register" method="POST">
          <div class="row">
          <div class="mb-3 col-6">
            <label for="exampleInputEmail1" class="form-label">Name</label>
            <input type="text" class="form-control name" id="exampleInputEmail1" aria-describedby="emailHelp"  name="name" >
            <div id="emailHelp" class="form-text">We'll never share your info with anyone else.</div>
          </div>
          <div class="mb-3 col-6">
            <label for="exampleInputPassword1" class="form-label">Email</label>
            <input type="email" class="form-control email" id="exampleInputPassword1" name="email">
          </div>

          <div class="mb-3 col-6">
            <label for="exampleInputEmail1" class="form-label">Address</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="address">
            <div id="emailHelp" class="form-text">We'll never share your info with anyone else.</div>
          </div>
        
          <div class="mb-3 col-6">
            <label for="exampleInputEmail1" class="form-label">Gender</label>
            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="gender" >
            <div id="emailHelp" class="form-text">We'll never share your info with anyone else.</div>
          </div>

          <div class="mb-3 col-6">
          <label for="exampleInputEmail1" class="form-label">Password</label>
          <input type="text" class="form-control " id="exampleInputEmail1" aria-describedby="emailHelp" name="password"  >
          <div id="emailHelp" class="form-text">We'll never share your info with anyone else.</div>
        </div>

        <div class="mb-3 col-6">
        <label for="exampleInputEmail1" class="form-label">Country</label>
        <input type="text" class="form-control name" id="exampleInputEmail1" aria-describedby="emailHelp" name="country" >
        <div id="emailHelp" class="form-text">We'll never share your info with anyone else.</div>
      </div>

      <div class="mb-3 col-6">
      <label for="exampleInputEmail1" class="form-label">State</label>
      <input type="text" class="form-control name" id="exampleInputEmail1" aria-describedby="emailHelp" name="state" >
      <div id="emailHelp" class="form-text">We'll never share your info with anyone else.</div>
    </div>

    <div class="mb-3 col-6">
    <label for="exampleInputEmail1" class="form-label">Phone</label>
    <input type="text" class="form-control name" id="exampleInputEmail1" aria-describedby="emailHelp" name="phone" >
    <div id="emailHelp" class="form-text">We'll never share your info with anyone else.</div>
  </div>

          <button type="submit" class="btn btn-primary editBtn col-12">Submit</button>
          <div>
        </form>`;
      row.append(formDiv);
    });
  });
