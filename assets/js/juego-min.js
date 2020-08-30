const miModulo = (() => { "use strict"; let e = []; const t = ["C", "D", "H", "S"],
        n = ["A", "J", "Q", "K"]; let r = []; const a = document.querySelector("#btnPedir"),
        o = document.querySelector("#btnDetener"),
        s = document.querySelector("#btnNuevo"),
        l = document.querySelectorAll("small"),
        d = document.querySelectorAll(".divCartas"),
        c = (t = 2) => { e = u(), r = []; for (let e = 0; e < t; e++) r.push(0);
            l.forEach(e => e.innerText = 0), d.forEach(e => e.innerHTML = ""), a.disabled = !1, o.disabled = !1 },
        u = () => { e = []; for (let n = 2; n <= 10; n++)
                for (let r of t) e.push(n + r); for (let r of t)
                for (let t of n) e.push(t + r); return _.shuffle(e) },
        i = () => { if (0 === e.length) throw "No hay cartas en el deck"; return e.pop() },
        b = (e, t) => (r[e] += (e => { const t = e.substring(0, e.length - 1); return isNaN(t) ? "A" === t ? 11 : 10 : 1 * t })(t), l[e].innerText = r[e], r[e]),
        m = (e, t) => { const n = document.createElement("img");
            n.src = `assets/cartas/${e}.png`, n.classList.add("carta"), d[t].append(n) },
        f = e => { let t = 0;
            do { const e = i();
                t = b(r.length - 1, e), m(e, r.length - 1) } while (t < e && e <= 21);
            (() => { const [e, t] = r;
                setTimeout(() => { t === e ? alert("Hubo un empate!!!") : e > 21 ? alert("Computadora gana") : t > 21 ? alert("Jugador Gana") : alert("Computadora Gana") }, 10) })() }; return a.addEventListener("click", () => { const e = i(),
            t = b(0, e);
        m(e, 0), t > 21 ? (console.warn("Perdiste, te pasaste"), a.disabled = !0, o.disabled = !0, f(t)) : 21 === t && (console.warn("Ganaste, obtuviste 21"), a.disabled = !0, o.disabled = !0, f(t)) }), o.addEventListener("click", () => { a.disabled = !0, o.disabled = !0, f(r[0]) }), s.addEventListener("click", () => { c() }), { nuevoJuego: c } })();