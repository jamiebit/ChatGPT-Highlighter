document.addEventListener('DOMContentLoaded', () => {
  var switchButton = document.getElementById("inter")
  var switchOuter = document.getElementById("outer")
  console.log("hi")

  switchOuter.addEventListener('click', () => {
    if(switchButton.checked == true){
      switchOuter.classList.add("neubtn-move")
  }else{
      switchOuter.classList.remove("neubtn-move")

  }
  });
});