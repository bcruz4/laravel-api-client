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

    <!-- Font Awesome -->
    <link rel="stylesheet" media="screen" href="{{ asset('assets/fonts/font-awesome/font-awesome.min.css') }}" />

    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">

    <!-- Animate.css -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css" />

    <style>
        :root {
            --primary-color: #2c3e50;
            --secondary-color: #3498db;
            --accent-color: #e74c3c;
            --light-bg: #f8f9fa;
            --dark-text: #2c3e50;
            --light-text: #7f8c8d;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f7fa;
        }

        /* Estilos para el formulario flotante */
        .floating-form-container {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 9999;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(3px);
        }

        .floating-form {
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            width: 100%;
            max-width: 500px;
            animation: fadeInDown 0.4s;
            position: relative;
            border-top: 5px solid var(--secondary-color);
        }

        .close-form {
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 24px;
            cursor: pointer;
            color: var(--light-text);
            transition: all 0.3s;
        }

        .close-form:hover {
            color: var(--accent-color);
            transform: rotate(90deg);
        }

        .btn-consultar-inicial {
            font-size: 18px;
            padding: 12px 30px;
            margin-top: 30px;
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
            transition: all 0.3s ease;
            border-radius: 50px;
            font-weight: 600;
            letter-spacing: 0.5px;
            background: linear-gradient(135deg, var(--secondary-color), #2980b9);
            border: none;
        }

        .btn-consultar-inicial:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(52, 152, 219, 0.4);
        }

        /* Estilo para la tarjeta de resultado */
        .result-container {
            text-align: center;
            padding: 0;
        }

        .greeting {
            font-size: 1.5rem;
            color: var(--dark-text);
            margin-bottom: 15px;
            font-weight: 500;
        }

        .item-card {
            background: linear-gradient(135deg, #ffffff, #f8f9fa);
            border-radius: 12px;
            padding: 30px;
            margin: 20px 0;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(52, 152, 219, 0.2);
            position: relative;
            overflow: hidden;
        }

        .item-card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 5px;
            height: 100%;
            background: linear-gradient(to bottom, var(--secondary-color), #2980b9);
        }

        .item-label {
            font-size: 1rem;
            color: var(--light-text);
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 10px;
            display: block;
        }

        .item-value {
            font-size: 3rem;
            font-weight: 700;
            color: var(--secondary-color);
            margin: 15px 0;
            font-family: 'Courier New', monospace;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .user-name {
            font-size: 1.4rem;
            color: var(--dark-text);
            margin: 20px 0;
            padding: 15px 0;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            font-weight: 500;
        }

        .verification-text {
            font-size: 0.9rem;
            color: var(--light-text);
            margin-top: 20px;
            line-height: 1.6;
        }

        .verification-icon {
            color: #27ae60;
            font-size: 1.2rem;
            margin-right: 5px;
        }

        .document-info {
            background: var(--light-bg);
            padding: 12px;
            border-radius: 8px;
            margin-top: 20px;
            font-size: 0.85rem;
        }

        /* Animaciones personalizadas */
        @keyframes pulse {
            0% {
                transform: scale(1);
            }

            50% {
                transform: scale(1.05);
            }

            100% {
                transform: scale(1);
            }
        }

        .pulse-animation {
            animation: pulse 2s infinite;
        }

        /* Estilos para el input */
        .form-control-lg {
            border-radius: 8px;
            padding: 15px 20px;
            border: 2px solid #e0e0e0;
            transition: all 0.3s;
        }

        .form-control-lg:focus {
            border-color: var(--secondary-color);
            box-shadow: 0 0 0 0.25rem rgba(52, 152, 219, 0.25);
        }

        /* Estilos para SweetAlert2 */
        .swal2-popup {
            border-radius: 12px !important;
            padding: 30px !important;
            max-width: 650px !important;
        }

        .swal2-title {
            color: var(--dark-text) !important;
            font-weight: 600 !important;
            font-size: 1.8rem !important;
        }

        .swal2-confirm {
            background: linear-gradient(135deg, var(--secondary-color), #2980b9) !important;
            border: none !important;
            border-radius: 50px !important;
            padding: 10px 25px !important;
            font-weight: 500 !important;
        }
    </style>
</head>

<body id="matter-top" class="bg-light">
    <header class="logo-menu" id="home">
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

            <div class="text-center mb-4">
                <img src="{{ asset('img/logo.jpg') }}" alt="Logo SIRH" width="80" class="mb-3">
                <h4 class="card-title mb-3" style="font-weight: 600; color: var(--dark-text);">Consulta de Ítem por Documento</h4>
            </div>

            <form id="formulario">
                <div class="mb-3">                    
                    <label for="documento" class="form-label fw-bold">Número de Documento</label>
                    <input type="text" id="documento" class="form-control form-control-lg" placeholder="Ej. 83337845 o 1555478-1j" required>
                </div>
                <p></p>
                <div class="mb-4 alert alert-info p-3" style="font-size: 0.85rem; line-height: 1.5; border-radius: 8px;">
                        <i class="fa fa-info-circle me-2"></i>
                        En el marco del comunicado MSyD/DGAA/URRHH/COM/1/2025, encontrará el número de ítem que le corresponde, por el reordenamiento en la numeración de ítems, producto del traspaso de sistema al ADP-SIGEP establecido por el Art. 5 (Planillas Salariales), incisos I y II, de la Ley N° 1451 de Transparencia en el Servicio Público.
                    </div>
                <div class="d-grid gap-3 text-center">
                    <button type="submit" class="btn btn-primary btn-lg py-3 mx-auto" style="font-weight: 500; width: fit-content; border-radius: 50px;">
                        <i class="fa fa-search me-2"></i> Consultar Ítem
                    </button>
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
            document.getElementById('documento').focus();
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

        // Manejo del formulario
        document.getElementById('formulario').addEventListener('submit', async function(e) {
            e.preventDefault();
            const documento = document.getElementById('documento').value.trim();

            if (!documento) {
                Swal.fire({
                    title: 'Campo requerido',
                    text: 'Por favor ingrese un número de documento válido',
                    icon: 'warning',
                    confirmButtonText: 'Entendido',
                    background: 'white',
                    backdrop: `
                        rgba(0,0,0,0.4)
                        url("{{ asset('img/logo.jpg') }}")
                        center left
                        no-repeat
                    `
                });
                return;
            }

            const btnSubmit = this.querySelector('button[type="submit"]');
            const originalBtnText = btnSubmit.innerHTML;
            btnSubmit.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Verificando...';
            btnSubmit.disabled = true;

            try {
                const response = await fetch('/buscar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify({
                        documento
                    })
                });

                const data = await response.json();

                if (data.success) {
                    document.getElementById('floatingFormContainer').style.display = 'none';
                    document.getElementById('documento').value = '';

                    Swal.fire({
                        // title: 'Resultado de Consulta',
                        html: `
                            <div class="result-container">
                                <div class="greeting">
                                    <i class="fa fa-hand-paper-o"></i> ¡Hola, ${data.nombre_completo}!
                                </div>
                                
                                <div class="item-card">
                                    <span class="item-label">Su nuevo número de ítem es:</span>
                                    <div class="item-value pulse-animation">${data.item}</div>
                                    <div class="user-name">
                                        <i class="fa fa-user-circle-o"></i> ${data.nombre_completo}
                                    </div>
                                </div>
                                
                                <div class="verification-text">
                                    <i class="fa fa-check-circle verification-icon"></i> 
                                    Verificación completada - Documento: ${documento}
                                </div>
                                
                                <div class="document-info">
                                    <i class="fa fa-info-circle"></i> Por favor verifique que sus datos sean correctos. 
                                    Si encuentra alguna discrepancia, contacte al departamento de Recursos Humanos.
                                </div>
                            </div>
                        `,
                        icon: 'success',
                        confirmButtonText: 'Aceptar',
                        showConfirmButton: true,
                        showCloseButton: true,
                        customClass: {
                            container: 'animate__animated animate__fadeIn',
                            popup: 'animate__animated animate__zoomIn'
                        },
                        width: '650px',
                        padding: '0',
                        background: 'white',
                        backdrop: `
                            rgba(0,0,0,0.4)
                            url("{{ asset('img/logo.jpg') }}")
                            center left
                            no-repeat
                        `
                    });
                } else {
                    Swal.fire({
                        title: 'Documento no encontrado',
                        html: `
                            <div style="text-align: center; padding: 20px;">
                                <i class="fa fa-exclamation-triangle" style="font-size: 3rem; color: var(--accent-color); margin-bottom: 15px;"></i>
                                <p>El número de documento <strong>${documento}</strong> no está registrado en nuestro sistema.</p>
                                <div class="alert alert-warning" style="font-size: 0.9rem;">
                                    Verifique que haya ingresado correctamente el número o contacte al departamento de Recursos Humanos si cree que esto es un error.
                                </div>
                            </div>
                        `,
                        icon: 'error',
                        confirmButtonText: 'Intentar nuevamente',
                        background: 'white'
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error de conexión',
                    text: 'No se pudo conectar con el servidor. Por favor intente más tarde.',
                    icon: 'error',
                    confirmButtonText: 'Entendido',
                    background: 'white'
                });
            } finally {
                btnSubmit.innerHTML = originalBtnText;
                btnSubmit.disabled = false;
            }
        });

        // Enfocar automáticamente el campo de documento al cargar la página
        window.addEventListener('load', function() {
            document.getElementById('btnMostrarFormulario').addEventListener('click', function() {
                setTimeout(function() {
                    document.getElementById('documento').focus();
                }, 300);
            });
        });
    </script>

    <!-- All JS plugin Triggers -->
    <script src="{{ asset('assets/js/main.js') }}"></script>
</body>

</html>