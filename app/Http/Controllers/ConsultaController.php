<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ConsultaController extends Controller
{
    public function index()
    {
        return view('consulta');
    }

    public function buscar(Request $request)
    {
        $request->validate([
            'documento' => 'required',
            'g-recaptcha-response' => 'required'
        ]);

        // Validar reCAPTCHA
        $recaptchaResponse = $request->input('g-recaptcha-response');
        $recaptchaSecret = env('RECAPTCHA_SECRET_KEY');
        
        $recaptchaVerification = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => $recaptchaSecret,
            'response' => $recaptchaResponse,
            'remoteip' => $request->ip()
        ]);

        $recaptchaData = $recaptchaVerification->json();

        if (!$recaptchaData['success']) {
            return response()->json([
                'success' => false,
                'error' => 'Por favor complete el reCAPTCHA correctamente'
            ], 400);
        }

        try {
            $response = Http::withHeaders([
                'X-API-Key' => env('API_NODE_KEY')
            ])->get(env('API_NODE_URL') . '/buscar/' . $request->documento);

            if ($response->successful()) {
                return $response->json();
            }

            return response()->json([
                'success' => false,
                'error' => 'Documento no encontrado'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Error en el servidor'
            ], 500);
        }
    }
}