window.onload = function () {
    console.log("Loaded site");
  };

const hamburer = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");

if (hamburer) {
hamburer.addEventListener("click", () => {
navList.classList.toggle("open");
});
}


function validate() {
  let name = document.querySelector(".Contactname");
  let email = document.querySelector(".Contactemail");
  let msg = document.querySelector(".Contactmessage");
  let btn = document.querySelector(".Contactsend");

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    if (name.value == "" || email.value == "" || msg.value == "") {
      emptyerror();
    } else {
      sendmail(name.value, email.value, msg.value);
      success();
    }
  });
}
validate();

function sendmail(name, email, msg) {
  emailjs.send("service_sr9pa0n", "template_2nf7gmu", {
    to_name: "rentcaproject@gmail.com",
    from_name: email,
    message: msg,
  });
}

function emptyerror() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Fields cannot be empty!",
  });
}

function error() {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Something went wrong!",
  });
}

function success() {
   Swal.fire({
    icon: "success",
    title: "Success...",
    text: "Successfully sent message",
  });
}