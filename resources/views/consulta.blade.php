<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Consulta de Ítem</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- SweetAlert2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css" rel="stylesheet">

    <!-- Animate.css (para animaciones de SweetAlert2) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css" />

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body class="bg-light">

    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-lg border-0 rounded-4">
                    <div class="card-body">
                        <h4 class="card-title mb-4 text-center">Consulta de Ítem por Documento</h4>

                        <form id="formulario">
                            <div class="mb-3">
                                <label for="documento" class="form-label">Número de Documento</label>
                                <input type="text" id="documento" class="form-control" placeholder="Ingrese su número de documento" required>
                            </div>

                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary">Consultar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SweetAlert2 JS -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Script de manejo del formulario -->
    <script>
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
                    Swal.fire({
                        title: 'Consulta exitosa',
                        text: `Hola: Su nuevo número de ítem es: ${data.item}`,
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

</body>
</html>
