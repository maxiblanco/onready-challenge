class Vehiculo {
  constructor(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
  }
  priceAsString() {
    const currency = new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(this.precio);
    return currency;
  }
}

class Auto extends Vehiculo {
  constructor(marca, modelo, puertas, precio) {
    super(marca, modelo, precio);
    this.puertas = puertas;
    this.precio = precio;
  }
}

class Moto extends Vehiculo {
  constructor(marca, modelo, cilindrada, precio) {
    super(marca, modelo, precio);
    this.cilindrada = cilindrada;
    this.precio = precio;
  }
}

const vehicles = [
  new Auto('Peugeot', '206', 4, 200000),
  new Moto('Honda', 'Titan', '125c', 60000),
  new Auto('Peugeot', '208', 5, 250000),
  new Moto('Yamaha', 'YBR', '160c', 80500.5),
];

function objPropsToString(obj) {
  let arr = [];
  for (const key in obj) {
    if (key === 'precio') {
      arr.push(
        `${
          key[0].toUpperCase() + key.slice(1)
        }: ${obj.priceAsString()}`
      );
    } else {
      arr.push(`${key[0].toUpperCase() + key.slice(1)}: ${obj[key]}`);
    }
  }
  const objAsString = arr.reduce((acc, current, index) => {
    if (index === 0) {
      return current;
    } else {
      return acc + ' // ' + current;
    }
  }, '');
  return objAsString;
}

const sortedByPrice = [...vehicles].sort((a, b) => {
  if (parseInt(a.precio) > parseInt(b.precio)) {
    return -1;
  }
  if (parseInt(a.precio) < parseInt(b.precio)) {
    return 1;
  }
  return 0;
});

function printVehicles(arr) {
  for (const vehicle of arr) {
    console.log(objPropsToString(vehicle));
  }
}

function printMostExpensive() {
  const mostExpensive = sortedByPrice[0];
  const message = `Vehículo más caro: ${mostExpensive.marca} ${mostExpensive.modelo}`;
  console.log(message);
}

function printLeastExpensive() {
  const leastExpensive = sortedByPrice[sortedByPrice.length - 1];
  const message = `Vehículo más barato: ${leastExpensive.marca} ${leastExpensive.modelo}`;
  console.log(message);
}

function filterVehicles(letter, array) {
  const target = array.filter((value) =>
    value.modelo.toLowerCase().includes(letter.toLowerCase())
  )[0];
  return `${target.marca} ${target.modelo} ${target.priceAsString()}`;
}

printVehicles(vehicles);
console.log('=============================');
printMostExpensive();
printLeastExpensive();
console.log(
  `Vehículo que contiene en el modelo la letra 'Y':`,
  filterVehicles('Y', vehicles)
);
console.log('=============================');
console.log(`Vehículos ordenados por precio de mayor a menor:`);
sortedByPrice
  .map(({ marca, modelo }) => `${marca} ${modelo}`)
  .forEach((value) => console.log(value));
