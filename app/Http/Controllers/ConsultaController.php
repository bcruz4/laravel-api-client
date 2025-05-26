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
        $response = Http::get("http://localhost:3000/buscar/{$documento}");

        if ($response->ok()) {
            $item = $response->json('item');
            return response()->json(['success' => true, 'item' => $item]);
        } else {
            return response()->json(['success' => false]);
        }
    }
}
