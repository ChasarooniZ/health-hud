Hooks.on("renderHotbar", (a, b, c, d, e, f) => {
    if (!game.user.isGM) {

        b[0].innerHTML = '<div class="flexcol" style="flex:0 0 11em; position: relative;display: flex;bottom: 94px;"> <div class="container"> <div class="d1"></div> <div class="d21" id="hlip" style="clip-path: inset(0% 0px 0%);"></div> <div class="d2" id="hfill" style="clip-path: inset(0% 0px 0px);"></div> <div class="d3"></div> <div class="d4"></div> </div> <div class="d5"></div></div>' + b[0].innerHTML
        var aaa = document.getElementById('action-bar');
        aaa.innerHTML += '<div class="flexcol" style="right:520px; position: fixed;display: flex;bottom: 155px;"> <div class="container"> <div class="d1"></div> <div class="a21" id="mlip" style="clip-path: inset(0% 0px 0%);"></div> <div class="a2" id="mfill" style="clip-path: inset(0% 0px 0px);"></div> <div class="d3"></div> <div class="d4"></div> </div> <div class="d5"></div></div>'
        aaa.style.flexWrap = 'nowrap';
    }

});

Hooks.on("controlToken", (a, b, c, d, e, f) => {
    if (!game.user.isGM) {
        if (game.user.data.character == a.actor.data._id) {
            hpme(a.actor.data.data.attributes.hp);
            maname(a.actor.data.data.spells);

        }
    }
});
Hooks.on("updateActor", (a, b, c, d, e, f) => {
    if (!game.user.isGM) {
        if (game.user.data.character == a.data._id) {
            hpme(a.data.data.attributes.hp);
            maname(a.data.data.spells)
        }
    }
});


function hpme(hp) {
    redme(hp.value, hp.max, 'h')
}

function maname(mana) {
    let spells = Object.entries(mana).filter((a) => a[0].startsWith('spell'));
    let curr = spells.map(a => a[1].value).reduce((acc, curr) => acc + curr);
    let total = spells.map(a => a[1].max).reduce((acc, curr) => acc + curr);
    redme(curr, total, 'm');
}

function redme(hp_current, hp_total, hm) {
    let curr_centage = 100 - ((hp_current / hp_total) * 100);
    document.getElementById(hm + "fill").style.clipPath = `inset(${curr_centage}% 0 0 0)`;
    document.getElementById(hm + "lip").style.clipPath = `inset(${curr_centage-2.5}% 0 ${100-curr_centage}% 0)`;
}
