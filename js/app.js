let gastos = [
  new Gasto("internet", 70),
  new Gasto("comida", 150),
  new Gasto("agua", 80),
  new Gasto("extra", 20)
];
let entradas = [
  new Entrada("propina de mamá", 90),
  new Entrada("propina de papa", 1),
  new Entrada("propina de la abuela", 100),
  new Entrada("trabajo", 500),
];
addEventListener("load", () => {
  cabecera();
  insertIngresos(entradas);
  insertEgresos(gastos);
});
const cabecera = () => {
  let sumaTotal = sumaDeValor(entradas) - sumaDeValor(gastos);
  document.getElementById("total_money").innerHTML = formato(sumaTotal);
  document.getElementById("ingreso_total").innerHTML = formato(
    sumaDeValor(entradas)
  );
  document.getElementById("egreso_total").innerHTML = formato(
    sumaDeValor(gastos)
  );
  document.getElementById("porcentaje_total").innerHTML = formato(
    formatoPorcentaje(sumaDeValor(gastos) / sumaDeValor(entradas))
  );
};

const sumaDeValor = (valor) => {
  let sumaTotal = 0;
  valor.forEach((e) => {
    sumaTotal += e.valor;
  });
  return sumaTotal;
};
const formato = (value) => {
  return value.toLocaleString("es-ES", {
    style: "currency",
    minimumFractionDigits: 2,
    currency: "PEN",
  });
};
const formatoPorcentaje = (value) => {
  return value.toLocaleString("en-US", {
    style: "percent",
    minimumFractionDigits: 1,
  });
};
const insertIngresos = (value) => {
  let listaIngreso = document.getElementById("lista_ingresos");
  listaIngreso.innerHTML = "";
  value.forEach((elemt) => {
    let li = document.createElement("li");
    let descripcion = document.createElement("h4");
    let contenedor = document.createElement("div");
    let i = document.createElement("i");
    let dinero = document.createElement("span");
    let btn = document.createElement("button");
    descripcion.innerHTML = elemt.descripcion;
    dinero.classList.add("dinero", "color_ingreso");
    dinero.innerHTML = formato(elemt.valor);
    btn.classList.add("btn_delete");
    i.classList.add("fa-solid", "fa-trash");
    contenedor.appendChild(dinero);
    btn.append(i);
    li.appendChild(descripcion);
    li.appendChild(contenedor);
    li.appendChild(btn);
    listaIngreso.appendChild(li);
    btn.addEventListener("click", () => {
      let idEncontrado = entradas.findIndex((dato) => elemt.id === dato.id);
      entradas.splice(idEncontrado, 1);
      cabecera();
      insertIngresos(entradas);
    });
  });
};
const insertEgresos = (value) => {
  let listaEgreso = document.getElementById("lista_egresos");
  let totalGastos = sumaDeValor(gastos);
  listaEgreso.innerHTML = "";
  value.forEach((elemt) => {
    let li = document.createElement("li");
    let descripcion = document.createElement("h4");
    let contenedor = document.createElement("div");
    let i = document.createElement("i");
    let dinero = document.createElement("span");
    let porcent = document.createElement("span");
    let btn = document.createElement("button");
    descripcion.innerHTML = elemt.descripcion;
    dinero.classList.add("dinero", "color_egreso");
    porcent.classList.add("dinero_porcentaje");
    porcent.innerHTML = formatoPorcentaje(elemt.valor / totalGastos);
    dinero.innerHTML = formato(elemt.valor);
    btn.classList.add("btn_delete");
    i.classList.add("fa-solid", "fa-trash");
    contenedor.classList.add("container_lista--egresos");
    contenedor.appendChild(dinero);
    contenedor.appendChild(porcent);
    btn.append(i);
    li.appendChild(descripcion);
    li.appendChild(contenedor);
    li.appendChild(btn);
    listaEgreso.appendChild(li);
    btn.addEventListener("click", () => {
        let idEncontrado = gastos.findIndex((dato) => elemt.id === dato.id);
        gastos.splice(idEncontrado, 1);
        cabecera();
        insertEgresos(gastos);
      });
  });
};

const form = document.forms['form'];
const btnAdd = document.getElementById('add');
btnAdd.addEventListener('click',(e)=>{
      e.preventDefault()
      let tipo = form[0].value;
      let descripcion = form[1].value;
      let valor = form[2].value;
      if(descripcion !== ''&& valor !== ''){
        if(tipo === 'ingreso'){
            entradas.push(new Entrada(descripcion,parseInt(valor)))
          }else{
            gastos.push(new Gasto(descripcion,parseInt(valor)))
          }
          cabecera();
          insertIngresos(entradas);
          insertEgresos(gastos);
      }
      descripcion = form[1].value='';
      valor = form[2].value='';
})
