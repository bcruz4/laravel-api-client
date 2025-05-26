<div class="box box-solid box-info collapsed-box" >
    <div class="box-header with-border">
        <i class="fa fa-cog"></i>
        <h3 class="box-title">Configuraci&oacute;n de tablas</h3>
        <div class="box-tools pull-right">
            <button class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip" title=""><i class="fa fa-minus"></i></button>
            <button class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip" title=""><i class="fa fa-times"></i></button>
        </div>
    </div>
    <div class="box-body">
        <div class="row">
            <div class="col-md-6">
                <div class="box box-info">
                    <div class="box-header with-border">
                        <i class="fa fa-thumbs-o-up"></i>
                        <h3 class="box-title">Tome en cuenta:</h3>
                        <ul>
                            <li>Los campos obligatorios est&aacute;n marcados con un * (asterisco de color rojo)</li>
                            <li>Una vez lleno el formulario presione sobre el bot&oacute;n "guardar" para ingresar en la base de datos</li>
                            <li>Por seguridad no se borra ning&uacute;n registro de la base de datos, cuando se elimine un rol, este pasara a un estado de eliminado.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="box box-success">
                    <div class="box-header with-border">
                        <i class="fa fa-plus"></i>
                        <h3 class="box-title">Opciones</h3>
                        <ul>
                            <li>Seleccione un rol para adicionar un nuevo enlace al men&uacute;.</li>
                            <li>Para agregar un nuevo enlace al men&uacute;, seleccione  <span class="label label-success">Nuevo menu <i class="fa fa-plus"></i></span></li>
                            <li>Para editar un menu presione sobre el bot&oacute;n <span class="label label-warning"><i class="fa fa-edit"></i></span></li>
                            <li>Para eliminar (deshabilitar) un men&uacute; presione sobre el bot&oacute;n <span class="label label-danger"><i class="fa fa-close"></i></span></li>
                            <li>Puede modificar el orden del men&uacute; presionando y arrastrando sobre el bot&oacute;n <span class="label label-primary"><i class="fa fa-arrows-alt"></i></span></li>
                            <li>Para agregar un submen&uacute; al men&uacute; presione sobre el bot&oacute;n <span class="label label-success"><i class="glyphicon glyphicon-tasks"></i></span> y siga los mismos pasos anteriormente explicado.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- <div class="row">
  <div class="col-md-4">
      <div class="box box-solid box-primary">
          <div class="box-header with-border">
              <i class="fa fa-user"></i>
              <h3 class="box-title">Tablas</h3>
          </div>
          <div class="box-body">
              <button class="btn btn-success btn-xs" onclick="fn_frm_nueva_tabla()" data-toggle='modal' data-target='#myModal'>
              Nuevo tabla <i class="fa fa-plus"></i>
              </button>
              <br><br>
              <select name="tabla_id" id="tabla_id" size="15" style="width: 100%">
                  @foreach ($tablas as $tabla)
                      <option value="{{$tabla->id}}">{{$tabla->id}} - {{$tabla->nombretabla}}</option>
                  @endforeach
              </select>
          </div>
      </div>
  </div> --}}
  {{-- <div class="col-md-8">
      <div class="box box-solid box-primary">
          <div class="box-header with-border">
              <i class="fa fa-list"></i>
              <h3 class="box-title">Catalogos</h3>
          </div>
          <div class="box-body">
              <div id="config_catalogos"></div>
          </div>
      </div>
  </div> --}}
  <div id="tablas"></div>
</div>

<script language="javascript" type="text/javascript">
  function fn_lista_tablas(page){
      $.ajax({
          url:'lista_tablas',
          data:{ page:page },
          type: 'GET',
          //dataType: 'json',
          cache: false,
          success:function(data){
              $("#tablas").html(data);
          }
      });
  }

  function fn_frm_nueva_tabla(){
      $("#form-modal").html("");
      $.ajax({
          url:"{{ url('tabla') }}/create",
          type: 'GET',
          success:function(data){
              $("#form-modal").html(data);
          }
      });
  }
  function fn_frm_editar_tabla(id){
      $("#form-modal").html("");
      $.ajax({
          url:"{{ url('tabla') }}/"+id+"/edit",
          type: 'GET',
          success:function(data){
              $("#form-modal").html(data);
          }
      });
  }
  function fn_habilita_deshabilita_tabla(id, op){
      if(op==0){
          var respuesta = confirm("\xBFDesea eliminar (deshabilitar) esta tabla?");
      }else{
          var respuesta = confirm("\xBFDesea habilitar este tabla?");
      }
      if (respuesta){
          var page=$(".pagination .active span").text();
          $.ajax({
              url: 'habilita_deshabilita_tabla',
              data: {id:id, op:op, _token: $('meta[name="csrf-token"]').attr('content')},
              type: 'DELETE',
              success: function(data){
                  fn_lista_tablas(page);
              }
          });
      }
  }
  $("#tablas").on('click', '.pagination a', function (e){
      e.preventDefault();
      var page=$(this).attr('href').split('page=')[1];
      //console.log(page);
      $.ajax({
          url:'lista_tablas',
          data:{page:page},
          cache: false,
          type: 'GET',
          //dataType: 'json',
          success:function(data){
              $("#tablas").html(data);
          }
      });
  });


</script>
