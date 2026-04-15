const API_URL = "http://localhost:3000/vehiculos";

async function agregarVehiculo() {
    const placa = document.getElementById("placa").value;
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;

    if (!placa || !marca || !modelo) return alert("Llena todos los campos");

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placa, marca, modelo })
    });

    const data = await res.json();
    if (data.error) alert(data.error);
    else alert(data.mensaje);
    listarVehiculos();
}

async function listarVehiculos() {
    const res = await fetch(API_URL);
    const vehiculos = await res.json();
    const cuerpo = document.getElementById("listaCuerpo");
    
    cuerpo.innerHTML = ""; 

    vehiculos.forEach(v => {
        cuerpo.innerHTML += `
            <tr>
                <td>${v.placa}</td>
                <td>${v.marca}</td>
                <td>${v.modelo}</td>
            </tr>
        `;
    });
}

async function buscarVehiculo() {
    const placa = document.getElementById("placa").value;
    if (!placa) return alert("Escribe una placa");

    const res = await fetch(`${API_URL}/${placa}`);
    if (res.status === 404) return alert("No encontrado");

    const v = await res.json();
    document.getElementById("listaCuerpo").innerHTML = `
        <tr>
            <td>${v.placa}</td>
            <td>${v.marca}</td>
            <td>${v.modelo}</td>
        </tr>
    `;
}

async function eliminarVehiculo() {
    const placa = document.getElementById("placa").value;
    if (!placa) return alert("Escribe la placa");

    const res = await fetch(`${API_URL}/${placa}`, { method: "DELETE" });
    const data = await res.json();
    alert(data.mensaje || data.error);
    listarVehiculos();
}