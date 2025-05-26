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
        $documento = $request->input('documento');

        try {
            $response = Http::get("http://localhost:3000/buscar/{$documento}");

            if ($response->successful()) {
                $data = $response->json();
                return response()->json([
                    'success' => true,
                    'item' => $data['item'],
                    'nombre_completo' => $data['nombre_completo']
                ]);
            } else {
                return response()->json(['success' => false]);
            }
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()]);
        }
    }
}
