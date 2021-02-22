<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    public function login(LoginRequest $request)
    {
        if ($this->attemptLogin($request)) {
            $request->session()->regenerate();

            $response = [
                'user'  => Auth::user(),
                'token' => Auth::user()->createToken('my-app-token')->plainTextToken,
                'url'   => route('home')
            ];

            return response($response, 201);
        }

        return response()->json([
            'errors' => ['message' => ['These credentials do not match our records.']],
        ], 422);
    }
}
