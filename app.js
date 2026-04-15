const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

class Vehiculo {
    constructor(placa, marca, modelo) {
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
    }
}

class Almacen {
    constructor() {
        this.vehiculos = [];
    }

    agregar(vehiculo) {
        
        const existe = this.vehiculos.find(v => v.placa === vehiculo.placa);
        if (existe) {
            return { error: "Placa ya existente" };
        }

        this.vehiculos.push(vehiculo);
        return { mensaje: "Vehículo agregado correctamente" };
    }

    listar() {
        return this.vehiculos;
    }

    buscar(placa) {
        return this.vehiculos.find(v => v.placa === placa);
    }

    eliminar(placa) {
        const existe = this.buscar(placa);

        if (!existe) {
            return { error: "Vehiculo no encontrado" };
        }

        this.vehiculos = this.vehiculos.filter(v => v.placa !== placa);
        return { mensaje: "Vehiculo eliminado correctamente" };
    }
}

const almacen = new Almacen();

app.get("/vehiculos", (req, res) => {
    res.json(almacen.listar());
});

app.get("/vehiculos/:id", (req, res) => {
    const vehiculo = almacen.buscar(req.params.id);

    if (!vehiculo) {
        return res.status(404).json({ error: "Vehiculo no encontrado" });
    }

    res.json(vehiculo);
});

app.post("/vehiculos", (req, res) => {
    const { placa, marca, modelo } = req.body;

    if (!placa || !marca || !modelo) {
        return res.status(400).json({ error: "Datos incompletos" });
    }

    const nuevoVehiculo = new Vehiculo(placa, marca, modelo);
    const resultado = almacen.agregar(nuevoVehiculo);

    if (resultado.error) {
        return res.status(400).json(resultado);
    }

    res.json(resultado);
});

app.delete("/vehiculos/:id", (req, res) => {
    const resultado = almacen.eliminar(req.params.id);

    if (resultado.error) {
        return res.status(404).json(resultado);
    }

    res.json(resultado);
});


app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});