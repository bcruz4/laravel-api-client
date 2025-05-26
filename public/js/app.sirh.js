$(document).ready(function() {
  $.ajaxSetup({
    cache: false,
  });
  $(document).on('ajaxStart', function() {
    $('#cargando').show();
  }).on('ajaxComplete', function() {
    $('#cargando').hide();
  });
  
  fn_menu();
  fn_principal();

  /*
  $('*').bind("cut copy",function(e) {
    e.preventDefault();
  });
  */

  $('.content-wrapper').append(
    $('<div>').attr('id', 'cargando').append(
      $('<img>').attr('src', 'img/loading.gif').attr('alt', 'Cargando...').attr('width', '32')
    ).css({
      position: 'absolute',
      display: 'none'
    })
  );
  $(document).mousemove(function(e) {
    $('#cargando').css({
      left: e.pageX + 10,
      top: e.pageY + 15
    });
  });

});

function valida_numeros(e) {
  tecla = (document.all) ? e.keyCode : e.which;
  //Tecla de retroceso para borrar, siempre la permite
  if (tecla == 8) {
    return true;
  }
  if (e.keyCode == 9) {
    return true;
  }
  // Patron de entrada, en este caso solo acepta numeros
  patron = /[0-9]/;
  tecla_final = String.fromCharCode(tecla);
  return patron.test(tecla_final);
}
function valida_numeros_decimales(e) {
  tecla = (document.all) ? e.keyCode : e.which;
  //Tecla de retroceso para borrar, siempre la permite
  if (tecla == 8) {
    return true;
  }
  if (e.keyCode == 9) {
    return true;
  }
  // Patron de entrada, en este caso solo acepta numeros
  patron = /[0-9.]/;
  tecla_final = String.fromCharCode(tecla);
  return patron.test(tecla_final);
}

function valida_ci(e) {
  tecla = (document.all) ? e.keyCode : e.which;
  // tecla = (e.which) ? e.which : e.keyCode;
  //Tecla de retroceso para borrar, siempre la permite
  if (tecla == 8) {
    return true;
  }
  if (e.keyCode == 9) {
    return true;
  }
  if (e.keyCode == 109) {
    return true;
  }
  tecla_final = String.fromCharCode(tecla);

  // Patron de entrada, en este caso solo acepta numeros
  patron = /[0-9RN-]/;
  return patron.test(tecla_final);
}

// function valida_fecha(e){
//   tecla = (document.all) ? e.keyCode : e.which;
//   //Tecla de retroceso para borrar, siempre la permite
//   if (tecla==8){
//       return true;
//   }
//   // Patron de entrada, en este caso solo acepta numeros
//   patron =/^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
//   tecla_final = String.fromCharCode(tecla);
//   return patron.test(tecla_final);
// }



function errores(jqXHR) {
  var msg = '';
  if (jqXHR.status === 0) {
    msg = 'No conectado.\n Verifique la conexión a internet.';
  } else if (jqXHR.status == 404) {
    msg = 'Pagina no encotrada. [404]';
  } else if (jqXHR.status == 401) {
    msg = 'No autorizado. [401]';
  } else if (jqXHR.status == 422) {
    msg = 'Entidad improsesable. [422]';
  } else if (jqXHR.status == 500) {
    msg = 'Error interno del Servidor [500].';
  } else if (exception === 'parsererror') {
    msg = 'Solicitud JSON fallido.';
  } else if (exception === 'timeout') {
    msg = 'Error de tiempo de espera.';
  } else if (exception === 'abort') {
    msg = 'Petición Ajax agotado.';
  } else {
    msg = 'Error no capturado.\n' + jqXHR.responseText;
  }
  return msg;
}

function fn_menu() {
  $.ajax({
    url: 'menus',
    type: 'GET',
    success: function(data) {
      $(".sidebar-menu").html(data);
    },
    error: function(jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (menu)\n\n' + errores(jqXHR) + '\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_principal() {
  $.ajax({
    url: 'principal',
    type: 'GET',
    success: function(data) {
      $(".content").html(data);
    },
    error: function(jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n' + errores(jqXHR) + '\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_config_roles() {
  $.ajax({
    url: 'rol',
    type: 'GET',
    success: function(data) {
      $(".content").html(data);
      fn_lista_roles();
    },
    error: function(jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n' + errores(jqXHR) + '\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_config_manuales() {
  $.ajax({
    url: 'manual',
    type: 'GET',
    success: function(data) {
      $(".content").html(data);
      fn_lista_manuales();
    },
    error: function(jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n' + errores(jqXHR) + '\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_config_menus() {
  $.ajax({
    url: 'menu',
    type: 'GET',
    success: function(data) {
      $(".content").html(data);
    },
    error: function(jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n' + errores(jqXHR) + '\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
/*
function fn_config_usuarios() {
  $.ajax({
    url: 'user',
    type: 'GET',
    success: function(data) {
      $(".content").html(data);
      fn_lista_usuarios();
    },
    error: function(jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n' + errores(jqXHR) + '\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}*/
function fn_frm_nuevo_user()
{      
    $.ajax({
        url:"user/create",
        type: 'GET',
        success:function(data){
            $(".content").html(data);
        },
        error: function (jqXHR, exception) {
            alert('Opps!!! Ocurrrio un error al cargar el contenido\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
            //location.reload();
        },
    });    
}
function fn_config_personas() {
  $.ajax({
      url: "persona",
      type: "GET",
      success: function (data) {
          $(".content").html(data);
          fn_lista_buscar_persona();
      },
      error: function (jqXHR, exception) {
          alert(
              "Opps!!! Ocurrrio un error (persona)\n\n" +
                  errores(jqXHR) +
                  "\n\nPor favor actualice la página y vuelva a intentarlo."
          );
      },
  });
}
function fn_config_documentacion_digital() {
  $.ajax({
      url: "documentacion_digital",
      type: "GET",
      success: function (data) {
          $(".content").html(data);
          fn_lista_buscar_documentacion_digital();
      },
      error: function (jqXHR, exception) {
          alert(
              "Opps!!! Ocurrrio un error (Documentacion Digital)\n\n" +
                  errores(jqXHR) +
                  "\n\nPor favor actualice la página y vuelva a intentarlo."
          );
      },
  });
}
function fn_config_renuncias() {
  $.ajax({
      url: "renuncia",
      type: "GET",
      success: function (data) {
          $(".content").html(data);
          fn_lista_buscar_renuncia();
      },
      error: function (jqXHR, exception) {
          alert(
              "Opps!!! Ocurrrio un error (persona)\n\n" +
                  errores(jqXHR) +
                  "\n\nPor favor actualice la página y vuelva a intentarlo."
          );
      },
  });
}
function fn_config_interinatos() {
  $.ajax({
      url: "interinato",
      type: "GET",
      success: function (data) {
          $(".content").html(data);
          fn_lista_buscar_interinato();
      },
      error: function (jqXHR, exception) {
          alert(
              "Opps!!! Ocurrrio un error (persona)\n\n" +
                  errores(jqXHR) +
                  "\n\nPor favor actualice la página y vuelva a intentarlo."
          );
      },
  });
}
function fn_config_comisiones() {
  $.ajax({
      url: "comision",
      type: "GET",
      success: function (data) {
          $(".content").html(data);
          fn_lista_buscar_comision();
      },
      error: function (jqXHR, exception) {
          alert(
              "Opps!!! Ocurrrio un error (persona)\n\n" +
                  errores(jqXHR) +
                  "\n\nPor favor actualice la página y vuelva a intentarlo."
          );
      },
  });
}
function fn_designacion_funciones() {
  $.ajax({
      url: "designacion",
      type: "GET",
      success: function (data) {
          $(".content").html(data);
          fn_lista_buscar_designacion();
      },
      error: function (jqXHR, exception) {
          alert(
              "Opps!!! Ocurrrio un error (persona)\n\n" +
                  errores(jqXHR) +
                  "\n\nPor favor actualice la página y vuelva a intentarlo."
          );
      },
  });
}

function fn_config_planilla_historica() {
  $.ajax({
      url: "planilla_historica",
      type: "GET",
      success: function (data) {
          $(".content").html(data);
          //fn_lista_planilla_historica();
      },
      error: function (jqXHR, exception) {
          alert(
              "Opps!!! Ocurrrio un error (persona)\n\n" +
                  errores(jqXHR) +
                  "\n\nPor favor actualice la página y vuelva a intentarlo."
          );
      },
  });
}
function fn_config_planilla_historica_persona() {
  $.ajax({
      url: "planilla_historica_persona",
      type: "GET",
      success: function (data) {
          $(".content").html(data);
          //fn_lista_planilla_historica();
      },
      error: function (jqXHR, exception) {
          alert(
              "Opps!!! Ocurrrio un error (persona)\n\n" +
                  errores(jqXHR) +
                  "\n\nPor favor actualice la página y vuelva a intentarlo."
          );
      },
  });
}
function fn_config_documentacion_funcionario() {
  $.ajax({
      url: "documentacion_funcionario",
      type: "GET",
      success: function (data) {
          $(".content").html(data);
          fn_lista_documentacion_funcionario();
      },
      error: function (jqXHR, exception) {
          alert(
              "Opps!!! Ocurrrio un error (persona)\n\n" +
                  errores(jqXHR) +
                  "\n\nPor favor actualice la página y vuelva a intentarlo."
          );
      },
  });
}
function fn_perfil() {
  $.ajax({
    url: 'perfil',
    type: 'GET',
    success: function(data) {
      $(".content").html(data);
    }
  });
}

function fn_config_escala_salarial() {
  $.ajax({
    url: 'escala_salarial',
    type: 'GET',
    success: function(data) {
      $(".content").html(data);
      fn_lista_escala_salarial();
    },
    error: function(jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n' + errores(jqXHR) + '\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_ayuda() {
  $.ajax({
    url: 'mostrar_ayuda',
    type: 'GET',
    success: function(data) {
      $(".content").html(data);
      fn_lista_ayudas();
    },
    error: function(jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n' + errores(jqXHR) + '\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

//aumentado de SIRH

//PARAMETRICAS

function fn_config_afps()
{
  $.ajax({
    url:'afp',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_afps();
    },
    error: function (jqXHR, exception) {
      alert('Ops!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_minimos()
{
  $.ajax({
    url:'minimos',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_minimos();
    },
    error: function (jqXHR, exception) {
      alert('Ops!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}


function fn_config_seguros()
{
  $.ajax({
    url:'seguro',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_seguros();
    },
    error: function (jqXHR, exception) {
      alert('Ops!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_bancos(){
  $.ajax({
    url:'banco',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_bancos();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

//VACACIONES

function fn_config_vacacion(){
  $.ajax({
    url:'vacacion',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_personal();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_registro_user_cas()
{
  $.ajax({
    url:'RegistroCategoriaBasica',
    type:'GET',
    success:function(data){
      $(".content").html(data);
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_config_idiomas(){
  $.ajax({
    url:'idioma',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_idiomas();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}


function fn_config_profesiones()
{
  $.ajax({
    url:'profesion',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_profesiones();
    },
    error: function (jqXHR, exception) {
      alert('Ops!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_accidentes()
{
  $.ajax({
    url:'accidente',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_estructuras();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_config_definicion_renuncia_items()
{  
  $.ajax({
    url:'renuncia',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_renuncias();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_config_subsidios()
{
  $.ajax({
    url:'subsidio',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_estructuras();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_config_memorandums()
{
  $.ajax({
    url:'memorandum',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_estructuras();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
function fn_config_compromisos()
{
  $.ajax({
    url:'compromisos',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_compromisos();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
function fn_config_cargos(){
  $.ajax({
    url:'ctg_cargos_item',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_ctg_cargos_item();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
function fn_config_cargos_especificos(){
  $.ajax({
    url:'ctg_cargos_especificos',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_ctg_cargos_especificos();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_config_asignaciones()
{    
  $.ajax({
    url:'planillas',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_planillas();

    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
function fn_config_altas()
{    
  $.ajax({
    url:'planillas_altas',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_planillas_altas();

    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
function fn_config_seguimiento_enlaces()
{    
  $.ajax({
    url:'planillas_enlaces',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_planillas_enlaces();

    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
function fn_formularios() {
  $.ajax({
      url: "formulario",
      type: "GET",
      success: function (data) {
          $(".content").html(data);
          fn_lista_formularios();
      },
      error: function (jqXHR, exception) {
          alert(
              "Opps!!! Ocurrrio un error (referencia)\n\n" +
                  errores(jqXHR) +
                  "\n\nPor favor actualice la página y vuelva a intentarlo."
          );
      },
  });
}

function fn_armar_formularios() {
  $.ajax({
      url: "armar_formulario",
      type: "GET",
      success: function (data) {
          $(".content").html(data);
      },
      error: function (jqXHR, exception) {
          alert(
              "Opps!!! Ocurrrio un error (referencia)\n\n" +
                  errores(jqXHR) +
                  "\n\nPor favor actualice la página y vuelva a intentarlo."
          );
      },
  });
}
function fn_config_altas_rezagados()
{    
  $.ajax({
    url:'planillas_altas_rezagados',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_planillas_altas_rezagados();

    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
function fn_config_actualizacion_entrega()
{    
  $.ajax({
    url:'planillas_altas_actualizacion',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_planillas_altas();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
function fn_config_visor_asignaciones()
{    
  $.ajax({
    url:'planilla_asignaciones',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_planillas_altas();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
function fn_configuracion_bajas()
{    
  $.ajax({
    url:'planillas_bajas',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_planillas_bajas();

    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
function fn_config_transferencias()
{    
  $.ajax({
    url:'planillas_transferencias',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_planillas_transferencias();

    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
function fn_config_edicion_asignaciones()
{    
  $.ajax({
    url:'edita_planillas',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_planillas();

    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}


function fn_establecimientos_snis()
{    
  $.ajax({
    url:'establecimientos_de_salud',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_establecimientos_salud();

    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
//oswaldo
function fn_config_antecedentes()
{
  $.ajax({
    url:'antecedente',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_estructuras();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_config_violencias()
{
  $.ajax({
    url:'violencia',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_estructuras();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_config_procesos()
{
  $.ajax({
    url:'proceso',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_estructuras();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_config_discapacidadinamobilidades()
{
  $.ajax({
    url:'discapacidadinamobilidad',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_estructuras();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
//parametricas de Categoria Basica
function fn_config_categoriabasicas()
{
  $.ajax({
    url:'categoriabasica',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_categoriabasicas();
    },
    error: function (jqXHR, exception) {
      alert('Ops!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_categoriaprofesional()
{
  $.ajax({
    url:'categoriaprofesional',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_categoriaprofesionales();
    },
    error: function (jqXHR, exception) {
      alert('Ops!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}


function fn_config_inamovilidades()
{
  $.ajax({
    url:'inamovilidad',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_estructuras();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_config_incrementos(){
  $.ajax({
    url:'incremento',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_incrementos();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_decrementos(){
  $.ajax({
    url:'decremento',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_decrementos();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_facturas()
{
  $.ajax({
    url:'factura',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_estructuras();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}


function fn_config_tipo_inamobilidades()
{
  $.ajax({
    url:'tipoinamobilidad',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_tipoinamobilidades();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_tipo_accidentes()
{
  $.ajax({
    url:'tipoaccidente',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_tipoaccidentes();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_tipo_memorandums()
{
  $.ajax({
    url:'tipomemorandum',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_tipomemorandums();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_escalafones()
{
  $.ajax({
    url:'escalafon',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_escalafones();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_config_gestion_mes()
{
  $.ajax({
    url:'gestion_mes',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_gestion_meses();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}
function fn_config_fuentes()
{
  $.ajax({
    url:'fuente',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_fuentes();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_organismos()
{
  $.ajax({
    url:'organismo',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_organismos();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}


function fn_config_planillas()
{
  $.ajax({
    url:'ctg_planillas',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_ctg_lista_planillas();      
    },
    error: function (jqXHR, exception) {
      alert('Oppsssss!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_definicion_items()
{
  $.ajax({
    url:'item',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_items();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_config_estructuras(){
  $.ajax({
    url:'estructura',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_estructuras();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
function fn_config_declaraciones(){
  $.ajax({
    url:'declaracion',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_estructuras();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_consultas_cumpleaneros(){
  $.ajax({
    url:'consultas_cumpleaneros',
    type:'GET',
    success:function(data){
      $(".content").html(data);
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}
function fn_config_alta_masiva_de_items()
{
  $.ajax({
    url:'alta_masiva',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_alta_masivas();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}
function fn_config_reporte_entrega() {
  $.ajax({
      url: "reporte_entrega",
      type: "GET",
      success: function (data) {
          $(".content").html(data);
      },
      error: function (jqXHR, exception) {
          Swal.fire(
              "Opps!!! Ocurrrio un error (principal)\n\n" +
                  errores(jqXHR) +
                  "\n\nPor favor actualice la página y vuelva a intentarlo."
          );
      },
  });
}
function fn_config_reporte_entrega_excel() {
  $.ajax({
      url: "reporte_entrega_boletas",
      type: "GET",
      success: function (data) {
          $(".content").html(data);
      },
      error: function (jqXHR, exception) {
          Swal.fire(
              "Opps!!! Ocurrrio un error (principal)\n\n" +
                  errores(jqXHR) +
                  "\n\nPor favor actualice la página y vuelva a intentarlo."
          );
      },
  });
}
function fn_georeferenciacion() {
  $.ajax({
    url:'georeferenciacion',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_buscar_georeferenciacion();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}
function fn_config_bajas(){
  $.ajax({
    url:'baja',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_estructuras();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_config_discapacidades()
{
  $.ajax({
    url:'discapacidad',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_discapacidades();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}
function fn_frm_planilla(){
  $.ajax({
    url:'frm_planilla',
    type:'GET',
    success:function(data){
      $(".content").html(data);
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}
// CAS
function fn_config_cas(){
  $.ajax({
    url:'cas',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_personal();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

// BONO FRONTERA
function fn_config_frontera(){
  $.ajax({
    url:'frontera',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_personal();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

// DIAS VACACION
function fn_config_dias(){
  $.ajax({
    url:'dias',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_dias();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

// FISCO
function fn_config_fisco(){
  $.ajax({
    url:'fisco',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_personal();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

// EXAMEN PREOCUPACIONAL
function fn_config_examen(){
  $.ajax({
    url:'examen',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_personal();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

// CERTIFICADOS DE COMPATIBILIDAD
function fn_config_compatibilidad()
{
  $.ajax({
    url:'compatibilidad',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_compatibilidad();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}


function fn_config_descuentos()
{
  $.ajax({
    url:'descuento',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_estructuras();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

//PERIODO DE VACACION
function fn_config_periodo()
{
  $.ajax({
    url:'periodo',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_periodo();
    },
    error: function (jqXHR, exception) {
      alert('Ops!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

// CERTIFICADO DE TRABAJO
function fn_config_certificado(){
  $.ajax({
    url:'certificado_trabajo',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_personal();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

// INSTITUCIONALIZACION
function fn_config_inst(){
  $.ajax({
    url:'institucionalizacion',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_personal();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

// GESTACION
function fn_config_gestacion(){
  $.ajax({
    url:'gestacion',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_personal();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

// VACACION GESTION
function fn_config_vacges(){
  $.ajax({
    url:'vacacion_gestion',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_personal();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_tipo_bajas()
{
  $.ajax({
    url:'tipobaja',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_tipobajas();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

//para parametrica de Titulos
function fn_config_titulos()
{
  $.ajax({
    url:'titulo',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_titulos();
    },
    error: function (jqXHR, exception) {
      alert('Ops!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_reportes_vacaciones(){
  $.ajax({
    url:"mostrar_reportes",
    type: 'GET',
    success:function(data){
      $(".content").html(data);
    }
  });
}


// PLANILLAS DE REFRIGERIO
function fn_config_planilla_refrigerio(){
  $.ajax({
    url:'planilla_refrigerio',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_personal();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

// PERSONAL CONTACTO CON PACIENTE
function fn_config_personal(){
  $.ajax({
    url:'personal',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      //fn_lista_personal();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_usuarios(tipo)
{
  $.ajax({
      url: "user",
      type: "GET",
      data: { tipo },
      success: function (data) {
          $(".content").html(data);
          fn_lista_usuarios(null, tipo, null, null, null, null, null);
      },
      error: function (jqXHR, exception) {
          alert(
              "Opps!!! Ocurrrio un error (principal)\n\n" +
                  errores(jqXHR) +
                  "\n\nPor favor actualice la página y vuelva a intentarlo."
          );
      },
  });
}

function fn_lista_buscar_usuarios(page, palabra, tipo){
  $.ajax({
    url: 'buscar_usuarios',
    data:{page:page, palabra:palabra, tipo:tipo, _token: $('meta[name="csrf-token"]').attr('content')},
    type: 'POST',
    //dataType: 'json',
    success: function(data){
      if(data.success==false){
        var errorsHtml = data.message+'\n';
        $.each(data.errors, function (index, value) {
          errorsHtml += ('- ' + value + '\n');
        });
        alert(errorsHtml);
      }else{
        $("#usuarios").html(data);
        //fn_lista_estudiar(data.especialidad);
      }
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (create_rol)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },

  });
}
function fn_config_consulta_asignaciones()
{
  $.ajax({
    url:'frm_consulta_asignaciones',
    type:'GET',
    success:function(data){
      $(".content").html(data);
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_transferencia_items()
{
  alert("Necesita permisos del Administrador...");  
  /*$.ajax({
    url:'transferencia',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_transferencias();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
  */
}

function fn_config_dosificacion_memos()
{
  $.ajax({
    url:'dosificacion_memo',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_dosificacion_memo();
    },
    error: function (jqXHR, exception) {
      alert('Ops!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

//Oficinas
function fn_config_oficinas(){
  $.ajax({
    url:'oficina',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_oficinas();
    },
    error: function (jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_definicion_bajaitems()
{  
  $.ajax({
    url:'bajaitem',
    type:'GET',
    success:function(data){
      $(".content").html(data);
      fn_lista_bajaitems();
    },
    error: function (jqXHR, exception) {
      alert('Oppps!!! Ocurrrio un error (principal)\n\n'+errores(jqXHR)+'\n\nPor favor actualice la página y vuelva a intentarlo.');
    },
  });
}

function fn_reporte_altas_bajas()
{  
  $.ajax({
    url: 'reporte_altas_bajas',
    type: 'GET',
    success: function(data) {
      $(".content").html(data);
    },
    error: function(jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n' + errores(jqXHR) + '\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}
function fn_reporte_memos_elaborados(){
  $.ajax({
    url: 'reporte_memos_elaborados',
    type: 'GET',
    success: function(data) {
      $(".content").html(data);
    },
    error: function(jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n' + errores(jqXHR) + '\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}
function fn_reporte_memos_elaborados_transferencias(){
  $.ajax({
    url: 'reporte_memos_elaborados_transferencias',
    type: 'GET',
    success: function(data) {
      $(".content").html(data);
    },
    error: function(jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n' + errores(jqXHR) + '\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}
function fn_reporte_memos_elaborados_transferencias_item(){
  $.ajax({
    url: 'reporte_memos_elaborados_transferencias_item',
    type: 'GET',
    success: function(data) {
      $(".content").html(data);
    },
    error: function(jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n' + errores(jqXHR) + '\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}
function fn_reporte_memos_elaborados_bajas(){
  $.ajax({
    url: 'reporte_memos_elaborados_bajas',
    type: 'GET',
    success: function(data) {
      $(".content").html(data);
    },
    error: function(jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n' + errores(jqXHR) + '\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}

function fn_config_report_assos_x_vencer(){
  $.ajax({
    url: 'reporte_assos_x_vencer',
    type: 'GET',
    success: function(data) {
      $(".content").html(data);
    },
    error: function(jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n' + errores(jqXHR) + '\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}
function fn_reporte_acefalias()
{    
  $.ajax({
    url: 'reporte_acefalias',
    type: 'GET',
    success: function(data) {
      $(".content").html(data);      
    },
    error: function(jqXHR, exception) {
      alert('Opps!!! Ocurrrio un error (principal)\n\n' + errores(jqXHR) + '\n\nPor favor actualice la página y vuelva a intentarlo.');
      //location.reload();
    },
  });
}