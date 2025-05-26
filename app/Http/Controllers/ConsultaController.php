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
        $request->validate(['documento' => 'required']);

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
