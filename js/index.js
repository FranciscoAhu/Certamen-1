
tinymce.init({
    selector: '#detalles-txt',
    height: 200,
    menubar: false,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste code help wordcount'
    ],
    toolbar: 'undo redo | formatselect | ' +
    'bold italic backcolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  });


  const reos =[];
  const cargarTabla = ()=>{
      let tbody = document.querySelector("#tbody-tabla");
      tbody.innerHTML = "";
      for(let i=0; i<reos.length;++i){
          let r = reos[i];

          let tr = document.createElement("tr");

          let tdNombre = document.createElement("td");
          let tdDetalles = document.createElement("td");
          let tdCiudades = document.createElement("td");
          let tdCrimenes = document.createElement("td")

          tdNombre.innerText = r.nombre;
          tdCiudades.innerHTML = r.ciudades
          let crimenes = document.createElement("i");
          if(r.crimenes < 4 ){
              crimenes.classList.add("fas","fa-frown","fa-3x","text-primary")
          }else if(r.crimenes < 7 && r.crimenes > 3){
              crimenes.classList.add("fas","fa-angry","fa-3x","text-warning")
          }else if(r.crimenes < 16 && r.crimenes > 6){
              crimenes.classList.add("fas","fa-tired","fa-3x","text-danger")
          }else if( r.crimenes > 15){
              crimenes.classList.add("fas","fa-skull","fa-3x","text-dark")
          }
          tdCrimenes.appendChild(crimenes)
          tdCrimenes.classList.add("text-center")
          tdDetalles.innerHTML = r.detalles;

          tr.appendChild(tdNombre);
          tr.appendChild(tdDetalles);
          tr.appendChild(tdCiudades);
          tr.appendChild(tdCrimenes);

          tbody.appendChild(tr);
      }
  }
  
  function cargar() {
    let ciudades = ["Viña del Mar", "Quilpué", "Santiago", "La Serena"]; 
    let select = document.querySelector("#ciudad-select"); 
  
    for(let i=0; i < ciudades.length; i++){ 
        let option = document.createElement("option"); 
        option.innerHTML = ciudades[i]; 
        select.appendChild(option); 
      }
  }
  cargar();

  document.querySelector("#registrar-btn").addEventListener("click", ()=>{
      let nombre = document.querySelector("#reo-txt").value;
      let apellido = document.querySelector("#reoA-txt").value;
      let detalles = tinymce.get("detalles-txt").getContent();
      let ciudades = document.querySelector("#ciudad-select").value;
      let crimenes = document.querySelector("#crimenes-num").value;
      
      let reo = {};

      reo.nombre = nombre+" "+apellido;
      reo.detalles = detalles;
      reo.ciudades = ciudades;
      reo.crimenes = crimenes;

      reos.push(reo);
      cargarTabla();
      Swal.fire("Registro de criminal realizado","Reo registrado.")
  });