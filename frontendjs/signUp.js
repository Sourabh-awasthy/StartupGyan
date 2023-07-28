const form=document.querySelector("form");

form.addEventListener("submit",async(e)=>{
  const email=document.querySelector("#userId").value;
const phone=document.querySelector("#mobileNo").value;
const password2=document.querySelector("#password").value;
const name=document.querySelector("#name").value;
const submit=document.querySelector("#submit");

  const body={ email, password:password2, name, phone }
  console.log(body)
  let res;
  e.preventDefault();
    try {
         res = await fetch("http://localhost:3001/signup", {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-type": "application/json" },
        });
        const data = await res.json();
        console.log(data);
        // console.log(data);
        if (data.errors) {
          document.querySelector(".email.error").textContent = data.errors.email;
          document.querySelector(".password.error").textContent =
            data.errors.password;
        }
        const div=document.createElement("div");
        div.innerHTML=data.user.name;
       document.querySelector("body").appendChild(div)
       
        if (data.success) {
          location.assign("/");
         
        }
      } catch (e) {
        console.log(e)
      }
      
})



