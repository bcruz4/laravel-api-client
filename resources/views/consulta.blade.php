<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Consulta de Ítem - SIRH</title>
    <meta name="description" content="Consulta de número de ítem - SIRH">
    <meta name="author" content="Lic. Oswaldo Ajuacho">

    <!-- Favicon -->
    <link rel="icon" type="image/ico" href="{{ asset('img/logo.jpg') }}" />

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />

    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

    <!-- reCAPTCHA -->
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>

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
            font-family: 'Inter', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
        }

        .main-container {
            display: flex;
            height: 100vh;
        }

        .left-section {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #ffffff;
            position: relative;
            overflow: hidden;
        }

        .left-section::before {
            background: linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(41, 128, 185, 0.05) 100%);
        }

        .left-section img {
            max-width: 80%;
            height: auto;
            animation: fadeIn 1.2s ease-in-out;
            z-index: 1;
        }

        .right-section {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f4f4f4;
            padding: 2rem;
        }

        .form-container {
            background: #fff;
            border-radius: 2rem;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
            padding: 2.5rem;
            width: 100%;
            max-width: 450px;
            animation: slideInUp 0.6s ease-out;
        }

        .form-title {
            color: var(--primary-color);
            font-weight: 700;
            margin-bottom: 1.5rem;
            text-align: center;
            font-size: 1.8rem;
        }

        .form-subtitle {
            color: var(--light-text);
            text-align: center;
            margin-bottom: 2rem;
            font-size: 0.95rem;
        }

        .form-control,
        .btn {
            border-radius: 0.75rem;
        }

        .form-control-lg {
            padding: 1rem 1.25rem;
            font-size: 1rem;
        }

        .btn-primary {
            background-color: var(--secondary-color);
            border: none;
            font-weight: 600;
            padding: 0.8rem;
            transition: all 0.3s ease;
        }

        .btn-primary:hover {
            background-color: #2980b9;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(41, 128, 185, 0.2);
        }

        .info-box {
            background-color: #f8fafc;
            border-radius: 0.75rem;
            padding: 1rem;
            margin-bottom: 1.5rem;
            border-left: 4px solid var(--secondary-color);
            text-align: justify;
            /* Añade justificación del texto */
            text-justify: inter-word;
            /* Mejora el espaciado entre palabras */
        }

        .info-text {
            font-size: 0.85rem;
            color: #555;
            margin: 0;
            text-align: justify;
            /* Asegura que el texto esté justificado */
            text-justify: inter-word;
        }

        .info-text strong {
            color: var(--dark-text);
        }

        .version-badge {
            display: inline-block;
            background: #f0f0f0;
            color: var(--light-text);
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.75rem;
            font-weight: 500;
            margin-top: 1rem;
        }

        /* Modal estilos */
        .modal-result-item {
            font-size: 2.5rem;
            font-weight: 700;
            color: var(--secondary-color);
            margin: 1rem 0;
            text-align: center;
        }

        .modal-user-name {
            font-size: 1.2rem;
            margin: 1.5rem 0;
            padding: 1rem 0;
            border-top: 1px solid #eee;
            border-bottom: 1px solid #eee;
            text-align: center;
        }

        .modal-document-info {
            font-size: 0.9rem;
            color: var(--light-text);
            text-align: center;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: scale(0.95);
            }

            to {
                opacity: 1;
                transform: scale(1);
            }
        }

        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 768px) {
            .main-container {
                flex-direction: column;
            }

            .left-section {
                display: none;
            }

            .form-container {
                padding: 1.5rem;
                border-radius: 1.5rem;
            }
        }
    </style>
</head>

<body>

    <div class="main-container">
        <!-- Imagen izquierda -->
        <div class="left-section">
            <img src="{{ asset('img/logo.jpg') }}" alt="Logo SIRH" width="555">
        </div>

        <!-- Formulario derecha -->
        <div class="right-section">
            <div class="form-container">
                <h3 class="form-title">CONSULTA DE ÍTEM</h3>
                <!-- <p class="form-subtitle">Sistema Integrado de Recursos Humanos</p> -->

                <form id="formulario">
                    <div class="mb-3">
                        <label for="documento" class="form-label fw-medium">Ingrese su C.I.</label>
                        <input type="text" class="form-control form-control-lg" id="documento"
                            placeholder="Ej. 83337845 o 1555478-1j" required>
                    </div>


                    <div class="info-box">
                        <p class="info-text">
                            <i class="fas fa-info-circle me-2" style="color: var(--secondary-color);"></i>
                            En el marco del comunicado <strong>MSyD/DGAA/URRHH/COM/1/2025</strong>, encontrará el número de ítem que le corresponde, por el reordenamiento en la numeración de ítems, producto del traspaso de sistema al ADP-SIGEP establecido por el Art. 5 (Planillas Salariales), incisos I y II, de la <strong>Ley N° 1451 de Transparencia en el Servicio Público</strong>.
                        </p>
                    </div>

                    <div class="mb-3 text-center">
                        <div class="g-recaptcha" data-sitekey="{{ env('RECAPTCHA_SITE_KEY') }}" align='center'></div>
                    </div>


                    <button type="submit" class="btn btn-primary btn-lg w-100" id="btnConsultar">
                        <i class="fas fa-search me-2"></i> Consultar Ítem
                    </button>
                </form>

                <div class="text-center mt-3">
                    <span class="version-badge">Versión 1.0</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de resultado -->
    <div class="modal fade" id="resultadoModal" tabindex="-1" aria-labelledby="resultadoModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content rounded-4">
                <div class="modal-header border-0">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body text-center py-4 px-5" id="modalContenido">
                    <!-- Contenido dinámico se insertará aquí -->
                </div>
                <div class="modal-footer border-0 justify-content-center pb-4">
                    <button type="button" class="btn btn-primary px-4" data-bs-dismiss="modal">Aceptar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

    <!-- Bootstrap Bundle JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <script>
        document.getElementById('formulario').addEventListener('submit', async function(e) {
            e.preventDefault();

            const documento = document.getElementById('documento').value.trim();
            const captchaResponse = grecaptcha.getResponse();
            const btnSubmit = document.getElementById('btnConsultar');
            const originalBtnText = btnSubmit.innerHTML;

            // Validaciones
            if (!documento) {
                showAlert('Campo requerido', 'Por favor ingrese un número de documento válido', 'warning');
                return;
            }

            if (!captchaResponse) {
                showAlert('Verificación requerida', 'Por favor complete el reCAPTCHA para continuar', 'warning');
                return;
            }

            // Mostrar estado de carga
            btnSubmit.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Consultando...';
            btnSubmit.disabled = true;

            try {
                const response = await fetch('/buscar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                    },
                    body: JSON.stringify({
                        documento,
                        'g-recaptcha-response': captchaResponse
                    })
                });

                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }

                const data = await response.json();

                if (data.success) {
                    // Mostrar resultado en modal
                    showResultModal(data, documento);
                } else {
                    const title = data.error === 'Por favor complete el reCAPTCHA correctamente' ?
                        'Verificación fallida' :
                        'No encontrado';
                    const text = data.error || 'El documento no está registrado';
                    showAlert(title, text, 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showAlert('Error', 'Ocurrió un error al realizar la consulta', 'error');
            } finally {
                // Restaurar botón
                btnSubmit.innerHTML = originalBtnText;
                btnSubmit.disabled = false;

                // Limpiar formulario y recaptcha
                document.getElementById('documento').value = '';
                grecaptcha.reset();
            }
        });

        // Función para mostrar alertas
        function showAlert(title, text, icon) {
            const modal = new bootstrap.Modal(document.getElementById('resultadoModal'));

            const alertContent = `
      <div class="alert alert-${icon === 'error' ? 'danger' : 'warning'} d-flex align-items-center" role="alert">
        <i class="fas fa-exclamation-triangle me-3 fs-4"></i>
        <div>
          <h5 class="alert-heading mb-1">${title}</h5>
          <p class="mb-0">${text}</p>
        </div>
      </div>
    `;

            document.getElementById('modalContenido').innerHTML = alertContent;
            modal.show();
        }

        // Función para mostrar resultados exitosos
        function showResultModal(data, documento) {
            const modal = new bootstrap.Modal(document.getElementById('resultadoModal'));

            const content = `
      <div style="text-align: center;">
        <div style="font-size: 1.5rem; margin-bottom: 15px;">
          <i class="fas fa-hand-paper" style="color: var(--secondary-color);"></i> ¡Hola, ${data.nombre_completo}!
        </div>
        <div style="background: #f8f9fa; border-radius: 12px; padding: 20px; margin: 20px 0;">
          <span style="font-size: 0.9rem; color: var(--light-text); display: block; margin-bottom: 10px;">Su nuevo número de ítem es:</span>
          <div class="modal-result-item">${data.item}</div>
          <div class="modal-user-name">
            <i class="fas fa-user-circle me-2"></i> ${data.nombre_completo}
          </div>
        </div>
        <div class="modal-document-info">
          <i class="fas fa-check-circle" style="color: #27ae60;"></i> 
          Documento consultado: ${documento}
        </div>
      </div>
    `;

            document.getElementById('modalContenido').innerHTML = content;
            modal.show();
        }
    </script>

</body>

</html>