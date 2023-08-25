function getAccessLevel() {
    const getErol = document.querySelector(".erol");
    const getInte = document.querySelector(".inte");
    const getUp = document.querySelector(".up");
    const getAdv = document.querySelector(".adv");
    const getCoh = document.querySelector(".coh");
    const getCour = document.querySelector(".cour");
    const getMth = document.querySelector(".mth");
    const getSett = document.querySelector(".sett");
 

    const getLevel = localStorage.getItem("adminLogin");
    const myLevel = JSON.parse(getLevel);
    const level = myLevel.user.access_level;

    if (level === 3) {
        getErol.style.display = "block";
        getInte.style.display = "block";
        getUp.style.display = "block";
        getAdv.style.display = "block";
        getCoh.style.display = "block";
        getCour.style.display = "block";
        getMth.style.display = "block";
        getSett.style.display = "block";
    }
    else if (level === 2) {
        getErol.style.display = "block";
        getCoh.style.display = "block";
        getCour.style.display = "block";
    }
    else {
        getCoh.style.display = "block";
        getCour.style.display = "block";
    }
}
getAccessLevel();