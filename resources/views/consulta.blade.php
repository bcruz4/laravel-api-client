<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Consulta de Ítem - SIRH</title>
    <meta name="description" content="Consulta de número de ítem - SIRH">
    <meta name="author" content="Lic. Oswaldo Ajuacho">

    <link rel="icon" type="image/ico" href="{{ asset('img/logo.jpg') }}" />
    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Bootstrap -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/bootstrap.css') }}">

    <!-- Main Style -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/main.css') }}">

    <!-- Responsive Style -->
    <link rel="stylesheet" type="text/css" href="{{ asset('assets/css/responsive.css') }}">

    <!--Icon Fonts-->
    <link rel="stylesheet" media="screen" href="{{ asset('assets/fonts/font-awesome/font-awesome.min.css') }}"/>
    <link rel="stylesheet" media="screen" href="{{ asset('assets/css/matter-icon.css') }}" />

    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">

    <!-- Animate.css -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css" />

    <style>
        /* Estilos para el formulario flotante */
        .floating-form-container {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.7);
            z-index: 9999;
            align-items: center;
            justify-content: center;
        }
        
        .floating-form {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 30px rgba(0,0,0,0.3);
            width: 100%;
            max-width: 500px;
            animation: fadeInDown 0.5s;
        }
        
        .close-form {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        
        .btn-consultar-inicial {
            font-size: 18px;
            padding: 12px 30px;
            margin-top: 30px;
        }
    </style>
</head>

<body id="matter-top" class="bg-light">
    <header class="logo-menu" id="home">
        <!-- Nav Menu Section -->
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation" data-spy="affix" data-offset-top="200">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">
                        <img src="{{ asset('img/logo.jpg') }}" alt="Logo SIRH" height="40">
                    </a>
                </div>
            </div>
        </nav>
    </header>

    <section id="slider">
        <div id="carousel-area">
            <div id="carousel-slider" class="carousel slide" data-interval="5000">
                <div class="carousel-inner">
                    <div class="item active" style="background-image: url({{ asset('assets/img/fondo.jpg') }});background-size: 100% 100%;">
                        <div class="carousel-caption">
                            <h1 class="animated-late fadeInDown">
                                <div class="login-logo">
                                    <a href="#">
                                        <img class="img-thumbnail" alt="logo" width="200" src="{{ asset('img/logo.jpg') }}">
                                    </a>
                                </div>
                            </h1>
                            <h2 class="animated-late fadeInUpQuick delay-1">
                                SIRH <br>
                                Sistema de Recursos Humanos (CONSULTA)<br>
                                Ver.1.0
                            </h2>
                            
                            <!-- Botón inicial para mostrar el formulario -->
                            <div class="text-center">
                                <button id="btnMostrarFormulario" class="btn btn-primary btn-lg btn-consultar-inicial animate__animated animate__pulse animate__infinite">
                                    <i class="fa fa-search"></i> Consultar Número de Ítem
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Contenedor del formulario flotante -->
    <div id="floatingFormContainer" class="floating-form-container">
        <div class="floating-form">
            <span class="close-form" id="cerrarFormulario">&times;</span>
            <h4 class="card-title mb-4 text-center">Consulta de Ítem por Documento</h4>

            <form id="formulario">
                <div class="mb-3">
                    <label for="documento" class="form-label">Número de Documento</label>
                    <input type="text" id="documento" class="form-control" placeholder="Ingrese su número de documento" required>
                </div>

                <div class="d-grid">
                    <button type="submit" class="btn btn-primary btn-lg">Consultar</button>
                </div>
            </form>
        </div>
    </div>

    <!-- jQuery Load -->
    <script src="{{ asset('assets/js/jquery-min.js') }}"></script>

    <!-- Bootstrap JS -->
    <script src="{{ asset('assets/js/bootstrap.min.js') }}"></script>

    <!-- SweetAlert2 JS -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <script>
        // Mostrar/ocultar formulario flotante
        document.getElementById('btnMostrarFormulario').addEventListener('click', function() {
            document.getElementById('floatingFormContainer').style.display = 'flex';
        });
        
        document.getElementById('cerrarFormulario').addEventListener('click', function() {
            document.getElementById('floatingFormContainer').style.display = 'none';
        });
        
        // Cerrar al hacer clic fuera del formulario
        document.getElementById('floatingFormContainer').addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });

        // Manejo del formulario (existente)
        document.getElementById('formulario').addEventListener('submit', async function(e) {
            e.preventDefault();
            const documento = document.getElementById('documento').value;

            try {
                const response = await fetch('/buscar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify({ documento })
                });

                const data = await response.json();

                if (data.success) {
                    // Ocultar el formulario después de consulta exitosa
                    document.getElementById('floatingFormContainer').style.display = 'none';
                    
                    Swal.fire({
                        title: 'Consulta exitosa',
                        html: `<h3>Hola ${data.nombre || ''}</h3>
                               <p>Su nuevo número de ítem es: <strong>${data.item}</strong></p>`,
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        showClass: {
                            popup: 'animate__animated animate__fadeInDown'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutUp'
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Documento no encontrado',
                        text: 'Verifique el número ingresado.',
                        icon: 'error',
                        confirmButtonText: 'Cerrar',
                        showClass: {
                            popup: 'animate__animated animate__shakeX'
                        },
                        hideClass: {
                            popup: 'animate__animated animate__fadeOutDown'
                        }
                    });
                }

            } catch (error) {
                Swal.fire({
                    title: 'Error de conexión',
                    text: 'No se pudo conectar con el servidor.',
                    icon: 'error',
                    confirmButtonText: 'Cerrar',
                    showClass: {
                        popup: 'animate__animated animate__fadeIn'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOut'
                    }
                });
            }
        });
    </script>

    <!-- All JS plugin Triggers -->
    <script src="{{ asset('assets/js/main.js') }}"></script>
</body>
</html>